import type Product from "../utils/productTypes";

import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

const ProductDetails = () => {
  const [producto, setProducto] = useState<Product>();
  const navigate = useNavigate();
  let {id} = useParams();

  const getProduct = async () => {
    const res = await (
      await fetch(`${process.env.REACT_APP_BACKURL}products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (res.data) {
      setProducto(res.data[0]);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <div>
        <button className="mb-4" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div>
        {producto ? (
          <section className="text-gray-700 body-font overflow-hidden bg-white rounded-3xl border-8 border-slate-500">
            <div className="container px-5 py-20 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                  src={producto.imagen}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {producto.nombre}
                  </h1>

                  <p className="leading-relaxed my-4">{producto.descripcion}</p>

                  <div className="flex my-4">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      $ {producto.precio}
                    </span>
                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p>No pudimos encontrar el producto seleccionado</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
