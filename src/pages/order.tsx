import React from "react";
import { useFirebase } from "components/Firebase/useFirebase";
import { Formik } from "formik";
import Order from "containers/Order";

const OrderPage: React.FC = () => {
  const firebase = useFirebase();
  const initialValues = {
    tableNo: null,
    queueNo: 1,
    provider: "ร้านโกเอ",
    typeMenu: "ก๋วยเตี๋ยว",
    typeOrder: "ใส่ถุง",
    orders: [],
    orderDetail: {
      typeNoodle: "เรือ",
      noodle: "",
      allToppingPork: false,
      allToppingBeef: false,
      topping: [],
      price: {
        typePrice: "ธรรมดา",
        price: 40
      },
      amountOrder: 1,
      remarks: []
    }
  };

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

  // const listenOrders = () => {
  //   firebase.db.collection("orders").onSnapshot(function(querySnapshot) {
  //     const orders = [];

  //     querySnapshot.forEach(doc => {
  //       orders.push(doc.data().name);
  //     });
  //     // console.log(orders, "xxx");
  //     // console.log("Current data: ", result?.data());
  //   });
  // };

  const handleSubmit = (value, action) => {
    console.log(action, "xx");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => {
        return <Order handleSubmit={handleSubmit} />;
      }}
    </Formik>
  );
};

export default OrderPage;
