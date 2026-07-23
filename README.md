<div align="center">

# 🚀 MozPay

### The Trusted Marketplace for Digital Subscriptions

*A secure platform to buy, manage and deliver digital subscriptions.*

---

![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?style=for-the-badge&logo=swagger)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions)

</div>

---

# 📖 About

MozPay is a secure marketplace designed for buying and managing digital subscriptions.

The platform provides a modern, scalable and secure environment where customers can purchase subscription plans, manage their wallet, track financial transactions and access all their subscriptions from a single place.

Unlike informal marketplaces, MozPay focuses on:

- 🔒 Security
- ⚡ Simplicity
- 🤝 Trust
- 📈 Scalability
- 💳 Modern financial management

The project is being developed as a real commercial product, following enterprise software engineering practices.

---

# 🎯 Vision

To become the leading marketplace for digital subscriptions by delivering a secure, reliable and user-friendly purchasing experience.

---

# 🚀 Mission

Simplify the way people buy, manage and renew digital subscriptions.

---

# 💎 Core Values

- Security First
- Transparency
- Reliability
- Simplicity
- Scalability
- Customer Experience

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Role-Based Access Control (RBAC)

---

## Wallet

- Personal Wallet
- Balance Management
- Deposits
- Purchase Payments

---

## Marketplace

- Browse Digital Subscriptions
- Product Details
- Product Categories
- Active Product Filtering

---

## Subscription Management

- Purchase Subscriptions
- Active Subscription Tracking
- Purchase History

---

## Transactions

- Deposit History
- Purchase History
- Wallet Transactions
- Pagination

---

## Administration

- Product Management
- User Management
- Dashboard APIs
- Role Protection

---

## Developer Experience

- Swagger Documentation
- Docker Support
- Prisma ORM
- GitHub Actions
- End-to-End Testing
- Test Coverage

---

# 🏗 Architecture

```
                    Client

                      │

                REST API

                      │

                  NestJS

                      │

        Services / Business Rules

                      │

                 Prisma ORM

                      │

                PostgreSQL
```

The project follows a modular architecture based on NestJS best practices.

---

# 🛠 Tech Stack

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Security

- JWT
- Passport
- bcrypt

## Documentation

- Swagger

## Testing

- Jest
- Supertest

## DevOps

- Docker
- GitHub Actions

---

# 📂 Project Structure

```
backend/

src/
│
├── auth/
├── users/
├── wallet/
├── products/
├── subscriptions/
├── transactions/
├── admin/
├── prisma/
└── main.ts

test/
│
├── auth/
├── wallet/
├── products/
├── subscriptions/
├── transactions/
├── admin/
└── helpers/

docs/

README.md
```

---

# 🔐 Security

MozPay follows a security-first approach.

Current implementation includes:

- JWT Authentication
- Password Hashing (bcrypt)
- RBAC Authorization
- DTO Validation
- Global Validation Pipes
- Protected Routes

Future releases will include:

- Refresh Tokens
- Rate Limiting
- Helmet
- Email Verification
- Audit Logs
- Multi-Factor Authentication

---

# 📊 Current Project Status

| Module | Status |
|---------|--------|
| Authentication | ✅ |
| Wallet | ✅ |
| Products | ✅ |
| Subscriptions | ✅ |
| Transactions | ✅ |
| Admin | ✅ |
| Swagger | ✅ |
| Docker | ✅ |
| GitHub Actions | ✅ |
| E2E Tests | ✅ |

---

# 🧪 Testing

Run all End-to-End tests

```bash
npm run test:e2e
```

Run Coverage

```bash
npm run test:cov
```

Current test suite covers:

- Authentication
- Wallet
- Products
- Transactions
- Subscriptions
- Admin APIs

---

# 📖 API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api
```

---

# 🐳 Running with Docker

```bash
docker compose up --build
```

---

# 🚀 Roadmap

## Version 1.0

- Authentication
- Wallet
- Marketplace
- Products
- Transactions
- Subscriptions
- Admin APIs

---

## Version 1.1

- Email Verification
- Password Recovery
- Notifications
- User Profile
- Product Search

---

## Version 1.2

- Renewal System
- Support Tickets
- Refund Requests
- Analytics

---

## Version 2.0

- Mobile Application
- Payment Gateway Integration
- Automatic Renewals
- AI Recommendations
- Customer Dashboard

---

# 🤝 Contributing

Contributions are welcome.

Before opening a Pull Request:

- Fork the repository
- Create a feature branch
- Write tests
- Ensure all tests pass
- Submit your Pull Request

---

# 👨‍💻 Author

**Osvaldo Júnior do Amaral**

Computer Science Engineering Student

Backend Developer

Cybersecurity Enthusiast

---

# 📄 License

This project is currently under development.

The license will be defined before the first public release.