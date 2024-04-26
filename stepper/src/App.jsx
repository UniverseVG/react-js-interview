import "./App.css";
import CheckoutStepper from "./components/CheckoutStepper";

function App() {
  const CHECKOUT_STEPS = [
    {
      id: 1,
      name: "Customer Info",
      Component: () => <div>Provide your contact details.</div>,
    },
    {
      id: 2,
      name: "Shipping Info",
      Component: () => <div>Enter your shipping address.</div>,
    },
    {
      id: 3,
      name: "Payment",
      Component: () => <div>Complete payment for your order.</div>,
    },
    {
      id: 4,
      name: "Delivered",
      Component: () => <div> Your order has been delivered.</div>,
    },
  ];

  return (
    <div>
      <h2>Checkout</h2>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
}

export default App;
