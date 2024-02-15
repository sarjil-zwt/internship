import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useRef, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { CreditCard, Event, VpnKey } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import "./StripePaymentComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartState } from "../../../../redux/features/cartSlice";

const StripePaymentComponent = ({ shippingAddress, billingAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const cartState = useSelector((state) => state.cartState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paymentData = {
    amount: Math.round(cartState.cart.fTotal * 100),
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
            name: billingAddress.vFirstname + billingAddress.vLastname,
            phone: billingAddress.vPhone,
            address: {
              line1: billingAddress.vHouse,
              line2: billingAddress.vArea,

              city: billingAddress.vCity,
              state: billingAddress.vState,
              postal_code: billingAddress.vPincode,
              country: "IN",
            },
          },
        },
        shipping: {
          name: shippingAddress.vFirstname + shippingAddress.vLastname,
          phone: shippingAddress.vPhone,
          address: {
            line1: shippingAddress.vHouse,
            line2: shippingAddress.vArea,

            city: shippingAddress.vCity,
            state: shippingAddress.vState,
            postal_code: shippingAddress.vPincode,
            country: "IN",
          },
        },
      });

      if (result.paymentIntent.status === "succeeded") {
        await axios
          .post("/orders", {
            cart: cartState.cart,
            iShippingAddress: shippingAddress.id,
            iBillingAddress: billingAddress.id,
            vPaymentId: result.paymentIntent.id,
            vPaymentStatus: result.paymentIntent.status,
          })
          .then((res) => {
            toast.success(res.data.message);
            console.log(res.data.cart);
            dispatch(setCartState(res.data.cart));
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
      </form>
    </div>
  );
};
export default StripePaymentComponent;
