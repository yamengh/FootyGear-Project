# MongoDB Installation Guide for Windows

## Issue: Authentication Network Error

The "network error" during signup is because MongoDB is not running on your computer. Follow these steps to install and start MongoDB:

## Option 1: Download MongoDB Installer (Recommended)

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Version: 7.0.x (Current)
   - Package: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - **IMPORTANT**: Check "Install MongoDB as a Service"
   - **IMPORTANT**: Check "Install MongoDB Compass" (optional GUI tool)
   - Click "Install"

3. **Verify MongoDB is Running**
   Open PowerShell and run:
   ```powershell
   Get-Service MongoDB
   ```
   
   You should see:
   ```
   Status   Name               DisplayName
   ------   ----               -----------
   Running  MongoDB            MongoDB Server (MongoDB)
   ```

4. **If MongoDB is not running**, start it:
   ```powershell
   net start MongoDB
   ```

## Option 2: Using Chocolatey (Requires Admin)

1. **Open PowerShell as Administrator**
   - Right-click Start Menu → Windows PowerShell (Admin)

2. **Install Chocolatey** (if not installed):
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. **Install MongoDB**:
   ```powershell
   choco install mongodb -y
   ```

4. **Start MongoDB**:
   ```powershell
   net start MongoDB
   ```

## Testing the Connection

Once MongoDB is installed and running:

1. Your server is already running at http://localhost:3000
2. Refresh your browser
3. Click "Sign Up"
4. Fill in the form and submit
5. You should now be able to create an account successfully!

## Troubleshooting

### "MongoDB service not found"
- Make sure you selected "Install as a Service" during installation
- Or manually start MongoDB: `mongod --dbpath C:\data\db`

### "Access denied" when starting service
- Run PowerShell as Administrator
- Then run: `net start MongoDB`

### Still getting network error
- Check if MongoDB is running: `Get-Service MongoDB`
- Check server console for errors
- Restart the Node.js server: Stop with Ctrl+C, then `npm run dev`

##Need More Help?

If you're still having issues:
1. Check the server console output for specific error messages
2. Try accessing http://localhost:27017 in your browser
   - You should see: "It looks like you are trying to access MongoDB over HTTP..."
3. Make sure your `.env` file exists with: `MONGODB_URI=mongodb://localhost:27017/footygear`
