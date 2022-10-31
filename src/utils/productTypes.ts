export default interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  imagen: string;
  precio: number;
  stock: number;
  timestamp?: Date;
}
