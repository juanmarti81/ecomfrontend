import type Product from "../utils/productTypes";

import React, {useEffect, useState} from "react";
import {Formik, FormikHelpers, Field, Form} from "formik";
import {useNavigate, useParams} from "react-router-dom";

function validateUrl(value: string) {
  let error;
  let urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // validate fragment locator

  if (!value) {
    error = "Debes ingresar una URL";
  } else if (!urlPattern.test(value)) {
    error = "The URL is not valid";
  }

  return error;
}

function validateNotNull(value: string | number) {
  let error;

  if (!value) {
    error = "Debes ingresar un dato";
  }

  return error;
}

const NewProduct = () => {
  const [producto, setProducto] = useState<Product>();

  const navigate = useNavigate();
  const {id} = useParams();

  const submitHandler = async (values: Product) => {
    let URL = "";
    let method = "";

    console.log("SENDING", values);
    if (id) {
      URL = process.env.REACT_APP_BACKURL + "products/" + id;
      method = "PUT";
    } else {
      URL = process.env.REACT_APP_BACKURL + "products/";
      method = "POST";
    }
    const res = await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log(res);

    navigate("/admin");
  };

  const getProduct = async () => {
    const res = await (await fetch(`${process.env.REACT_APP_BACKURL}products/${id}`)).json();
    const data = res.data[0];

    console.log(data);
    if (data) {
      setProducto(data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className=" w-4/12 min-w-[396px] border border-gray-100 p-6 rounded-md bg-slate-700">
        <Formik
          initialValues={{
            id: producto?.id! || 0,
            nombre: producto?.nombre! || "",
            descripcion: producto?.descripcion! || "",
            precio: producto?.precio! || 0,
            stock: producto?.stock! || 0,
            imagen: producto?.imagen! || "",
            codigo: producto?.codigo! || "",
          }}
          // values={initialvalues}
          onSubmit={(values: Product, {setSubmitting}: FormikHelpers<Product>) => {
            setSubmitting(true);
            submitHandler(values);
            setSubmitting(false);
          }}
        >
          {({errors, touched, handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
              <div className="font-bold text-3xl">Nuevo Producto</div>
              <div className="flex flex-col gap-y-3 mt-4">
                <label className="block font-medium text-gray-300" htmlFor="nombre">
                  Nombre
                </label>
                <Field
                  className="block rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                  id="nombre"
                  name="nombre"
                  type="text"
                  validate={validateNotNull}
                  value={producto?.nombre}
                />
                {errors.nombre && touched.nombre && (
                  <div className="text-sm text-red-500 font-bold">{errors.nombre}</div>
                )}
              </div>
              <div className="flex flex-col gap-y-3 mt-4">
                <label className="block font-medium text-gray-300" htmlFor="descripcion">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  className="block rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                  id="descripcion"
                  name="descripcion"
                  validate={validateNotNull}
                  value={producto?.descripcion}
                />
                {errors.descripcion && touched.descripcion && (
                  <div className="text-sm text-red-500 font-bold">{errors.descripcion}</div>
                )}
              </div>
              <div className="flex flex-col gap-y-3 mt-4">
                <label className="block font-medium text-gray-300" htmlFor="precio">
                  Precio
                </label>
                <Field
                  className="block rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                  id="precio"
                  name="precio"
                  type="number"
                  validate={validateNotNull}
                  value={producto?.precio}
                />
                {errors.precio && touched.precio && (
                  <div className="text-sm text-red-500 font-bold">{errors.precio}</div>
                )}
              </div>
              <div className="flex flex-col gap-y-3 mt-4">
                <label className="block font-medium text-gray-300" htmlFor="stock">
                  Stock
                </label>
                <Field
                  className="block rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                  id="stock"
                  name="stock"
                  type="number"
                  validate={validateNotNull}
                  value={producto?.stock}
                />
                {errors.stock && touched.stock && (
                  <div className="text-sm text-red-500 font-bold">{errors.stock}</div>
                )}
              </div>
              <div className="flex flex-col gap-y-3 mt-4">
                <label className="block font-medium text-gray-300" htmlFor="codigo">
                  Código
                </label>
                <Field
                  className="block rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                  id="codigo"
                  name="codigo"
                  type="text"
                  validate={validateNotNull}
                  value={producto?.codigo}
                />
                {errors.codigo && touched.codigo && (
                  <div className="text-sm text-red-500 font-bold">{errors.codigo}</div>
                )}
              </div>
              <div className="flex flex-col gap-y-3 mt-4">
                <label className="block font-medium text-gray-300" htmlFor="imagen">
                  Imagen
                </label>
                <Field
                  className="block rounded-md border-gray-200 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-gray-900 px-3 py-2"
                  id="imagen"
                  name="imagen"
                  placeholder="http://www.fakephoto.com/someimage.jpg"
                  type="text"
                  validate={validateUrl}
                  value={producto?.imagen}
                />
                {errors.imagen && touched.imagen && (
                  <div className=" text-sm text-red-500 font-bold">{errors.imagen}</div>
                )}
              </div>

              <div className="mt-4">
                <button
                  className="border border-emerald-300 px-4 py-1 rounded-md text-emerald-300 hover:bg-emerald-800 hover:border-emerald-300 hover:text-emerald-300"
                  type="submit"
                >
                  {id ? "ACTUALIZAR" : "AGREGAR"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewProduct;
