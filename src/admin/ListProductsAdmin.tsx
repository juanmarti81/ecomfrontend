import type Product from "../utils/productTypes";

import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const ListProductsAdmin = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    const res = await (
      await fetch(process.env.REACT_APP_BACKURL + "products/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    // const res = await (await fetch("http://localhost:3001/products/")).json();

    if (res.data) {
      setProductos(res.data);
    } else {
      console.log(res.error);
    }
  };

  const navigateEdit = (id: number | undefined) => {
    navigate("/admin/new-product/" + id);
  };

  const deleteProduct = async (id: number | undefined) => {
    await fetch(process.env.REACT_APP_BACKURL + "products/delete/" + id, {method: "DELETE"}).then(
      () => {
        getProducts();
      },
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between px-10 pb-8 items-center">
        <div className="text-3xl font-bold">Listado de Productos</div>
        <button className="border border-emerald-300 px-4 py-1 rounded-md text-emerald-300 hover:bg-emerald-800 hover:border-emerald-300 hover:text-emerald-300 text-sm">
          <Link to="/admin/new-product">Agregar Producto</Link>
        </button>
      </div>
      <div className="w-full flex justify-center">
        <table className="w-10/12 text-gray-400 text-sm">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="py-3 px-6">Imagen</th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Nombre</th>
              <th className="py-3 px-6">Precio</th>
              <th className="py-3 px-6">Stock</th>
              <th className="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos ? (
              productos.map((e) => {
                return (
                  <tr
                    key={e.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">
                      <img className="w-20" src={e.imagen} />
                    </td>
                    <td className="py-4 px-6">{e.id}</td>
                    <td className="py-4 px-6">{e.nombre}</td>
                    <td className="py-4 px-6">{e.precio}</td>
                    <td className="py-4 px-6">{e.stock}</td>
                    <td className="py-4 px-6 items-center">
                      <button
                        className="mx-2 border font-semibold px-2 py-1 rounded-md border-orange-400 text-orange-500 hover:bg-orange-300"
                        onClick={() => navigateEdit(e.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="mx-2 border font-semibold px-2 py-1 rounded-md border-red-400 text-red-500 hover:bg-red-300"
                        onClick={() => {
                          deleteProduct(e.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <span>No hay productos en la base de datos</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductsAdmin;
