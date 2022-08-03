import React from "react";
import { useState, useEffect } from "react";
import "./AllHomework.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loader/Loader";


function AllHomework() {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllHomeworks();
  }, []);
  const getAllHomeworks = async () => {
    await axios
      .get(`http://localhost:3000/api/homework`)
      .then((res) => {
        setHomework(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function deletehomework(t_id) {
    if (window.confirm("Are you sure you want to delete Homework?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/homework/${t_id}`)
        .then((res) => {
          toast.success("Homework Deleted Successfully");
          getAllHomeworks();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Header/>
      <div className="homework-container">
      {loading ? (
          <Loading />
        ) : (
          <>
        <h1>All HomeWork</h1>

        <div className="homework-underline"></div>
        <h4></h4>
        <Link to="/addhomework">
          <button className="add-homework-btn">Add homework</button>
        </Link>
        <ul className="homework-responsive-table">
          <li className="table-content">
            <div className="col col-1">Title</div>
            <div className="col col-2">Text</div>
            <div className="col col-1">Note</div>
            <div className="col col-1">Teacher</div>
            <div className="col col-1">Student</div>
            <div className="col col-1">Action</div>
          </li>
          {homework &&
            homework.map((item, index) => {
              return (
                <li className="homework-table-row" key={index}>
                  <div className="col col-1" data-label="Subject">
                    {item.subject}
                  </div>
                  <div className="col col-2" data-label="Text">
                    {item.text}
                  </div>

                  <div className="col col-1" data-label="Note">
                    {item && item ? item.note : "Null"}
                  </div>
                  <div className="col col-1" data-label="Teacher">
                    {item.teacher_id.name}
                  </div>
                  <div className="col col-1" data-label="Student">
                    {item && item.student_id ? item.student_id.name : "Null"}
                  </div>
                  <div className="col col-1">
                    <div className="update">
                      <div className="opacity">
                        <Link to={"/edithomework/" + item._id}>
                          <button>Update</button>
                        </Link>
                      </div>
                    </div>
                    <div className="delete">
                      <div className="opacity">
                        <button onClick={() => deletehomework(item._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        </>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default AllHomework;
