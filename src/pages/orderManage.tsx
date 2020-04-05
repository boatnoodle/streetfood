import React, { useState, useEffect } from "react";
import { useFirebase } from "components/Firebase/useFirebase";
import OrderManage from "containers/OrderManage";

export const orderStatus = {
  WAIT: "รอ",
  DOING: "กำลังทำ",
  DONE: "เสร็จแล้ว"
};

const OrderManagePage: React.FC = () => {
  const [orderWait, setOrderWait] = useState(null);
  const [orderDoing, setOrderDoing] = useState(null);
  const firebase = useFirebase();

  const fetchOrderByStatus = status => {
    firebase.db
      .collection("orders")
      .where("orderStatus", "==", orderStatus[status])
      .onSnapshot(function(querySnapshot) {
        const orders = [];

        querySnapshot.forEach(doc => {
          orders.push({ id: doc.id, ...doc.data() });
        });

        if (orderStatus[status] === orderStatus.WAIT) {
          setOrderWait(orders);
        } else if (orderStatus[status] === orderStatus.DOING) {
          setOrderDoing(orders);
        }
      });
  };

  const getOrderDoing = () => {
    firebase.db
      .collection("orders")
      .where("orderStatus", "==", orderStatus.WAIT)
      .limit(1)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          const orderRef = firebase.db.collection("orders").doc(doc.id);

          // Set the "capital" field of the city 'DC'
          return orderRef
            .update({
              orderStatus: orderStatus.DOING
            })
            .then(function() {
              console.log("Document successfully updated!");
            })
            .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    if (orderDoing?.length === 0) {
      getOrderDoing();
    }
  }, [orderDoing, orderWait]);
  useEffect(() => {
    fetchOrderByStatus("WAIT");
    fetchOrderByStatus("DOING");
  }, []);

  if (orderWait && orderDoing) {
    return <OrderManage orderWait={orderWait} orderDoing={orderDoing} />;
  }
  return <div>loading...</div>;
};

export default OrderManagePage;
