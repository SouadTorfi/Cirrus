import React from "react";
import { useState, useEffect } from "react";
import "./tableTeacher.css";
import axios from "axios";
import Loading from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function TableTeacher() {
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

  return (
    <div>
      <Header />
      <div className="teacherSide-container">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1>All Teachers</h1>

            <div className="teacherSide-underline"></div>
            <h4></h4>
            <ul className="teacherSide-responsive-table">
              <li className="table-content">
                <div className="col col-1">Name</div>
                <div className="col col-2">Email</div>
                <div className="col col-3">Phone</div>
                <div className="col col-3">Address</div>
              </li>
              {teacher &&
                teacher.map((item, index) => {
                  return (
                    <li className="teacherSide-table-row" key={index}>
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

      <Footer />
    </div>
  );
}

export default TableTeacher;
