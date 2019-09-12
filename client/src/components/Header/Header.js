import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <Link to={"/"}>NOTAS</Link>
          </h1>
          <h2 className="subtitle">
            Anota los datos de los clientes sobre la marcha
          </h2>
          <Link to={"/about"}>About</Link>
        </div>
      </div>
    </section>
  );
};
export default Header;
