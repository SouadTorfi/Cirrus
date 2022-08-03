import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import StudentsPage from "./pages/student/AllStudents";
import Addteacher from "./pages/teacher/Addteacher";
import AllTeachers from "./pages/teacher/AllTeachers";
import EditTeacher from "./pages/teacher/EditTeacher";
import AllStudents from "./pages/student/AllStudents";
import Addstudent from "./pages/student/Addstudent";
import EditStudent from "./pages/student/EditStudent";
import AllHomework from "./pages/homework/AllHomework";
import AddHomework from "./pages/homework/AddHomework";
import TableTeacher from "./pages/userside/TableTeacher";
import TableStudent from "./pages/userside/TableStudent";
import TableHomework from "./pages/userside/TableHomework";
import EditHomework from "./pages/homework/EditHomework";
import Loader from "./components/loader/Loader";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
   
        {/* <Header /> */}

        <div className="whole_div">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact element={<ProtectedRoutes />}>
              <Route path="/addteacher" element={<Addteacher />} />
              <Route path="/allteachers" element={<AllTeachers />} />
              <Route path="/editteacher/:id" element={<EditTeacher />} />
              <Route path="/allstudents" element={<AllStudents />} />
              <Route path="/addstudent" element={<Addstudent />} />
              <Route path="/editstudent/:id" element={<EditStudent />} />
              <Route path="/allhomeworks" element={<AllHomework />} />
              <Route path="/addhomework" element={<AddHomework />} />
              <Route path="/editHomework/:id" element={<EditHomework />} />
            </Route>

            <Route path="/tableteacher" element={<TableTeacher />} />
            <Route path="/tablestudent" element={<TableStudent />} />
            <Route path="/tablehomework" element={<TableHomework />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
