# FootyGear - Football Equipment Store

A professional e-commerce website for football equipment with user authentication and MongoDB database integration.

## Features

✅ **User Authentication**
- Secure signup and login system
- Password hashing with bcrypt
- Session management
- Professional glassmorphism UI design

✅ **Product Catalog**
- Browse football equipment
- Product details and images
- Shopping cart functionality

✅ **Modern Design**
- Responsive layout
- Smooth animations and transitions
- Gradient effects
- Premium user experience

## Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - See installation instructions below

## MongoDB Installation

### Windows

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows platform
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the downloaded installer
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation:**
   ```bash
   mongod --version
   ```

4. **Start MongoDB Service:**
   - MongoDB should start automatically as a Windows Service
   - Or manually start from Services app (search "Services" in Windows)
   - Look for "MongoDB Server (MongoDB)" and ensure it's Running

### macOS

1. **Install using Homebrew:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

### Linux (Ubuntu/Debian)

1. **Import MongoDB public key:**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. **Create list file:**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. **Install MongoDB:**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

4. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## Project Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd FootyGear-Project-2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - The `.env` file is already created with default settings
   - Default MongoDB connection: `mongodb://localhost:27017/footygear`
   - You can modify `.env` if needed

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to: http://localhost:3000

## Usage

### Creating an Account

1. Click **"Sign Up"** in the header
2. Fill in your details:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
3. Accept terms and conditions
4. Click **"Create Account"**
5. You'll be redirected to the login page

### Logging In

1. Click **"Login"** in the header
2. Enter your email and password
3. Optionally check "Remember me"
4. Click **"Login"**
5. You'll be redirected to the homepage with your name displayed

### Shopping

- Browse products on the homepage
- Click "Add to Cart" on any product
- View cart by clicking the cart icon
- Adjust quantities or remove items
- Proceed to checkout

### Logging Out

- Click the **"Logout"** button in the header when logged in

## Troubleshooting

### Server Won't Start

**Issue:** `MongoDB connection error`

**Solution:**
1. Make sure MongoDB is installed and running:
   ```bash
   # Windows (in PowerShell as Administrator)
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

2. Verify MongoDB is accessible:
   ```bash
   mongo --eval "db.version()"
   ```

### Port 3000 Already in Use

**Solution:**
1. Stop any other applications using port 3000
2. Or change the PORT in `.env` file:
   ```
   PORT=3001
   ```

### Authentication Not Working

**Solution:**
1. Ensure MongoDB is running
2. Check server console for error messages
3. Clear browser cookies and try again
4. Verify `.env` file exists and contains correct values

## Project Structure

```
FootyGear-Project-2/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   └── User.js              # User data model
├── routes/
│   └── auth.js              # Authentication API routes
├── src/main/resources/
│   ├── css/
│   │   ├── auth.css         # Authentication page styles
│   │   └── style.css        # Main site styles
│   ├── js/
│   │   ├── auth.js          # Authentication logic
│   │   └── main.js          # Main site functionality
│   ├── index.html           # Homepage
│   ├── login.html           # Login page
│   └── signup.html          # Signup page
├── .env                     # Environment variables
├── .env.example            # Environment variables template
├── package.json            # Project dependencies
└── server.js               # Express server
```

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - bcryptjs (password hashing)
  - express-session (session management)

- **Frontend:**
  - HTML5
  - CSS3 (with modern features)
  - JavaScript (ES6+)
  - Google Fonts (Inter)
  - Font Awesome icons

## Security Features

- ✅ Password hashing with bcrypt
- ✅ Secure session management
- ✅ HTTP-only cookies
- ✅ Input validation
- ✅ Email uniqueness enforcement
- ✅ Password strength requirements

## Future Enhancements

- Email verification
- Password reset functionality
- User profile management
- Order history
- Payment integration
- Product reviews and ratings
- Admin dashboard

## License

This project is for educational purposes.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Ensure all prerequisites are installed
3. Verify MongoDB is running
4. Check server console logs for errors
