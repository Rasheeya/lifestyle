const fs = require('fs');
const path = require('path');

const dir = 'e:/Lifestyle';

// Process HTML files
const htmlFiles = ['index.html', 'about.html', 'blog.html', 'contact.html', 'services.html', 'testimonials.html', 'login.html', 'signup.html', '404.html'];

htmlFiles.forEach(file => {
    let p = path.join(dir, file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');

        // Add menu-toggle to navbar if it doesn't exist
        if (content.includes('class="navbar"') && !content.includes('class="menu-toggle"')) {
            content = content.replace(/<\/nav>/, `  <div class="menu-toggle" id="mobile-menu-${file.replace('.html','')}">\n    <i class="fas fa-bars"></i>\n  </div>\n</nav>`);
        }

        fs.writeFileSync(p, content);
        console.log('Updated HTML:', file);
    }
});

// Process CSS files
const cssDir = path.join(dir, 'css');
const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

const responsiveCSS = `
/* Global Sticky Header & Mobile Menu */
header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: white;
}
.menu-toggle {
    display: none;
    font-size: 28px;
    cursor: pointer;
    color: var(--primary);
}
@media(max-width:900px){
    .menu-toggle {
        display: block;
    }
    .nav-links {
        display: none !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        text-align: center;
        padding: 20px 0;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        gap: 15px;
    }
    .nav-links.mobile-active {
        display: flex !important;
    }
    .nav-btns {
        display: none;
    }
    .navbar.mobile-active .nav-btns {
        display: flex;
        position: absolute;
        top: calc(100% + 220px);
        left: 0;
        width: 100%;
        justify-content: center;
        background: white;
        padding-bottom: 20px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
}
`;

cssFiles.forEach(file => {
    let p = path.join(cssDir, file);
    let content = fs.readFileSync(p, 'utf8');
    
    // remove sticky from .navbar to avoid double sticky conflicts
    content = content.replace(/position:\s*sticky;/g, '');
    
    // remove existing .nav-links hide in mobile if any to let our important override work, actually !important handles it.
    
    if (!content.includes('.menu-toggle {')) {
        content += responsiveCSS;
        fs.writeFileSync(p, content);
        console.log('Updated CSS:', file);
    }
});

// Process main.js to add toggle logic
const jsPath = path.join(dir, 'js', 'main.js');
if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    if (!jsContent.includes('Mobile Menu Toggle')) {
        jsContent += `

/* =========================
   Mobile Menu Toggle
========================= */
document.querySelectorAll('.menu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const navbar = this.closest('.navbar');
        const navLinks = navbar.querySelector('.nav-links');
        const icon = this.querySelector('i');
        
        navLinks.classList.toggle('mobile-active');
        navbar.classList.toggle('mobile-active');
        
        if (navLinks.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});
`;
        fs.writeFileSync(jsPath, jsContent);
        console.log('Updated main.js');
    }
}
