export const signIn = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const email = "rvrc@orient.org";
    //console.log("Signing in");

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
    //console.log("Signing out");

    getFirebase()
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const chooseGroup = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //console.log("Choosing group");

    dispatch({ type: "GROUP_CHOSEN", myGroup: state.groupname });
  };
};

export const fetchInfo = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    getFirestore()
      .collection("groups")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        //console.log("Fetching groups");

        var groups = {};
        snapshot.forEach((doc) => {
          groups[doc.id] = doc.data();
        });

        dispatch({
          type: "FETCHED_GROUPS",
          groups: groups,
        });
      });

    getFirestore()
      .collection("transactions")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //console.log("Fetching transactions");

        var transactions = {};
        snapshot.forEach((doc) => {
          transactions[doc.id] = doc.data();
        });

        dispatch({
          type: "FETCHED_TRANSACTIONS",
          transactions: transactions,
        });
      });
  };
};

export const addPt = (state, props) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  var points = parseInt(props.point);

  console.log(
    "Adding points\n" +
      "Station: " +
      props.groupname +
      "\n" +
      "Attacker: " +
      props.groupname2 +
      "\n" +
      "Points: " +
      points
  );

  var groups = Object.values(getState().store.groups);

  const station = groups.find((grp) => grp.name === props.groupname);
  const attacker = groups.find((grp) => grp.name === props.groupname2);
  const sameHouse = station.color === attacker.color;

  const from = await getFirestore()
    .collection("groups")
    .where("name", "==", props.groupname)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.get("points") != null) {
          doc.ref.update({
            damaged: (points > 0 && !sameHouse) || (points <= 0 && sameHouse),
          });
        }
      });
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  const to = await getFirestore()
    .collection("groups")
    .where("name", "==", props.groupname2)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          points: getFirestore().FieldValue.increment(sameHouse ? 0 : points),
        });
      });
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  const log = await getFirestore()
    .collection("transactions")
    .add({
      from: props.groupname,
      to: props.groupname2,
      points: points,
      timestamp: getFirestore().Timestamp.now(),
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  Promise.all([from, to, log]).then(() => {
    dispatch({ type: "ADD_POINTS" });
  });
};

export const chooseAttacker = (state, props) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log("Choosing Attacker");
  console.log("Station: " + props.groupname);
  console.log("Attacker: " + state.groupname2);

  var db = getFirestore();
  var docRef;

  db.collection("groups")
    .where("name", "==", props.groupname)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        docRef = doc.ref;
      });
    })
    .then(() => {
      db.runTransaction((transaction) => {
        return transaction.get(docRef).then((doc) => {
          var attacker = doc.get("attacker");
          if (attacker === state.groupname2) {
            //pass
          } else if (attacker == null) {
            transaction.update(docRef, { attacker: state.groupname2 });
          } else {
            return Promise.reject(
              "Looks like someone else got to them before you."
            );
          }
        });
      })
        .then(() => {
          console.log("Attacker chosen sucessfully");
          dispatch({ type: "ATTACKER_CHOSEN" });
        })
        .catch((err) => {
          console.log("Error choosing attacker");
          dispatch({ type: "CHOOSE_ATTACKER_ERROR" });
          console.error(err);
        });
    })
    .catch((err) => {
      console.log("Error choosing attacker");
      dispatch({ type: "CHOOSE_ATTACKER_ERROR" });
      console.error(err);
    });
};

export const clearAttacker = (state, props) => (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log("Clearing Attacker");
  console.log("Station: " + props.groupname);

  getFirestore()
    .collection("groups")
    .where("name", "==", props.groupname)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          attacker: null,
        });
      });
    })
    .then(() => {
      dispatch({ type: "ATTACKER_CHOSEN" });
    })
    .catch((err) => {
      console.log("Error clearing attacker");
      console.log(err);
    });
};

export const transferPt = (state, props) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  var points = parseInt(state.point);

  console.log("Transferring points");
  console.log("Station: " + props.groupname);
  console.log("Attacker: " + props.groupname2);
  console.log("Points: " + points);

  var groups = Object.values(getState().store.groups);
  const isOG = (grp) => grp.points || grp.points === 0;

  const station = groups.find((grp) => grp.name === props.groupname);
  const attacker = groups.find((grp) => grp.name === props.groupname2);

  //check for negative points
  if (points > 0) {
    // station to attacker
    if (isOG(station)) {
      if (station.points - points < 0) {
        points = station.points;
      }
    }
  } else {
    // attacker to station
    if (attacker.points + points < 0) {
      points = -attacker.points;
    }
  }

  const from = await getFirestore()
    .collection("groups")
    .where("name", "==", props.groupname)
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (doc.get("points") != null) {
          doc.ref.update({
            points: getFirestore().FieldValue.increment(-points),
          });
        }
      });
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  const to = await getFirestore()
    .collection("groups")
    .where("name", "==", props.groupname2)
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

  const log = await getFirestore()
    .collection("transactions")
    .add({
      from: props.groupname,
      to: props.groupname2,
      points: points,
      timestamp: getFirestore().Timestamp.now(),
    })
    .catch((err) => {
      console.log("Error transferring points");
      console.log(err);
    });

  Promise.all([from, to, log]).then(() => {
    dispatch({ type: "TRANSFER_POINTS" });
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
