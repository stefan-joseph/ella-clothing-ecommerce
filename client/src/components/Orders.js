import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Loading, OrderSummary } from ".";
import styled from "styled-components";

const Orders = () => {
  const { getAllUserOrders, orders, loading } = useAppContext();

  const [orderDetails, setOrderDetails] = useState("");

  useEffect(() => {
    getAllUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading === "orders") {
    return (
      <Wrapper>
        <div className="loading-container">
          <Loading text="grabbing your orders" />
        </div>
      </Wrapper>
    );
  }

  if (orders.length < 1) {
    return (
      <Wrapper>
        <div className="no-orders">You haven't made any orders yet...</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {orderDetails ? (
        <div className="order-details">
          <button
            className="back-btn orders-btn"
            onClick={() => setOrderDetails("")}
          >
            all orders
          </button>
          <div className="order-num">
            Order #: <span>{orderDetails._id}</span>
          </div>
          <div className="status">
            Status: <span>{orderDetails.status}</span>
          </div>
          <OrderSummary clientOrder={orderDetails} />
        </div>
      ) : (
        <ul className="order-list">
          {orders &&
            orders.map((order) => {
              const { _id, createdAt, total, status } = order;
              return (
                <li key={_id} className="order">
                  <div className="order-left">
                    <h4 className="date">
                      {new Date(createdAt.split("T")[0]).toLocaleDateString(
                        "en-US",
                        {
                          timeZone: "UTC",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </h4>
                    <div className="total">
                      Total: <span>${(total / 100).toFixed(2)}</span>
                    </div>
                    <div className="status">
                      Status: <span>{status}</span>
                    </div>
                    <div className="order-num">
                      Order #: <span>{_id}</span>
                    </div>
                  </div>
                  <div className="order-right">
                    {/* <div className="order-num">
                      Order #: <span>{_id}</span>
                    </div> */}
                    <button
                      className="submit-btn details-btn"
                      onClick={() => setOrderDetails(order)}
                    >
                      details
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .loading-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .no-orders {
    font-size: 1.5rem;
  }

  .order-details {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    max-width: 60rem;
    margin-bottom: 5rem;
  }

  .order-list {
    border-top: var(--borderWidth) solid var(--secondaryColor);
    max-width: 60rem;
    margin-bottom: 5rem;
  }

  .order {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: var(--borderWidth) solid var(--secondaryColor);

    @media (min-width: 550px) {
      flex-direction: unset;
    }
  }

  .order-left,
  .order-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.2rem;
  }

  .order-right {
    align-items: end;
  }

  .date {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .total,
  .status,
  .order-num {
    color: var(--secondaryColor);
    span {
      font-size: 1.1rem;
      color: var(--mainColor);
      text-transform: capitalize;
    }
  }

  .status {
    margin-bottom: 2rem;
  }

  .details-btn {
    margin-top: auto;
  }

  .orders-btn {
    margin-bottom: 3rem;
  }
`;

export default Orders;
