import React from "react";
import { useState, useEffect } from "react";
import "./TableHomework.css";
import axios from "axios";
import Loading from "../../components/loader/Loader";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function TableHomework() {
  const [searchValue, setSearchValue] = useState("");
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

  return (
    <div>
      <Header/>

        <div className="homeworkSide-container">
        {loading ? (
          <Loading />
        ) : (
          <>
          <h1>All HomeWork</h1>

          <div className="homeworkSide-underline"></div>
          <h4></h4>
          <div id="search-container">
            <input
              type="search"
              id="search-input"
              placeholder="search for your name to find your homework.."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <ul className="homeworkSide-responsive-table">
            <li className="table-content">
              <div className="col col-1">Title</div>
              <div className="col col-2">Text</div>
              <div className="col col-3">Note</div>
              <div className="col col-3">Teacher</div>
              <div className="col col-3">Student</div>
            </li>
            {homework
              .filter((val) => {
                if (searchValue === "") {
                  return val;
                } else if (
                  val.student_id.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                )
                  return val;
              })
              .map((item, index) => {
                return (
                  <li className="homeworkSide-table-row" key={index}>
                    <div className="col col-1" data-label="Subject">
                      {item.subject}
                    </div>
                    <div className="col col-2" data-label="Text">
                      {item.text}
                    </div>

                    <div className="col col-3" data-label="Note">
                      {item && item ? item.note : "Null"}
                    </div>
                    <div className="col col-3" data-label="Teacher">
                      {item.teacher_id.name}
                    </div>
                    <div className="col col-3" data-label="Student">
                      {item && item.student_id ? item.student_id.name : "Null"}
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

export default TableHomework;
