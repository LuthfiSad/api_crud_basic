import { IFilter } from "../../interface/Filter";


export interface ItemModelTypes {
  id?: string;             // ID item
  itemCode: string;        // Kode item
  itemName: string;        // Nama item
  stock: number;           // Stok item
  price: number;           // Harga item
}

export interface ItemResponseBodyDTO {
  id?: string;             // ID item
  itemCode?: string;       // Kode item
  itemName?: string;       // Nama item
  stock?: number;          // Stok item
  price?: number;          // Harga item
}

export interface IFilterItem extends IFilter {
  search?: string;         // Pencarian berdasarkan nama item, kode item
  priceFrom?: number;      // Harga minimal
  priceTo?: number;        // Harga maksimal
}
