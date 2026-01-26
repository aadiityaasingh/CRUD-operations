# 🔐 Auth System with Email OTP Verification (Node.js + JWT)

A secure backend authentication system built with Node.js, Express, MongoDB, JWT, HTTP-only cookies, and Email OTP verification.

🚀 Features

🔑 Core Authentication:
User Registration
Email OTP Verification (6-digit code)
User Login
Logout
Protected Routes

📧 Email System:
OTP sent during registration
OTP expires after 10 minutes
Welcome email sent after successful verification

🔒 Security Features:
Password hashing with bcrypt
JWT-based authentication
Tokens stored in HTTP-only cookies
Email ownership verification required before login
OTP expiry system
Protection against XSS token theft
Basic CSRF mitigation using sameSite cookies

Authentication Flow
1️⃣ Registration:-

User submits:
Name
Email
Password

Server actions:
Checks if user already exists
Hashes password using bcrypt
Generates 6-digit OTP
Stores OTP + expiry time in DB
Sends OTP to user’s email
⚠️ User is NOT logged in yet

2️⃣ Email Verification (OTP):-
User submits:
Email
6-digit OTP
Server verifies:
OTP matches
OTP is not expired

If valid:
isVerified → set to true
OTP fields cleared
Welcome email sent

User is logged in (JWT cookie issued)

3️⃣ Login:-
User submits:
Email
Password
Server checks:
User exists
Password matches
Email is verified ✅

If all pass:
JWT token generated
Token stored in HTTP-only cookie

4️⃣ Accessing Protected Routes:-
When a logged-in user makes a request:
Browser automatically sends the JWT cookie
Auth middleware verifies the token
If valid → access granted
If invalid/expired → access denied

5️⃣ Logout:-
Server clears the authentication cookie: