## Technical Test Api

## Deskripsi Proyek
Proyek ini adalah backend aplikasi yang dibangun menggunakan **Express**, **TypeScript**, dan **Prisma**. Backend ini menyediakan RESTful API untuk mengelola data pelanggan.

## Teknologi yang Digunakan
- **Express**: Untuk membangun server dan mengelola routing.
- **TypeScript**: Untuk memberikan type checking dan meningkatkan kualitas kode.
- **Prisma**: Sebagai ORM (Object-Relational Mapping) untuk mengelola database MongoDB.
- **MongoDB**: Sebagai database untuk menyimpan data pelanggan.

## Instalasi
1. Clone repositori ini:
   ```bash
   git clone https://github.com/LuthfiSad/api_flutter_crud_basic.git
   cd api_flutter_crud_basic
   ```
   
2. Instal dependensi:
   ```bash
   npm install
   ```

3. Pastikan Anda memiliki MongoDB yang berjalan dan buat file .env di root proyek dengan konfigurasi berikut:
```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>"
```

## Menjalankan Aplikasi
Untuk menjalankan aplikasi dalam mode pengembangan, gunakan perintah berikut:
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:8000` (atau port yang ditentukan oleh Vite).

## Endpoint

### 1. **Get All Items**
- **Endpoint:** `GET /`
- **Deskripsi:** Mengambil semua data pelanggan.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "status": 200,
      "code": "SUCCESS",
      "message": "Items retrieved successfully",
      "data": [
        {
          "id": "08ec749e-7348-4cc7-abb8-580989788ba3",
          "itemCode": "AAAB",
          "itemName": "Sepatu Jelek",
          "stock": 9,
          "price": 1000000
        },
      ],
      "meta": {
        "page": 1,
        "perPage": 10,
        "totalData": 100,
        "totalPages": 10
      }
    }
    ```

### 2. **Get Item By ID**
- **Endpoint:** `GET /:id`
- **Deskripsi:** Mengambil data pelanggan berdasarkan ID.
- **Path Parameters:**
  - `id` (string): ID pelanggan yang ingin diambil.
- **Response:**
  - **Status:** 200 OK
  - **Body:**
    ```json
    {
      "status": 200,
      "code": "SUCCESS",
      "message": "Item retrieved successfully",
      "data": {
        "id": "08ec749e-7348-4cc7-abb8-580989788ba3",
        "itemCode": "AAAB",
        "itemName": "Sepatu Jelek",
        "stock": 9,
        "price": 1000000
      },
    }
    ```

### 3. **Create Item**
- **Endpoint:** `POST /`
- **Deskripsi:** Menambahkan pelanggan baru.
- **Body:**
  ```json
  {
    "id": "08ec749e-7348-4cc7-abb8-580989788ba3",
    "itemCode": "AAAB",
    "itemName": "Sepatu Jelek",
    "stock": 9,
    "price": 1000000
  },
  ```
- **Response:**
  - **Status:** 201 Created
  - **Body:**
    ```json
    {
      "status": 201,
      "code": "SUCCESS",
      "message": "Item created successfully",
      "data": {
        "id": "08ec749e-7348-4cc7-abb8-580989788ba3",
        "itemCode": "AAAB",
        "itemName": "Sepatu Jelek",
        "stock": 9,
        "price": 1000000
      },
    }
    ```

### 4. **Update Item**
- **Endpoint:** `PUT /:id`
- **Deskripsi:** Memperbarui data pelanggan berdasarkan ID.
- **Path Parameters:**
  - `id` (string): ID pelanggan yang ingin diperbarui.
- **Body:**
  ```json
  {
    "id": "08ec749e-7348-4cc7-abb8-580989788ba3",
    "itemCode": "AAAB",
    "itemName": "Sepatu Jelek",
    "stock": 9,
    "price": 1000000
  },
  ```
- **Response:**
  - **Status:** 204 No Content
  - **Body:** Tidak ada konten.

### 5. **Delete Item**
- **Endpoint:** `DELETE /:id`
- **Deskripsi:** Menghapus pelanggan berdasarkan ID.
- **Path Parameters:**
  - `id` (string): ID pelanggan yang ingin dihapus.
- **Response:**
  - **Status:** 204 No Content
  - **Body:** Tidak ada konten.

## Penanganan Response
### Response API
Fungsi `HandleResponseApi` digunakan untuk mengirim response dengan struktur yang konsisten.

- **Parameter:**
  - `res`: Objek response dari Express.
  - `status`: Status HTTP.
  - `code`: Kode status khusus.
  - `message`: Pesan yang menjelaskan status.
  - `data`: Data yang dikembalikan (opsional).
  - `meta`: Metadata untuk pagination (opsional).

### Contoh Response
- **Meta Response:**
  ```json
  {
    "page": 1,
    "perPage": 10,
    "totalData": 100,
    "totalPages": 10
  }
  ```

### Error Handling
- **Kelas ErrorApp:**
  Kelas ini digunakan untuk menangani error dengan mengembalikan pesan, status kode, dan kode error yang spesifik.

### Skrip NPM
Skrip dalam `package.json` memungkinkan Anda untuk menjalankan perintah untuk mengelola aplikasi:
- `start`: Menjalankan aplikasi.
- `dev`: Menjalankan aplikasi dalam mode pengembangan.
- `build`: Menghasilkan Prisma client dan TypeScript.
- `lint`: Memeriksa linting pada kode.
- `migrate`: Menjalankan migrasi database.
- `seed`: Menjalankan seed database.

## Database
Schema Prisma menggunakan MongoDB dan mendefinisikan model `Item` dengan atribut yang sesuai. Model ini berisi informasi dasar tentang pelanggan.

### Contoh Model Prisma
```prisma
model Item {
  id         String  @id @default(uuid()) @map("item_id")
  itemCode       String  @map("item_code")
  itemName       String  @map("item_name")
  stock      Int     @map("stock")
  price      Float   @map("price")

  @@map("items")
}
```