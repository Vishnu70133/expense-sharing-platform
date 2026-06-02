# Expense Splitter

Expense Splitter is a Splitwise-inspired full-stack expense sharing application built using Spring Boot Microservices, React, MySQL, Docker, and Docker Compose.

Users can create groups, add members, track shared expenses, calculate balances, and manage settlements. The application follows a microservices architecture with service discovery, API gateway routing, JWT authentication, and secure inter-service communication.

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT-based Authentication
* Protected APIs using Spring Security
* Secure Service-to-Service Communication using JWT Propagation

### User Management

* Create User Profile
* View Profile
* Update Profile Information

### Group Management

* Create Groups
* View My Groups
* Update Group Details
* Delete Groups
* Add Members to Groups
* Remove Members from Groups
* Leave Groups

### Expense Management

* Add Expenses
* Edit Expenses
* Delete Expenses
* View Group Expenses
* Track Expense Payer
* Automatic Expense Splitting Among Group Members

### Balance Calculation

* Calculate Individual Balances
* Identify Creditors and Debtors
* Real-time Balance Updates

### Settlement Tracking

* Generate Settlement Suggestions
* Record Settlements
* Automatically Recalculate Remaining Balances
* Display Remaining Settlement Amounts

### Dashboard Features

* Total Expenses Summary
* Member Count
* Expense Count

---

# Microservices Architecture

The application follows a Microservices Architecture pattern.

## Services

### Auth Service

Responsible for:

* User Registration
* User Login
* JWT Generation
* Authentication Validation

### User Service

Responsible for:

* User Profiles
* User Information Management

### Group Service

Responsible for:

* Group Creation
* Group Membership Management
* Group Administration

### Expense Service

Responsible for:

* Expense Tracking
* Balance Calculation
* Settlement Calculation
* Settlement Recording

### API Gateway

Responsible for:

* Routing Requests
* Centralized API Access

### Eureka Server

Responsible for:

* Service Discovery
* Dynamic Service Registration

---

# System Architecture

```text
Browser
   ↓
React Frontend
   ↓
API Gateway
   ↓
Auth Service
User Service
Group Service
Expense Service
   ↓
MySQL
```

---

# Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Cloud Gateway
* Spring Cloud OpenFeign
* Netflix Eureka
* Spring Data JPA
* Hibernate
* MySQL
* Maven

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

## DevOps

* Docker
* Docker Compose

---

# Project Structure

```text
expense-sharing-platform/

├── auth-service
├── user-service
├── group-service
├── expense-service
├── api-gateway
├── eureka-server
├── splitwise-app
├── docker-compose.yml
└── README.md
```

---

# Running the Application with Docker

## Prerequisites

* Docker Desktop
* Git

---

## Clone Repository

```bash
git clone https://github.com/Vishnu70133/expense-sharing-platform.git

cd expense-sharing-platform
```

---

## Configure Environment Variables

Create a `.env` file in the project root:

```env
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_password

JWT_SECRET=your_jwt_secret

AUTH_DB_URL=jdbc:mysql://mysql:3306/auth_db
USER_DB_URL=jdbc:mysql://mysql:3306/user_db
GROUP_DB_URL=jdbc:mysql://mysql:3306/group_db
EXPENSE_DB_URL=jdbc:mysql://mysql:3306/expense_db

EUREKA_URL=http://eureka-server:8761/eureka
```

---

## Start the Entire Application

```bash
docker compose up -d --build
```

---

## Verify Running Containers

```bash
docker ps
```

Expected Containers:

* mysql
* eureka-server
* auth-service
* user-service
* group-service
* expense-service
* api-gateway
* splitwise-app

---

# Access URLs

| Service          | URL                   |
| ---------------- | --------------------- |
| Frontend         | http://localhost:5173 |
| API Gateway      | http://localhost:8080 |
| Eureka Dashboard | http://localhost:8761 |

---

# API Examples

## Login

```http
POST http://localhost:8080/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{
  "token": "jwt-token"
}
```

---

## Get My Groups

```http
GET http://localhost:8080/groups/my-groups
Authorization: Bearer <JWT_TOKEN>
```

---

# Security

The application uses:

* JWT Authentication
* Spring Security
* Protected REST APIs
* Secure Inter-Service Communication
* Authentication Context Propagation Across Microservices

---

# Dockerized Services

* React Frontend
* API Gateway
* Auth Service
* User Service
* Group Service
* Expense Service
* Eureka Server
* MySQL Database

---

# Current Features Implemented

* Authentication
* User Profiles
* Group Management
* Expense Tracking
* Balance Calculation
* Settlement Suggestions
* Settlement Recording
* Leave Group Validation
* Remove Member Validation
* Total Expense Summary

---

# Future Enhancements

* Settlement History
* Real-Time Updates using WebSockets
* Notifications
* Email Invitations
* Activity Timeline
* Group Analytics
* Mobile Application
* CI/CD Pipeline
* Kubernetes Deployment

---

# Learning Outcomes

This project demonstrates:

* Microservices Architecture
* API Gateway Pattern
* Service Discovery
* Secure Inter-Service Communication
* JWT Authentication
* REST API Design
* Database Design
* React Frontend Development
* Docker & Docker Compose
* Full Stack Application Development

---

# Author

**Vishnu Dasari**

GitHub: https://github.com/Vishnu70133
