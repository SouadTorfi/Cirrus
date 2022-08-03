import React from "react";
import "./EditHomework.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function EditHomework() {
  toast.configure();
  const [state, setState] = useState({
    subject: "",
    text: "",
    note: "",
    teacher_id: localStorage.getItem("id"),
    teacher_name: localStorage.getItem("name"),
    student_id: "",
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleHomework(id);
    }
  }, [id]);
  const getSingleHomework = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/homework/${id}`
    );

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
      subject: state.subject,
      text: state.text,
      note: state.note,
      teacher_id: state.teacher_id,
      student_id: state.student_id,
    };
    axios
      .put(`http://localhost:3000/api/homework/${id}`, data)
      .then((res) => {
        console.log(res.data.response);

        setState({
          subject: "",
          text: "",
          note: "",
          teacher_id: "",
          student_id: "",
        });
        toast.success("Homework updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While updating Homework");
      });
  };

  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    getTeacherById();
    getAllstudents();
  }, []);
  const getTeacherById = async () => {
    const id = localStorage.getItem("id");
    await axios
      .get(`http://localhost:3000/api/teacher/${id}`)
      .then((res) => {
        setTeacher(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllstudents = async () => {
    await axios
      .get(`http://localhost:3000/api/student`)
      .then((res) => {
        setStudent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div>
        {" "}
        <div id="edithomework-container" onSubmit={handleSubmit}>
          <h1>Add Homework</h1>
          <div className="edithomework-underline"></div>
          <form id="edithomework_form">
            <div className="edithomework-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                id="subject_input"
                onChange={handleChange}
                value={state.subject}
                required
              />
            </div>

            <div className="addStudent-teacher">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Teacher"
                name="teacher_id"
                id="teacher_input"
                disabled
                // onChange={handleChange}
                value={state.teacher_name}
                required
              />
            </div>

            <div className="edithomework-note">
              <label for="note"></label>
              <input
                type="text"
                placeholder="Note"
                name="note"
                id="note_input"
                onChange={handleChange}
                value={state.note}
                required
              />
            </div>
            <div
              className="edithomework-textHomework"
              id="edithomework-container"
            >
              <label for="textHomework"></label>
              <textarea
                name="text"
                placeholder="Text"
                id="textHomework_input"
                cols="30"
                rows="5"
                onChange={handleChange}
                value={state.text}
                required
              ></textarea>
            </div>

            <select
              className="select-student"
              name="student_id"
              onChange={handleChange}
              value={state.student_id}
            >
              <option>Select Student</option>
              {student.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <div className="edithomework-submit">
              <input type="submit" value="save" id="form_button-edithomework" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default EditHomework;
