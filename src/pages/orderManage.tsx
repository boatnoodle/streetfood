import React, { useState, useEffect } from "react";
import { useFirebase } from "components/Firebase/useFirebase";
import OrderManage from "containers/OrderManage";

export const orderStatus = {
  WAIT: "รอ",
  DOING: "กำลังทำ",
  DONE: "เสร็จแล้ว"
};

function play() {
  const audio = new Audio("/sound/soundNotification.mp3");
  audio.play();
}

const OrderManagePage: React.FC = () => {
  const [orderWait, setOrderWait] = useState([]);
  const [orderDoing, setOrderDoing] = useState([]);
  const firebase = useFirebase();

  const fetchOrderByStatus = status => {
    const ref = firebase.db.collection("orders");

    ref
      .where("orderStatus", "==", orderStatus[status])
      .orderBy("created", "asc")
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

        return orders;
      });
  };

  const getOrderDoing = async () => {
    firebase.db
      .collection("orders")
      .where("orderStatus", "==", orderStatus.DOING)
      .onSnapshot(function(querySnapshot) {
        let arr;
        querySnapshot.forEach(doc => {
          arr = doc.data();
        });

        if (!arr) {
          firebase.db
            .collection("orders")
            .where("orderStatus", "==", orderStatus.WAIT)
            .orderBy("created", "asc")
            .limit(1)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                const orderRef = firebase.db.collection("orders").doc(doc.id);

                return orderRef
                  .update({
                    orderStatus: orderStatus.DOING
                  })
                  .then(function() {
                    console.log("change status to doing already!");
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
        }
      });
  };
  useEffect(() => {
    play();
  }, [orderWait]);

  useEffect(() => {
    if (orderDoing.length === 0) {
      getOrderDoing();
    }
  }, [orderWait, orderDoing]);

  useEffect(() => {
    fetchOrderByStatus("WAIT");
    fetchOrderByStatus("DOING");
  }, []);

  if (orderWait && orderDoing) {
    return (
      <OrderManage
        orderWait={orderWait}
        orderDoing={orderDoing}
        setOrderDoing={setOrderDoing}
      />
    );
  }
  return <div>loading...</div>;
};

export default OrderManagePage;
