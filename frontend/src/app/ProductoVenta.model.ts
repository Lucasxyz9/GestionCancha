import { Stock } from './stock.model';

export interface ProductoVenta {
  producto: Stock; // Referencia a los datos del producto
  cantidad: number; // Cantidad vendida
}
