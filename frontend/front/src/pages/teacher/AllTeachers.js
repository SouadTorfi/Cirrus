import React from "react";
import { useState, useEffect } from "react";
import "./AllTeachers.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loader/Loader";


function AllTeachers() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTeachers();
  }, []);
  const getTeachers = async () => {
    await axios
      .get(`http://localhost:3000/api/teacher`)
      .then((res) => {
        setTeacher(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function deleteTeacher(t_id) {
    if (window.confirm("Are you sure you want to delete Teacher?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/teacher/${t_id}`)
        .then((res) => {
          toast.success("Teacher Deleted Successfully");
          getTeachers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Header/>
      <div className="teacher-container">
      {loading ? (
          <Loading />
        ) : (
          <>
        <h1>All Teachers</h1>

        <div className="teacher-underline"></div>
        <h4></h4>
        <Link to="/addteacher">
          <button className="add-teacher-btn">Add Teacher</button>
        </Link>
        <ul className="teacher-responsive-table">
          <li className="table-content">
            <div className="col col-1">Name</div>
            <div className="col col-2">Email</div>
            <div className="col col-3">Phone</div>
            <div className="col col-3">Address</div>
            <div className="col col-1">Action</div>
          </li>
          {teacher &&
            teacher.map((item, index) => {
              return (
                <li className="teacher-table-row" key={index}>
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
                        <Link to={"/editteacher/" + item._id}>
                          <button>Update</button>
                        </Link>
                      </div>
                    </div>
                    <div className="delete">
                      <div className="opacity">
                        <button onClick={() => deleteTeacher(item._id)}>
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

export default AllTeachers;
