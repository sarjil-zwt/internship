import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import "./StripePaymentComponent.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StripePaymentComponent = ({ shippingAddress, billingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartState = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const paymentData = {
    amount: Math.round(cartState.cart.total * 100),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/payments/create-payment-intent",
        paymentData,
        config
      );
      console.log(data);

      if (!stripe || !elements) return;

      //   const result = await stripe.confirmPayment({
      //     elements: elements,
      //     confirmParams: {
      //       return_url: "http://localhost:3000",
      //     },
      //   });

      console.log(shippingAddress, "Shipping");
      console.log(billingAddress, "billing");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: billingAddress.fullname,
            phone: billingAddress.phone,
            address: {
              line1: billingAddress.house,
              line2: billingAddress.area,

              city: billingAddress.city,
              state: billingAddress.state,
              postal_code: billingAddress.pincode,
              country: "IN",
            },
          },
        },
        shipping: {
          name: shippingAddress.fullname,
          phone: billingAddress.phone,
          address: {
            line1: billingAddress.house,
            line2: billingAddress.area,

            city: billingAddress.city,
            state: billingAddress.state,
            postal_code: billingAddress.pincode,
            country: "IN",
          },
        },
      });

      if (result.paymentIntent.status === "succeeded") {
        await axios
          .post("/orders", {
            cart: cartState.cart,
            shippingAddress: shippingAddress.id,
            billingAddress: billingAddress.id,
            paymentId: result.paymentIntent.id,
            paymentStatus: result.paymentIntent.status,
          })
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
        toast.success("Payment Successfull");
        sessionStorage.setItem("payment", JSON.stringify(result.paymentIntent));
        navigate("/paymentsuccess");
      } else {
        toast.error(
          result.error.message || "There's some issue while processing payment "
        );
      }

      setIsLoading(false);
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
      toast.error(error.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="stripepaymentcomponent">
      {isLoading && <Loader />}
      <form id="payment-form" onSubmit={handleSubmit} className="paymentform">
        <h3>Payment</h3>
        <div>
          <p>Card Number</p>
          <div className="paymentinputdiv">
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
        </div>
        <div>
          <p>Expiry Date</p>
          <div className="paymentinputdiv">
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
        </div>
        <div>
          <p>CVC</p>
          <div className="paymentinputdiv">
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
        </div>
        {/* <PaymentElement options={paymentElementOptions} /> */}

        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="spcpaynowbtn"
          ref={payBtn}
        >
          Pay now
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};
export default StripePaymentComponent;
