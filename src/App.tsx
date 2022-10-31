import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import ListProductsAdmin from "./admin/ListProductsAdmin";
import NewProduct from "./admin/NewProduct";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import ListProducts from "./pages/ListProducts";

function App() {
  return (
    <div className="flex flex-col w-full text-white font-OpenSans">
      <BrowserRouter>
        <Header />
        <div className="bg-slate-800 h-screen p-10">
          <Routes>
            <Route element={<ListProducts />} path="/" />
            <Route element={<ListProductsAdmin />} path="/admin" />
            <Route element={<NewProduct />} path="/admin/new-product/" />
            <Route element={<NewProduct />} path="/admin/new-product/:id" />
            <Route element={<ProductDetails />} path="/product/:id" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
