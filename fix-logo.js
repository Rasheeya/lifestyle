const fs = require('fs');
const path = require('path');

const dir = 'e:/Lifestyle';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// The image itself says Stackly, so we don't need text or icons.
const imgTag = '<img src="assets/logo.webp" alt="Stackly Logo" style="height: 40px; width: auto; vertical-align: middle;">';
const authImgTag = '<img src="assets/logo.webp" alt="Stackly Logo" style="height: 60px; margin-bottom: 20px;">\n';

files.forEach(file => {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    let changed = false;

    // For auth pages
    if (file === 'signup.html' || file === 'forgot-password.html') {
        if (!content.includes('assets/logo.webp')) {
            content = content.replace(/(<div class="(?:signup-left|forgot-left)[^"]*">\s*)/i, `$1${authImgTag}`);
            changed = true;
            console.log('Updated auth:', file);
        }
    } else if (file === 'login.html') {
        // already handled by restore-login.js, but let's ensure it doesn't have the text duplicating
        // Wait, restore-login.js already added it correctly.
    } else {
        // For all other pages
        if (content.includes('class="logo"')) {
            let newContent = content.replace(/(<div class="logo"[^>]*>)[\s\S]*?(<\/div>)/gi, `$1\n${imgTag}\n$2`);
            if (newContent !== content) {
                content = newContent;
                changed = true;
                console.log('Updated logo safely:', file);
            }
        }
    }

    if (changed) {
        fs.writeFileSync(p, content);
    }
});
console.log('Done fixing logos!');
