import React, { useState } from "react";

import { useRouter } from "next/router";

import styles from "styles/modules/Merch.module.scss";
import LoadingButton from "components/LoadingButton";

const CheckoutForm = ({ cart, updateCart }) => {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const removeFromCart = (e) => {
    let newCart = JSON.parse(JSON.stringify(cart)); // this an extremely hacky way of getting a hard copied array
    let index = e.target.parentElement.getAttribute("data-value"); // this is gross chaining
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const createPaymentIntent = async (e) => {
    setLoading(true);
    e.preventDefault();
    fetch("https://api.coopsoc.com.au/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        email: document.querySelector("#email").value,
        cart: {
          items: [
            ...cart.map((item) => {
              return { id: item.id, size: item.size };
            }),
          ],
        },
      }),
    })
      .then((object) => {
        object.json().then((client) => {
          setLoading(false);
          const { clientSecret } = client;
          router.push(`/checkout/${clientSecret}`);
        });
      })
      .catch((err) => {
        setLoading(false);
        router.push("/checkout/unsuccessful");
      });
  };

  return (
    <div className="row">
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span
            className={
              "badge bg-primary rounded-pill " + styles[`cart-items-badge`]
            }
          >
            {cart ? cart.length : 0}
          </span>
        </h4>
        <ul className="list-group mb-3">
          {cart.map((product, index) => {
            const { name, price } = product;
            return (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between lh-sm"
                data-value={index}
              >
                <div>
                  <h6 className="my-0">{name}</h6>
                </div>
                <span className="text-muted">${(price / 100).toFixed(2)}</span>
                <span className="text-muted" onClick={removeFromCart}>
                  &#x2715;
                </span>
              </li>
            );
          })}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (AUD)</span>
            <strong>
              $
              {cart
                .reduce(
                  (partialSum, product) =>
                    partialSum + Number(product.price / 100),
                  0,
                )
                .toFixed(2)}
            </strong>
          </li>
        </ul>
      </div>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                required
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <LoadingButton
            onClick={(e) => createPaymentIntent(e)}
            text="Continue to Checkout"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
