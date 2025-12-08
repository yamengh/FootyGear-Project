# MongoDB Atlas Setup Guide

## Step-by-Step Instructions (5 minutes)

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google, GitHub, or Email (fastest with Google)
3. Click "Sign Up"

### Step 2: Create FREE Cluster
1. After signing in, you'll see "Create a Deployment"
2. Choose **M0 FREE** (it's completely free forever!)
3. Provider: **AWS** (or any)
4. Region: Choose one close to you
5. Cluster Name: Leave as default or name it "FootyGear"
6. Click **"Create Deployment"** button

### Step 3: Create Database User
You'll see a popup "Security Quickstart":
1. **Username**: `footygear` (or your choice)
2. **Password**: Click "Autogenerate Secure Password" and **COPY IT**
   - Save this password somewhere safe!
3. Click "Create Database User"

### Step 4: Add IP Address
Still in the same popup:
1. Click "Add My Current IP Address"
2. OR click "Allow Access from Anywhere" (easier for development)
3. Click "Finish and Close"

### Step 5: Get Connection String
1. Click "Connect" button on your cluster
2. Choose "Drivers"
3. Select: **Node.js** and version **5.5 or later**
4. **COPY the connection string** - it looks like:
   ```
   mongodb+srv://footygear:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you copied in Step 3

### Step 6: Tell Me Your Connection String
**Paste your connection string here** (with the password filled in), and I'll update your .env file!

Example:
```
mongodb+srv://footygear:MyP@ssw0rd123@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
```

---

## After I Update Your Files:
1. Server will auto-restart (you're using `npm run dev`)
2. Refresh your browser
3. Try signing up - it will work! ✅

---

## Need Help?
If you get stuck at any step, let me know which step and I'll help!
