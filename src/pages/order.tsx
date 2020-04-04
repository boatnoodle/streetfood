import React from "react";
import { useFirebase } from "components/Firebase/useFirebase";
import { Formik } from "formik";
import Order from "containers/Order";

const OrderPage: React.FC = () => {
  const firebase = useFirebase();
  const initialValues = {
    tableNo: null,
    queueNo: 1,
    orders: [
      // {
      //   typeMenu: "ก๋วยเตี๋ยว",
      //   typeNoodle: "เรือ",
      //   noodle: "หมี่",
      //   allToppingPork: false,
      //   allToppingBeef: false,
      //   topping: [
      //     {
      //       name: "ลูกชิ้นหมู",
      //       price: 10,
      //       addMore: false,
      //       amount: 0,
      //       typeTopping: "toppingPork"
      //     },
      //     {
      //       name: "ตับ",
      //       price: 10,
      //       addMore: false,
      //       amount: 2,
      //       typeTopping: "toppingPork"
      //     },
      //     {
      //       name: "ม้ามหมู",
      //       price: 10,
      //       addMore: false,
      //       amount: 0,
      //       typeTopping: "toppingPork"
      //     }
      //   ],
      //   price: { typePrice: "ธรรมดา", price: 40 },
      //   amountOrder: 2,
      //   remarks: ["ไม่ผักบุ้ง", "ไม่งอก"]
      // }
    ],
    orderDetail: {
      provider: "ร้านโกเอ",
      typeOrder: "ใส่ถุง",
      typeMenu: "ก๋วยเตี๋ยว",
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
