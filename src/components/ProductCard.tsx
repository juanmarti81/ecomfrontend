import React from "react";
import {Link} from "react-router-dom";

interface Props {
  data: {
    id: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    imagen: string;
    precio: number;
    stock: number;
    timestamp?: Date;
  };
}

const ProductCard = ({data}: Props) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-800">
      <Link className="rounded-lg" to={`/product/${data.id}`}>
        <img alt="product image" className="p-8 rounded-lg" src={data.imagen} />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/product/${data.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {data.nombre}
          </h5>
        </Link>

        <div className="flex justify-between items-center mt-8">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">$ {data.precio}</span>
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to={`/product/${data.id}`}
          >
            Comprar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
