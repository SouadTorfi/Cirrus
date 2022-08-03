import React from "react";
import "./EditStudent.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function EditStudent() {
  toast.configure();
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleStudent(id);
    }
  }, [id]);
  const getSingleStudent = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/student/${id}`);

    if (response.status === 200) {
      setState({ ...response.data });
    }
  };

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
      .put(`http://localhost:3000/api/student/${id}`, data)
      .then((res) => {
        setState({
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        toast.success("Student Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Student");
      });
  };

  return (
    <div>
      <Header/>
      <div>
        {" "}
        <div id="editStudent-container" onSubmit={handleSubmit}>
          <h1>Edit Student</h1>
          <div className="editStudent-underline"></div>
          <form id="editStudent_form">
            <div className="editStudent-name">
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

            <div className="editStudent-telephone">
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
            <div className="editStudent-name">
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
            <div className="editStudent-telephone">
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
            <div className="editStudent-email">
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
            <div className="editStudent-submit">
              <input
                type="submit"
                value="save change"
                id="form_button-editStudent"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default EditStudent;
