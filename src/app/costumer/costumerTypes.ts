import { Gender } from "@prisma/client";

export interface CustomerModelTypes {
  id?: string;            // ID pelanggan
  customerId: number;     // ID pelanggan (CustomerID)
  gender: Gender;         // Jenis kelamin
  age: number;           // Usia
  annualIncome: number;   // Pendapatan tahunan
  spendingScore: number;  // Skor pengeluaran (1-100)
  profession: string;     // Pekerjaan
  workExperience: number; // Pengalaman kerja
  familySize: number;     // Ukuran keluarga
}

export interface CustomerResponseBodyDTO {
  id?: string;            // ID pelanggan
  customerId?: number;    // ID pelanggan (CustomerID)
  gender?: Gender;        // Jenis kelamin
  age?: number;           // Usia
  annualIncome?: number;  // Pendapatan tahunan
  spendingScore?: number; // Skor pengeluaran (1-100)
  profession?: string;    // Pekerjaan
  workExperience?: number; // Pengalaman kerja
  familySize?: number;    // Ukuran keluarga
}

export interface IFilterCustomer {
  search?: string;        // Pencarian berdasarkan nama produk
  page?: number;          // Halaman untuk paginasi
  perPage?: number;       // Jumlah item per halaman
  incomeFrom ?: number;   // Total pendapatan minimal
  incomeTo ?: number;     // Total pendapatan maksimal
  gender ?: Gender;       // Jenis kelamin
  profession ?: string;   // Pekerjaan
}