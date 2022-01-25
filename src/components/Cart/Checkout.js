import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isInvalid = (value) => value.trim() === "";
const fiveCharLong = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidityCheck, setFromValidityCheck] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isInvalid(enteredName);
    const streetIsValid = !isInvalid(enteredStreet);
    const cityIsValid = !isInvalid(enteredCity);
    const postalCodeIsValid = fiveCharLong(enteredPostalCode);

    setFromValidityCheck({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formValidityCheck.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formValidityCheck.street ? "" : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formValidityCheck.postalCode ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formValidityCheck.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidityCheck.name && <p>Please enter Valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidityCheck.street && <p>Please enter Valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formValidityCheck.postalCode && <p>Please enter Valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidityCheck.city && <p>Please enter Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
