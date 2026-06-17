const fs = require('fs');
const path = require('path');

const dir = 'e:/Lifestyle';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const imgTag = '<img src="assets/logo.webp" alt="Stackly Logo" style="height: 35px; width: auto; margin-right: 10px; vertical-align: middle;">';
const loginImgTag = '<img src="assets/logo.webp" alt="Stackly Logo" style="height: 60px; margin-bottom: 20px;">\n';

files.forEach(file => {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');

    // For auth pages without .logo class
    if (file === 'login.html' || file === 'signup.html' || file === 'forgot-password.html') {
        if (!content.includes('assets/logo.webp')) {
            content = content.replace(/(<div class="(?:login-left|signup-left)[^"]*">\s*)/i, `$1${loginImgTag}`);
            fs.writeFileSync(p, content);
            console.log('Updated auth page:', file);
        }
    } else {
        // For pages with .logo class
        if (content.includes('class="logo"')) {
            if (!content.includes('assets/logo.webp')) {
                // Remove existing icon if present
                content = content.replace(/<i class="fas fa-[^"]+"><\/i>\s*/g, '');
                
                // Add img tag before Stackly text
                content = content.replace(/(<div class="logo"[^>]*>)\s*(Stackly)?/gi, `$1\n${imgTag} Stackly`);
                
                fs.writeFileSync(p, content);
                console.log('Updated page:', file);
            }
        }
    }
});
console.log('Done!');
