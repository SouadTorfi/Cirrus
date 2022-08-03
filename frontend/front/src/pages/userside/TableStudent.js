import React from "react";
import { useState, useEffect } from "react";
import "./tablestudent.css";
import axios from "axios";
import Loading from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


function TableStudent() {
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

  return (
    <div>
      <Header/>

      <div className="studentSide-container">
      {loading ? (
          <Loading />
        ) : (
          <>
        <h1>All Students</h1>

        <div className="studentSide-underline"></div>
        <ul className="studentSide-responsive-table">
          <li className="table-content">
            <div className="col col-1">Name</div>
            <div className="col col-2">Email</div>
            <div className="col col-3">Phone</div>
            <div className="col col-3">Address</div>
          </li>
          {student &&
            student.map((item, index) => {
              return (
                <li className="studentSide-table-row" key={index}>
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

export default TableStudent;
