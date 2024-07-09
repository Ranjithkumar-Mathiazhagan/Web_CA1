import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";
import axios from "axios";
import { useState } from "react";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://web-ca1.onrender.com/api/auth/signin`,
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);
      alert("Sign-in successful");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <form className="login__inputs" onSubmit={handleSignIn}>
          <div className="email__input__container input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input login__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login__button__container">
            <button className="login__button" type="submit">LOGIN</button>
          </div>
        </form>
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don't have account?{" "}
            <Link to="/account/register">Create account</Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
