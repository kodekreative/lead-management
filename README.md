# **📌 Lead Management System**

This is a **simple Lead Management System** that allows users to manage leads efficiently. The system is built using **.NET 8.0** for the backend and **Angular with Angular Material UI** for the frontend.

---

## **🚀 Technologies Used**
- **Backend:** .NET 8.0, C#
- **Frontend:** Angular, Angular Material UI, TypeScript

---

## **📂 Project Structure**
```
LeadManagementSystem/
│── Backend/                   # .NET 8.0 API
│   ├── LeadManagementAPI.sln   # Solution file for Visual Studio
│   ├── Controllers/            # API Controllers
│   ├── Models/                 # Data Models
│   ├── Services/               # Business Logic Services
│── Frontend/                   # Angular App
│   ├── src/                    # Angular Source Files
│   ├── package.json            # Dependencies for the frontend
│── README.md                   # Documentation
```

---

## **🛠 Setup Instructions**

### **1️⃣ Backend Setup (API)**
1. Open the `Backend` folder in **Visual Studio**.
2. Open the solution file: **`LeadManagementAPI.sln`**.
3. Restore dependencies:
   ```sh
   dotnet restore
   ```
4. Run the API:
   ```sh
   dotnet run
   ```
5. The API should now be running on **`https://localhost:7111`**.

---

### **2️⃣ Frontend Setup (Angular)**
1. Navigate to the frontend folder:
   ```sh
   cd Frontend/src
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   ng serve
   ```
4. Open the browser and visit:
   ```
   http://localhost:4200
   ```

