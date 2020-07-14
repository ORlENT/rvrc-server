export const signIn = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const email = "rvrc@orient.org";
    console.log("Signing in");

    getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, state.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS", myGroup: state.groupname });

        getFirestore().collection("groups").get();
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
    getFirestore()
      .collection("groups")
      .onSnapshot((snapshot) => {
        console.log("Fetching info");

        var groups = {};
        snapshot.forEach((doc) => {
          groups[doc.id] = doc.data();
        });

        dispatch({
          type: "FETCH_SUCCESS",
          groups: groups,
        });
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
  const points = parseInt(state.point);
  console.log("Transferring points");
  console.log(points);
  console.log(props.groupname);
  console.log(state.groupname2);

  getFirestore()
    .collection("groups")
    .where("name", "==", props.groupname)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          points: getFirestore().FieldValue.increment(-points),
        });
      });
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  getFirestore()
    .collection("groups")
    .where("name", "==", state.groupname2)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          points: getFirestore().FieldValue.increment(points),
        });
      });
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  dispatch({ type: "TRANSFER_POINTS" });
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
