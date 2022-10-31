import type Product from "../utils/productTypes";

import React, {useEffect, useState} from "react";

import ProductCard from "../components/ProductCard";

const ListProducts = () => {
  const [productos, setProductos] = useState<Product[]>([]);

  const getProducts = async () => {
    const res = await (await fetch(process.env.REACT_APP_BACKURL + "products/")).json();
    // const res = await (await fetch("http://localhost:3001/products/")).json();

    if (res.data) {
      setProductos(res.data);
    } else {
      console.log(res.error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-row gap-8">
      {productos ? (
        productos.map((e) => {
          return <ProductCard key={e.id} data={e} />;
        })
      ) : (
        <p>No hay productos todavía</p>
      )}
    </div>
  );
};

export default ListProducts;
