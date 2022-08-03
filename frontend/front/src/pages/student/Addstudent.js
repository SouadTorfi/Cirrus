import React from "react";
import "./Addstudent.css";
import axios from "axios";
import { useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Addstudent() {
  toast.configure();
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
      email: state.email,
      address: state.address,
      phone: state.phone,
      password: state.password,
    };
    axios
      .post(`http://localhost:3000/api/student/add`, data)
      .then((res) => {
        console.log(res.data.response);
        setState({
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        toast.success("Student added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While adding Student");
      });
  };

  return (
    <div>
      <Header/>
      <div>
        {" "}
        <div id="addStudent-container" onSubmit={handleSubmit}>
          <h1>Add Teacher</h1>
          <div className="addStudent-underline"></div>
          <form id="addStudent_form">
            <div className="addStudent-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                id="name_input"
                onChange={handleChange}
                value={state.name}
                required
              />
            </div>

            <div className="addStudent-telephone">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your number"
                name="phone"
                id="telephone_input"
                onChange={handleChange}
                value={state.phone}
                required
              />
            </div>
            <div className="addStudent-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your password"
                name="password"
                id="password_input"
                onChange={handleChange}
                value={state.password}
                required
              />
            </div>
            <div className="addStudent-telephone">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your address"
                name="address"
                id="address_input"
                onChange={handleChange}
                value={state.address}
                required
              />
            </div>
            <div className="addStudent-email">
              <label for="email"></label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                id="email_input"
                onChange={handleChange}
                value={state.email}
                required
              />
            </div>
            <div className="addStudent-submit">
              <input type="submit" value="save" id="form_button-addStudent" />
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default Addstudent;
