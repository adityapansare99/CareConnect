
# 📘 CareConnect API Documentation

Welcome to the CareConnect backend API documentation. This document outlines all available endpoints categorized by role with full request and response details.

---

## 🌐 Base URL
```
http://localhost:8000
```

---

## 🔐 Authentication
Most protected routes require a **Bearer Token** in the header:
```http
Authorization: Bearer <token>
```

---

## 👤 Admin Endpoints

### `POST /admin/login`

**Description:**
Authenticate an admin using email and password credentials.

**Request Body:**
```json
{
  "email": "admin@careconnect.com",
  "password": "CareConnect@admin"
}
```

**Authentication Required:**
No

### `POST /admin/add-doctor`

**Description:**
Adds a new doctor to the system. Requires form-data with fields and an image file.

**Request Body (form-data):**
- `name` (string, required)
- `email` (string, required)
- `password` (string, required)
- `speciality`, `degree`, `experience`, `about`, `fees`, `address`, `image` (file)

**Authentication Required:**
Yes (Admin Token)

### `GET /admin/all-appointments`

**Description:**
Fetch all appointments for all users.

**Authentication Required:**
Yes (Admin Token)

### `POST /admin/change-available`

**Description:**
Toggle availability status of a doctor.

**Request Body:**
```json
{
  "docid": "<doctor_id>"
}
```

**Authentication Required:**
Yes (Admin Token)

### `GET /admin/dashboard`

**Description:**
Retrieve dashboard statistics for admin panel (appointments, doctors, users).

**Authentication Required:**
Yes (Admin Token)

### `POST /admin/all-doctors`

**Description:**
Fetch all registered doctors from the system.

**Authentication Required:**
Yes (Admin Token)

### `POST /admin/cancel-appointment`

**Description:**
Cancel a scheduled appointment.

**Request Body:**
```json
{
  "appointmentId": "<appointment_id>"
}
```

**Authentication Required:**
Yes (Admin Token)

---

## 🧑‍⚕️ Doctor Endpoints

### `POST /doctors/login`

**Description:**
Authenticate a doctor with email and password.

**Request Body:**
```json
{
  "email": "doctor@example.com",
  "password": "securepassword"
}
```

**Authentication Required:**
No

### `GET /doctors/dashboard`

**Description:**
Retrieve doctor-specific dashboard metrics and stats.

**Authentication Required:**
Yes (Doctor Token)

### `GET /doctors/doc-profile`

**Description:**
Get current doctor's profile details.

**Authentication Required:**
Yes (Doctor Token)

### `POST /doctors/update-profile`

**Description:**
Update doctor profile information.

**Request Body:**
```json
{
  "fees": "1231",
  "address": {
    "line1": "test gaon",
    "line2": "pune"
  },
  "avaliable": "true"
}
```

**Authentication Required:**
Yes (Doctor Token)

### `GET /doctors/doc-appointments`

**Description:**
Retrieve all appointments associated with the logged-in doctor.

**Authentication Required:**
Yes (Doctor Token)

### `POST /doctors/completed-appointment`

**Description:**
Mark an appointment as completed.

**Request Body:**
```json
{
  "appointmentId": "<appointment_id>"
}
```

**Authentication Required:**
Yes (Doctor Token)

### `POST /doctors/cancel-appointment`

**Description:**
Cancel an appointment from the doctor's side.

**Request Body:**
```json
{
  "appointmentId": "<appointment_id>"
}
```

**Authentication Required:**
Yes (Doctor Token)

### `GET /doctors/doctor-all-appointments`

**Description:**
Retrieve every appointment for the doctor (all statuses).

**Authentication Required:**
Yes (Doctor Token)

---

## 🙋 User Endpoints

### `POST /user/register`

**Description:**
Register a new user with basic credentials.

**Request Body:**
```json
{
  "name": "tester",
  "email": "t@gmail.com",
  "password": "12345678"
}
```

**Authentication Required:**
No

### `POST /user/login`

**Description:**
Authenticate a user with email and password.

**Request Body:**
```json
{
  "email": "tester1234@gmail.com",
  "password": "test1234"
}
```

**Authentication Required:**
No

### `GET /user/user-profile`

**Description:**
Retrieve the profile information of the logged-in user.

**Authentication Required:**
Yes (User Token)

### `POST /user/update-user`

**Description:**
Update user information including optional image upload.

**Request Body (form-data):**
- `name` (string, optional)
- `address` (stringified object)
- `phone` (string, optional)
- `image` (file, optional)
- `dob` (string, optional)
- `gender` (string, optional)

**Authentication Required:**
Yes (User Token)

### `POST /user/book-appointment`

**Description:**
Book an appointment with a doctor.

**Request Body:**
```json
{
  "userId": "<user_id>",
  "docId": "<doctor_id>",
  "slotDate": "YYYY-MM-DD",
  "slotTime": "HH:MM"
}
```

**Authentication Required:**
Yes (User Token)

### `GET /user/get-appointments`

**Description:**
Retrieve all appointments booked by the user.

**Authentication Required:**
Yes (User Token)

### `POST /user/cancel-appointment`

**Description:**
Cancel an existing appointment.

**Request Body:**
```json
{
  "appointmentId": "<appointment_id>"
}
```

**Authentication Required:**
Yes (User Token)

### `POST /user/verify-payment`

**Description:**
Verify Razorpay payment by order ID.

**Request Body:**
```json
{
  "razorpay_order_id": "<order_id>"
}
```

**Authentication Required:**
Yes (User Token)

### `POST /user/paymverify-paymentent`

**Description:**
⚠️ This route appears to be a duplicate or typo of `/verify-payment`. Confirm backend implementation.

**Request Body:**
```json
{
  "razorpay_order_id": "<order_id>"
}
```

**Authentication Required:**
Yes (User Token)

---

## ✅ Miscellaneous

### `GET /healthcheck`

**Description:**
Ping the server to confirm it is live.

**Authentication Required:**
No

---

## 🛠 Setup Instructions
```bash
git clone https://github.com/adityapansare99/CareConnect.git
cd CareConnect
npm install
npm run dev
```

---

## ⚙️ Environment Variables
```env
PORT=8000
MONGO_URI=mongodb+srv://<uri>
JWT_SECRET=<secret>
RAZORPAY_KEY_ID=<key>
RAZORPAY_KEY_SECRET=<secret>
```

---

## 📬 Contact
For issues or support, contact [Aditya Pansare](https://github.com/adityapansare99).

---

> This documentation includes all known routes from your Postman collection. You can request further expansions anytime.
