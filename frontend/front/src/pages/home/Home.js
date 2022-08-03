import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import HomeImage from "../../images/HomePage.jpg";
import "./Home.css";

function Home() {
  return (
    <div>
     <Header/>
      <div className="homePage">
        <img src={HomeImage} />
        <p>This is a management school system that helps teachers to add homework to their students. </p>
      </div>
<Footer/>
     
    </div>
  );
}

export default Home;
