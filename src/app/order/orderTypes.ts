export interface OrderModelTypes {
  id?: string;
  userId: string;         // ID pengguna yang melakukan pemesanan
  productId: string;      // ID produk yang dipesan
  quantity: number;       // Jumlah produk yang dipesan
  totalPrice: number;     // Total harga untuk pesanan
  createdAt: Date;        // Tanggal pembuatan pesanan
  updatedAt: Date;        // Tanggal pembaruan pesanan
}

export interface IFilterOrder {
  search?: string;        // Pencarian berdasarkan nama produk
  page?: number;          // Halaman untuk paginasi
  perPage?: number;       // Jumlah item per halaman
  userId?: string;        // ID pengguna
  productId?: string;     // ID produk
}

export interface OrderResponseBodyDTO {
  id?: string;            // ID pesanan
  userId?: string;         // ID pengguna yang melakukan pemesanan
  productId?: string;      // ID produk yang dipesan
  quantity?: number;       // Jumlah produk yang dipesan
  totalPrice?: number;     // Total harga untuk pesanan
  createdAt?: Date;        // Tanggal pembuatan pesanan
  updatedAt?: Date;        // Tanggal pembaruan pesanan
}
