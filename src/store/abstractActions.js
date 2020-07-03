export const fetchSubCollection = async (
  ref, // Ref from firestore
  camp,
  nameOfCollection,
  orderFilter,
  orderBy
) => {
  // Select which collection
  var query = ref.collection(nameOfCollection);

  // Add orderBy conditions.
  query.orderBy("timestamp", "desc");
  if (orderFilter) {
    orderFilter.forEach((condition, index) => {
      query = query.orderBy(condition, orderBy[index]);
    });
  }

  await query
    .get()
    .then((querySnapshot) => {
      camp[`${nameOfCollection}`] = {};
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        camp[`${nameOfCollection}`][
          querySnapshot.docs[i].id
        ] = querySnapshot.docs[i].data();
      }
      return camp;
    })
    .catch((err) => {
      console.log("Error retrieving " + nameOfCollection);
      console.log(err);
    });
};

export const deleteSubCollectionDoc = (
  getFirestore, // getFireStore
  dispatch,
  nameOfSubCollection,
  docRef,
  campCode,
  dispatchType
) => {
  console.log(
    "Deleting " +
      nameOfSubCollection.substring(0, nameOfSubCollection.length - 1)
  );

  getFirestore()
    .collection("camps")
    .where("campCode", "==", campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      camp
        .collection(nameOfSubCollection)
        .doc(docRef)
        .delete()
        .then(() => {
          dispatch({ type: dispatchType });
        })
        .catch((err) => {
          console.log(`Error deleting ${nameOfSubCollection}`);
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving camp");
      console.log(err);
    });
};

export const addSubCollectionDoc = (
  getFirestore, // getFireStore
  dispatch,
  nameOfSubCollection,
  data,
  campCode,
  dispatchType
) => {
  console.log("Adding to " + nameOfSubCollection);
  getFirestore()
    .collection("camps")
    .where("campCode", "==", campCode)
    .get()
    .then((querySnapshot) => {
      const camp = querySnapshot.docs[0].ref;
      camp
        .collection(nameOfSubCollection)
        .add(data)
        .then(() => {
          dispatch({ type: dispatchType });
        })
        .catch((err) => {
          console.log(`Error adding ${nameOfSubCollection}`);
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("Error retrieving camp");
      console.log(err);
    });
};
