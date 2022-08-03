import React from "react";
import "./Login.css";
import LoginImage from "../../images/LoginPage.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const toggleForm = () => {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
};
function Login() {
  const navigate = useNavigate();
  toast.configure();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const loginHandleChange = (e) => {
    let { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const loginHandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: login.email,
      password: login.password,
    };

    axios
      .post(`http://localhost:3000/api/teacher/login`, data)
      .then((res) => {
        if (res.status === 200) {
          setLogin({
            email: "",
            password: "",
          });
          toast.success("Logged In Successfully");

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.teacher.id);
          localStorage.setItem("name", res.data.teacher.name);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Logging in");
      });
  };

  //sign up

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const registerHandleChange = (e) => {
    let { name, value } = e.target;

    setRegister({ ...register, [name]: value });
  };

  const registerHandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: register.name,
      email: register.email,
      password: register.password,
      phone: register.phone,
      address: register.address,
    };

    axios
      .post(`http://localhost:3000/api/teacher/signup`, data)
      .then((res) => {
        if (res.status === 200) {
          setRegister({
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
          });
          toast.success("Register Successfully");

          localStorage.setItem("token", res.data.token);
          // navigate("/userPage");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Register");
      });
  };

  return (
    <>
      <div className="login-page">
        <section className="login">
          <div className="container">
            <div className="user signinBx" onSubmit={loginHandleSubmit}>
              <div className="imgBx">
                <img src={LoginImage} alt="" />
              </div>
              <div className="formBx">
                <form>
                  <h2>Sign In</h2>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={loginHandleChange}
                    value={login.email}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={loginHandleChange}
                    value={login.password}
                  />

                  <input type="submit" name="" value="Login" />

                  <p className="signup">
                    Don't have an account ?
                    <span className="loginLink" onClick={toggleForm}>
                      Sign Up.
                    </span>
                  </p>
                </form>
              </div>
            </div>
            <div className="user signupBx" onSubmit={registerHandleSubmit}>
              <div className="formBx">
                <form>
                  <h2>Create an account</h2>
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    onChange={registerHandleChange}
                    value={register.name}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={registerHandleChange}
                    value={register.email}
                  />
                  <input
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={registerHandleChange}
                    value={register.phone}
                  />
                  <input
                    type="address"
                    name="address"
                    placeholder="Address"
                    onChange={registerHandleChange}
                    value={register.address}
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    onChange={registerHandleChange}
                    value={register.password}
                  />

                  <input type="submit" name="" value="Sign Up" />
                  <p className="signup">
                    Already have an account ?
                    <span className="loginLink" onClick={toggleForm}>
                      Sign in.
                    </span>
                  </p>
                </form>
              </div>
              <div className="imgBx">
                <img src={LoginImage} alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
