import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";

import { useFirebase } from "components/Firebase/useFirebase";

const OrderPage: React.FC = () => {
  const firebase = useFirebase();

  const addData = () => {
    firebase.db
      .collection("orders")
      .add({
        name: "เส้นเล็กน้ำ"
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  const listenOrders = () => {
    firebase.db.collection("orders").onSnapshot(function(querySnapshot) {
      const orders = [];

      querySnapshot.forEach(doc => {
        orders.push(doc.data().name);
      });
      console.log(orders, "xxx");
      // console.log("Current data: ", result?.data());
    });
  };

  useEffect(() => {
    listenOrders();
  }, []);

  return (
    <div>
      Order page{" "}
      <Button onClick={addData} variant="contained" color="primary">
        Primary
      </Button>
    </div>
  );
};

export default OrderPage;
