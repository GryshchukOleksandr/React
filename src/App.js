import { useEffect, useState } from "react";
import { string, object } from "yup";

const FIRSTNAME_TEMPLATE = /^[a-zA-Z]*$/;
const EMAIL_TEMPLATE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASWORD1_TEMPLATE = /\d/;
const PASWORD2_TEMPLATE = /[A-Z]/;

const Validationschema = object({
  firstName: string()
    .min(2, "FirstName must be longer 2")
    .matches(FIRSTNAME_TEMPLATE, "FirstName should not have digits")
    .required("Required"),
  lastName: string()
    .min(2, "LastName must be longer 2")
    .matches(FIRSTNAME_TEMPLATE, "LastName should not have digits")
    .required("Required"),
  email: string().matches(EMAIL_TEMPLATE, "Emailerror").required("Required"),
  password: string()
    .matches(PASWORD2_TEMPLATE, "Password must have capitalized")
    .matches(PASWORD1_TEMPLATE, "Password must have digits")
    .min(6, "Password must be longer 6 and less 10")
    .max(10, "Password must be longer 6 and less 10")
    .required("Required", "Password cannot be empty"),
});

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState(
    "FirstName cannot be empty"
  );
  const [lastName, setLastName] = useState("");
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [lastNameError, setLastNameError] = useState(
    "LastName cannot be empty"
  );
  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email cannot be empty");
  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(
    "Password cannot be empty"
  );

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || firstNameError || lastNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, lastNameError, emailError, passwordError]);

  const firstNameHendler = (e) => {
    setFirstName(e.target.value);
    Validationschema.validate(
      { firstName: e.target.value },
      { abortEarly: false }
    )
      .then((respons) => {
        console.log(respons);
        setFirstNameError("");
      })
      .catch((err) => {
        const errorObject = {};
        err.inner.forEach((x) => {
          if (x.path !== undefined) {
            errorObject[x.path] = x.errors;
          }
        });
        if (errorObject.firstName && errorObject.firstName.length) {
          setFirstNameError(errorObject.firstName[0]);
        } else {
          setFirstNameError("");
        }
        console.log(errorObject);
      });
  };

  const lastNameHendler = (e) => {
    setLastName(e.target.value);
    Validationschema.validate(
      { lastName: e.target.value },
      { abortEarly: false }
    )
      .then((respons) => {
        setLastNameError("");
      })
      .catch((err) => {
        const errorObject = {};
        err.inner.forEach((x) => {
          if (x.path !== undefined) {
            errorObject[x.path] = x.errors;
          }
        });
        if (errorObject.lastName && errorObject.lastName.length) {
          setLastNameError(errorObject.lastName[0]);
        } else {
          setLastNameError("");
        }
      });
  };

  const emailHendler = (e) => {
    setEmail(e.target.value);
    Validationschema.validate({ email: e.target.value }, { abortEarly: false })
      .then((respons) => {
        setEmailError("");
      })
      .catch((err) => {
        const errorObject = {};
        err.inner.forEach((x) => {
          if (x.path !== undefined) {
            errorObject[x.path] = x.errors;
          }
        });
        if (errorObject.email && errorObject.email.length) {
          setEmailError(errorObject.email[0]);
        } else {
          setEmailError("");
        }
      });
  };

  const passwordHendler = (e) => {
    setPassword(e.target.value);
    Validationschema.validate(
      { password: e.target.value },
      { abortEarly: false }
    )
      .then(() => {
        setPasswordError("");
      })
      .catch((err) => {
        const errorObject = {};
        err.inner.forEach((x) => {
          if (x.path !== undefined) {
            errorObject[x.path] = x.errors;
          }
        });
        if (errorObject.password && errorObject.password.length) {
          setPasswordError(errorObject.password[0]);
        } else {
          setPasswordError("");
        }
      });
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstNameDirty(true);
        break;
      case "lastName":
        setLastNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form validationschema={Validationschema}>
        <h1>Registration</h1>
        <label>firstName</label>
        {firstNameDirty && firstNameError && (
          <div style={{ color: "red" }}>{firstNameError}</div>
        )}
        <input
          onChange={(e) => firstNameHendler(e)}
          onBlur={(e) => blurHandler(e)}
          value={firstName}
          type="text"
          name="firstName"
        ></input>
        <br></br>
        <br></br>
        <label>lastName</label>
        {lastNameDirty && lastNameError && (
          <div style={{ color: "red" }}>{lastNameError}</div>
        )}
        <input
          onChange={(e) => lastNameHendler(e)}
          onBlur={(e) => blurHandler(e)}
          value={lastName}
          type="text"
          name="lastName"
        ></input>
        <br></br>
        <br></br>
        <label>email</label>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <input
          onChange={(e) => emailHendler(e)}
          onBlur={(e) => blurHandler(e)}
          type="email"
          name="email"
          value={email}
        ></input>
        <br></br>
        <br></br>
        <label>password</label>
        {passwordDirty && passwordError && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <input
          onChange={(e) => passwordHendler(e)}
          onBlur={(e) => blurHandler(e)}
          type="password"
          name="password"
          value={password}
          required
        ></input>
        <br></br>
        <br></br>
        <button type="submit" disabled={!formValid}>
          Save
        </button>
      </form>
    </div>
  );
}
