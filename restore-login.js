const fs = require('fs');

const loginContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Stackly</title>

    <link rel="stylesheet" href="css/login.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>
    <div class="back-btn-container" style="position:absolute; top:20px; left:20px;">
        <a href="javascript:history.back()" class="back-btn"><i class="fas fa-arrow-left"></i>Go Back</a>
    </div>
    <div class="bg-animation">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="login-container">

        <div class="login-left">
            <img src="assets/logo.webp" alt="Stackly Logo" style="height: 60px; margin-bottom: 20px;">

            <h1>Welcome Back</h1>

            <p>
                Continue your wellness journey with Stackly.
            </p>

            <img src="https://images.unsplash.com/photo-1518611012118-fb5fc4d3d1c9?w=600" alt="health">

        </div>

        <div class="login-right">

            <form id="loginForm">

                <h2>Login</h2>
                <select id="role" required>

                    <option value="">Select Role</option>

                    <option value="user">User</option>

                    <option value="admin">Admin</option>

                </select>

                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" placeholder="Email Address" required>
                </div>

                <div class="input-group">
                    <i class="fas fa-lock"></i>

                    <input type="password" id="loginPassword" placeholder="Password" required>

                    <i class="fas fa-eye toggle-password" onclick="toggleLoginPassword()">
                    </i>

                </div>

                <div class="forget-password" style="text-align:right; margin-bottom:15px; margin-top:-10px;">
                    <a href="#"
                        style="color:var(--primary); text-decoration:none; font-size:14px; font-weight:500;">Forgot
                        Password?</a>
                </div>

                <button type="submit">
                    Login
                </button>

                <p class="bottom-text">
                    Don't have an account?
                    <a href="signup.html">Create Account</a>
                </p>

            </form>

        </div>

    </div>

    <script src="js/main.js"></script>

</body>

</html>`;

fs.writeFileSync('e:/Lifestyle/login.html', loginContent);
console.log('Restored login.html');
