import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-row h-16 py-2 px-4 w-full bg-slate-900 justify-between items-center shadow-2xl shadow-black">
      <div className="">
        <span className="font-bold text-lg">E-Commerce App</span>
      </div>
      <div className="flex flex-row gap-x-4">
        <Link to="/">Ver Productos</Link>
        <Link to="/ListProducts">Carrito</Link>
        <Link to="/Admin">Administración</Link>
      </div>
    </header>
  );
};

export default Header;
