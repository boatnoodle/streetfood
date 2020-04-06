// import firebase from "firebase";
import { Firebase } from "components/Firebase/firebase";
import { orderStatus } from "utils/constant";

const firebase = new Firebase() as any;

export const getLatestOrderToday = setState => {
  const now = new Date();
  const lastMidnight = new Date(now.setHours(0, 0, 0, 0));

  firebase.db
    .collection("orders")
    .where("created", ">", lastMidnight)
    .where("created", "<", new Date())
    .orderBy("created", "desc")
    .limit(1)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        setState(doc.data());
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
};
