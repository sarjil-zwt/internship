import React, { useEffect, useState } from "react";
import "./PaymentSuccess.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import payment from "./paymentsuccessanimationdata.json";

const PaymentSuccess = () => {
  const [paymentIntent, setPaymentIntent] = useState({});
  const navigate = useNavigate();
  const [time, setTime] = useState(10);
  useEffect(() => {
    if (sessionStorage.getItem("payment")) {
      const payment = JSON.parse(sessionStorage.getItem("payment"));
      setPaymentIntent(payment);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (time <= 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <div className="paymentsuccesspage">
      <div className="paymentsuccesswrapper">
        <Lottie animationData={payment} />
        <p className="pspthankyou">Thank you !!</p>
        <p>Payment Successfull</p>
        <p>Redirecting you in - {time}s</p>
      </div>
      <div className="paymentsummary">
        <div className="pspaymentdetails">
          <p className="psp">
            Payment Type <span>Card</span>
          </p>
          <p className="psp">
            Transaction Id <span>{paymentIntent?.id}</span>
          </p>
          <p className="psp">
            amount <span>₹{paymentIntent?.amount / 100}</span>
          </p>
          <p className="psp">
            status <span>{paymentIntent?.status}</span>
          </p>
        </div>
        <div className="pspayerdetails">
          <p className="psp">
            Done By <span>{paymentIntent?.shipping?.name}</span>
          </p>
          <p className="psp">
            Phone <span>{paymentIntent?.shipping?.phone}</span>
          </p>
          <p className="psp">
            Email
            <span>
              {paymentIntent?.shipping?.email
                ? paymentIntent?.shipping?.email
                : "-"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
