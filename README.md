
## Overview

Expense Splitter is a Splitwise-inspired full-stack expense sharing application built using Spring Boot Microservices and React. Users can create groups, add members, track shared expenses, calculate balances, and record settlements. The application follows a microservices architecture with service discovery, API gateway routing, JWT authentication, and secure inter-service communication.

# Expense Splitter

Expense Splitter is a Splitwise-inspired expense sharing application built using Spring Boot Microservices and React. It helps users create groups, add members, track shared expenses, calculate balances, and manage settlements between group members.

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT-based Authentication
* Protected APIs using Spring Security
* Secure service-to-service communication using JWT propagation

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

## Microservices Architecture

The application follows a Microservices Architecture pattern.

### Services

#### Auth Service

Responsible for:

* User Registration
* User Login
* JWT Generation
* Authentication Validation

#### User Service

Responsible for:

* User Profiles
* User Information Management

#### Group Service

Responsible for:

* Group Creation
* Group Membership Management
* Group Administration

#### Expense Service

Responsible for:

* Expense Tracking
* Balance Calculation
* Settlement Calculation
* Settlement Recording

#### API Gateway

Responsible for:

* Routing Requests
* Centralized API Access

#### Eureka Server

Responsible for:

* Service Discovery
* Dynamic Service Registration

---

## System Architecture

Frontend (React)

↓

API Gateway

↓

Auth Service

User Service

Group Service

Expense Service

↓

MySQL Database

↓

Eureka Discovery Server

---

## Tech Stack

### Backend

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

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

---

## Project Structure

expense-sharing-platform/

├── auth-service

├── user-service

├── group-service

├── expense-service

├── api-gateway

├── eureka-server

├── frontend

└── README.md

---

## How to Run

### Prerequisites

* Java 21+
* Maven
* Node.js
* MySQL
* Git

---

### Clone Repository

```bash
git clone https://github.com/Vishnu70133/expense-sharing-platform.git

cd expense-sharing-platform
```

---

### Configure Database

Create a MySQL database and update application.properties files with your database credentials.

---

### Start Eureka Server

```bash
cd eureka-server

mvn spring-boot:run
```

Runs on:

```text
http://localhost:8761
```

---

### Start API Gateway

```bash
cd api-gateway

mvn spring-boot:run
```

Runs on:

```text
http://localhost:8080
```

---

### Start Backend Services

Auth Service

```bash
cd auth-service

mvn spring-boot:run
```

User Service

```bash
cd user-service

mvn spring-boot:run
```

Group Service

```bash
cd group-service

mvn spring-boot:run
```

Expense Service

```bash
cd expense-service

mvn spring-boot:run
```

---

### Start Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## Security

The application uses:

* JWT Authentication
* Spring Security
* Protected REST APIs
* Secure Inter-Service Communication
* Authentication Context Propagation Across Microservices

---

## Current Features Implemented

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

## Future Enhancements

* Settlement History
* Real-Time Updates using WebSockets
* Notifications
* Email Invitations
* Activity Timeline
* Group Analytics
* Mobile Application

---


## Learning Outcomes

This project demonstrates:

* Microservices Architecture
* API Gateway Pattern
* Service Discovery
* Secure Inter-Service Communication
* JWT Authentication
* REST API Design
* Database Design
* React Frontend Development
* Full Stack Application Development

---

## Author

Vishnu Dasari

GitHub: https://github.com/Vishnu70133
