# Estate

This project is based on Angular 20, and requires node 22.

## Branch Purpose

This branch is the frontend version connected to the real Chatop Spring Boot API.

Backend repository:

- [manooweb/projet3-backend](https://github.com/manooweb/projet3-backend)

The original Mockoon-based starter version should be kept on a separate backup branch if it is still needed for comparison or rollback. This connected version does not require Mockoon.

## Start the project

Required local services:

- Chatop backend running on `http://localhost:9001`
- MySQL configured for the backend
- Mailpit or another SMTP server if you want to verify message emails

Install dependencies:

```bash
npm install
```

Launch the frontend:

```bash
npm run start
```

The Angular dev server starts on:

```text
http://localhost:4200
```

The development proxy forwards API calls to the backend:

```text
/api/** -> http://localhost:9001
```

Demo credentials after importing the backend `chatop.sql` script:

```text
email: demo@chatop.com
password: password
```

## Ressources

### MySQL

The current API demonstration uses the `chatop.sql` script from [manooweb/projet3-backend](https://github.com/manooweb/projet3-backend).

The legacy frontend resource `ressources/sql/script.sql` is kept only as original project material.
