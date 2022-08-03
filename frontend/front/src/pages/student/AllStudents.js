import React from "react";
import { useState, useEffect } from "react";
import "./AllStudents.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loader/Loader";

function AllStudents() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStudents();
  }, []);
  const getStudents = async () => {
    await axios
      .get(`http://localhost:3000/api/student`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
     
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function deleteStudent(t_id) {
    if (window.confirm("Are you sure you want to delete Student?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/student/${t_id}`)
        .then((res) => {
          toast.success("Student Deleted Successfully");
          getStudents();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Header/>
      <div className="student-container">
      {loading ? (
          <Loading />
        ) : (
          <>
        <h1>All Students</h1>

        <div className="student-underline"></div>
        <h4></h4>
        <Link to="/addstudent">
          <button className="add-student-btn">Add Student</button>
        </Link>
        <ul className="student-responsive-table">
          <li className="table-content">
            <div className="col col-1">Name</div>
            <div className="col col-2">Email</div>
            <div className="col col-3">Phone</div>
            <div className="col col-3">Address</div>
            <div className="col col-1">Action</div>
          </li>
          {student &&
            student.map((item, index) => {
              return (
                <li className="student-table-row" key={index}>
                  <div className="col col-1" data-label="Name">
                    {item.name}
                  </div>
                  <div className="col col-2" data-label="Email">
                    {item.email}
                  </div>

                  <div className="col col-3" data-label="Phone">
                    {item.phone}
                  </div>
                  <div className="col col-3" data-label="Address">
                    {item.address}
                  </div>
                  <div className="col col-1">
                    <div className="update">
                      <div className="opacity">
                        <Link to={"/editstudent/" + item._id}>
                          <button>Update</button>
                        </Link>
                      </div>
                    </div>
                    <div className="delete">
                      <div className="opacity">
                        <button onClick={() => deleteStudent(item._id)}>
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

export default AllStudents;
