import React from "react";
import Header from "../../components/Header/Header";

const About = ({ title }) => {
  return (
    <React.Fragment>
      <div className="container">
        <Header />
        <div className="about">
          <h1>About page</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
