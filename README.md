# CRUD-operations

🔐 Authentication System (JWT + Cookies)

This project implements a production-style authentication system using JWT, HTTP-only cookies, and proper auth separation.
No frontend tricks. No localStorage nonsense. No magic libraries doing thinking for you.


🚀 Features
Core Auth
User Signup
User Login
Logout
Protected Routes

Security
Password hashing using bcrypt
JWT-based authentication
Access Token + Refresh Token flow
Tokens stored in HTTP-only cookies


🧩 Auth Flow:-
1️⃣ Signup

User submits email + password
Password is hashed using bcrypt
User is stored in DB with hashed password only

2️⃣ Login

User submits credentials
Password is verified with bcrypt
Server generates:
Access Token 
Refresh Token
Tokens are sent via HTTP-only cookies
Tokens are NOT stored in localStorage
JavaScript CANNOT access them
XSS risk reduced by design

3️⃣ Accessing Protected Routes

Client makes request
Browser automatically sends cookies


4️⃣ Token Refresh

If access token expires:
Refresh token is verified
New access token is issued
No re-login required

5️⃣ Logout

Server clears auth cookies
Tokens become useless
Session is effectively terminated