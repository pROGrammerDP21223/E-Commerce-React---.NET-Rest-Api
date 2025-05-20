
# 🛒 Full Stack eCommerce Web Application

This is a full-featured eCommerce web application built with **.NET Core (C#)** for the backend and **React.js** for the frontend. It includes user authentication, product CRUD operations, image handling, and state management using modern React hooks.

---

## 📌 Features

### 🔒 Backend (.NET Core)
- JWT Authentication with secure password hashing
- Dependency Injection (DI) based service architecture
- RESTful API with full CRUD operations (products, users, etc.)
- Image upload and handling for products
- Clean architecture with Controllers, Services, Repositories
- NuGet package manager used for dependency installation
- CORS enabled for frontend-backend communication

### 🌐 Frontend (React.js)
- React functional components with Hooks (`useEffect`, `useContext`, `useReducer`)
- API communication using `fetch()` with Promises
- User authentication (login/register)
- Dynamic routing using `react-router-dom`
- Global state management using Context API and Reducer
- Responsive UI for viewing and managing products
- Image preview and upload feature
- Error handling and loading states

---

## 🚀 Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Backend   | ASP.NET Core Web API   |
| Auth      | JWT + Password Hashing |
| Frontend  | React.js               |
| State     | Context + useReducer   |
| Routing   | React Router DOM       |
| Storage   | Local file system (Images) |
| Tools     | NuGet, VS Code, Postman|

---

## 📷 Product Image Handling

- Backend accepts image files via multipart/form-data
- Images stored on the server (you can configure cloud storage)
- Image URLs returned in API response
- React displays uploaded images using preview and fetch

---

## 📁 Project Structure

### Backend
```
/Controllers
/Models
/DTOs
/Services
/Repositories
/Middleware
```

### Frontend
```
/components
/context
/reducers
/pages
/utils
```

---

## 🛠 Installation & Setup

### Backend
1. Clone the repo: `git clone <your-repo-url>`
2. Navigate to the backend folder
3. Run:
   ```bash
   dotnet restore
   dotnet build
   dotnet run
   ```

### Frontend
1. Navigate to the frontend folder
2. Run:
   ```bash
   npm install
   npm start
   ```

---

## 🔐 Environment Variables

### Backend `.env` or `appsettings.json`
```json
{
  "Jwt": {
    "Key": "your_secret_key_here",
    "Issuer": "yourdomain.com",
    "Audience": "yourdomain.com"
  }
}
```

---

## 📦 NuGet Packages Used

- Microsoft.AspNetCore.Authentication.JwtBearer
- BCrypt.Net-Next
- AutoMapper
- EntityFrameworkCore
- Swashbuckle.AspNetCore (Swagger)

---

## 🌐 API Endpoints (Sample)

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| POST   | `/api/auth/login`         | Login user            |
| POST   | `/api/auth/register`      | Register user         |
| GET    | `/api/products`           | List all products     |
| POST   | `/api/products`           | Add new product       |
| PUT    | `/api/products/:id`	     | Update product        |
| DELETE | `/api/products/:id`       | Delete product        |
| GET    | `/api/products/categories`| Delete product        |

---



## ✍️ Author

Developed by Dhananjay Phirke 
CDAC Student | Aspiring Full-Stack Developer

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
