import { Link, useNavigate } from "react-router-dom";
import "./RegisterCard.css";
import axios from "axios";
import { useState } from "react";

const RegisterCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://web-ca1.onrender.com/api/auth/register`, {
        name,
        email,
        password,
      });
      setStep(2);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://web-ca1.onrender.com/api/auth/verify`, { email, otp });
      alert("Registration successful");
      navigate("/account/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="register__card__container">
      {step === 1 ? (
        <form className="register__card" onSubmit={handleRegister}>
          <div className="register__header">
            <h1>Create Account</h1>
          </div>
          <div className="register__inputs">
            <div className="fname__input__container reg__input__container">
              <label className="fname__label input__label">Name</label>
              <input
                type="text"
                className="fname__input register__input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="email__input__container reg__input__container">
              <label className="email__label input__label">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="fname__input register__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password__input__container reg__input__container">
              <label className="password__label input__label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="fname__input register__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register__button__container">
              <button className="register__button" type="submit">
                Create Account
              </button>
            </div>
          </div>
          <div className="register__other__actions">
            <div className="register__login__account">
              Already have account? <Link to="/account/login">Login</Link>
            </div>
          </div>
        </form>
      ) : (
        <form className="register__card" onSubmit={handleVerifyOTP} style={{}}>
          <div className="register__inputs">
            <div className="password__input__container reg__input__container">
              <label className="email__label input__label">
                Verification Code
              </label>
              <input
                type="text"
                placeholder="Code"
                className="fname__input register__input"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <div className="register__button__container">
              <button className="register__button" type="submit">
                Verify
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterCard;
