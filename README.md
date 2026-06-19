# PhonePe Wallet Application

## Overview

PhonePe Wallet is a Full-Stack Digital Payment and Wallet Management System developed using Spring Boot and React.js.

The application allows users to register, manage wallets, add funds, transfer money using UPI IDs, and view transaction details through a modern web interface.

The backend exposes RESTful APIs documented using Swagger/OpenAPI, while the frontend provides an interactive dashboard for wallet operations.

---

## Features

### User Management
- User Registration
- User Login
- UPI ID Based User Identification

### Wallet Management
- Create Wallet
- Check Wallet Balance
- Add Money to Wallet
- Wallet Information Retrieval

### Transaction Management
- Send Money
- Receive Money
- Transaction Validation
- Transaction History

### API Documentation
- Swagger/OpenAPI Integration
- Interactive API Testing Interface

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- MySQL

### API Documentation
- Swagger / OpenAPI

### Build Tools
- Maven
- npm

---

## Project Architecture

### Backend Structure

```text
src/main/java/com/phonepe
│
├── config
├── controller
├── dto
├── entity
├── repository
├── service
└── PhonePeWalletApplication
```

### Frontend Structure

```text
src
│
├── api
├── components
│   ├── Dashboard
│   ├── LoginForm
│   └── RegistrationForm
└── App.js
```

---

## REST APIs

### User APIs

- Register User
- Login User

### Wallet APIs

- Create Wallet
- Fetch Balance
- Add Money

### Transaction APIs

- Send Money
- View Transactions

---

## Swagger Documentation

After running the backend:

```bash
http://localhost:8080/swagger-ui/index.html
```

Swagger UI provides interactive documentation and testing for all available APIs.

---

## Installation

### Backend

```bash
cd PhonePe-Wallet-Backend
mvn spring-boot:run
```

### Frontend

```bash
cd phonepay-frontend
npm install
npm start
```

---

## Learning Outcomes

- Full Stack Application Development
- REST API Design
- Spring Boot Architecture
- React Component Development
- State Management
- API Integration using Axios
- Database Connectivity using JPA
- Swagger/OpenAPI Documentation

---

## Future Enhancements

- JWT Authentication
- Role Based Access Control
- Payment Gateway Integration
- Notification Services
- Transaction Analytics Dashboard

---

## Author

Karthikeya Chukka

GitHub: https://github.com/karthik7898
