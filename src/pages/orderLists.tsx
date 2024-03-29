import React, { useState, useEffect } from "react";
import { useFirebase } from "components/Firebase/useFirebase";
import OrderLists from "containers/OrderLists";

const OrderListsPage: React.FC = () => {
  const [datas, setDatas] = useState(null);
  const firebase = useFirebase();

  const listenOrders = () => {
    firebase.db
      .collection("orders")
      .orderBy("created")
      .onSnapshot(function(querySnapshot) {
        const orders = [];

        querySnapshot.forEach(doc => {
          orders.push(doc.data());
        });
        setDatas(orders);
      });
  };

  useEffect(() => {
    listenOrders();
  }, []);
  if (datas) {
    return <OrderLists datas={datas} />;
  }
  return <div>loading...</div>;
};

export default OrderListsPage;
