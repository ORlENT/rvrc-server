export const signIn = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const email = getState().store.camp.campCode + "@orient.org";
    console.log("Signing in with:", email, state.password);

    getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, state.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });

        getFirestore().collection("camps").get();
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    console.log("Signing out");

    getFirebase()
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const fetchInfo = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("Fetching info");
    getFirestore()
      .collection("groups")
      .get()
      .then((querySnapshot) => {
        var groups = {};
        querySnapshot.forEach((doc) => {
          groups[doc.id] = doc.data();
        });

        dispatch({
          type: "FETCH_SUCCESS",
          groups: groups,
        });
      })
      .catch((err) => {
        console.log("Error fetching info");
        console.log(err);
      });
  };
};

export const addPt = (state, props) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Creating group");
    getFirestore()
      .collection("camps")
      .where("campCode", "==", getState().store.camp.campCode)
      .get()
      .then((querySnapshot) => {
        const camp = querySnapshot.docs[0].ref;
        camp
          .collection("groups")
          .doc(props.grpID)
          .update({
            point:
              parseInt(getState().store.camp.groups[props.grpID].point) +
              parseInt(state.newpoint),
            timestamp: getFirestore().Timestamp.now(),
          })
          .then(() => {
            dispatch({ type: "ADD_POINTS" });
          })
          .catch((err) => {
            console.log("Error adding points");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("Error retrieving camp");
        console.log(err);
      });
  };
};

export const transferPt = (state, props) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log("Transferring points");
  console.log(state.point);
  console.log(state.groupname);
  console.log(state.groupname2);
  await getFirestore()
    .collection("camps")
    .where("campCode", "==", getState().store.camp.campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      camp
        .collection("groups")
        .doc(state.groupname)
        .update({
          point:
            parseInt(getState().store.camp.groups[state.groupname].point) -
            parseInt(state.point),
          timestamp: getFirestore().Timestamp.now(),
        })
        .catch((err) => {
          console.log("Error transferring points");
          console.log(err);
        });

      camp
        .collection("groups")
        .doc(state.groupname2)
        .update({
          point:
            parseInt(getState().store.camp.groups[state.groupname2].point) +
            parseInt(state.point),
          timestamp: getFirestore().Timestamp.now(),
        })
        .then(() => {
          dispatch({ type: "TRANSFER_POINTS" });
        })
        .catch((err) => {
          console.log("Error transfering points");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving camp");
      console.log(err);
    });
};

export const resetForm = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_FORM" });
  };
};

export const dispatchType = (type) => async (dispatch) => {
  dispatch({
    type: type,
  });
};
