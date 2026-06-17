const fs = require('fs');
const path = require('path');

const dir = 'e:/Lifestyle';
const htmlFiles = [
    'admin-appointments.html', 'admin-blogs.html', 'admin-dashboard.html', 
    'admin-messages.html', 'admin-settings.html', 'admin-testimonials.html', 'admin-users.html',
    'user-appointments.html', 'user-dashboard.html', 'user-profile.html', 
    'user-programs.html', 'user-progress.html', 'user-settings.html'
];

htmlFiles.forEach(file => {
    let p = path.join(dir, file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');

        // Insert hamburger menu icon in topbar if not present
        if (content.includes('class="topbar"') && !content.includes('class="dashboard-menu-btn"')) {
            content = content.replace(/<div class="topbar">/, `<div class="topbar">\n<div class="dashboard-menu-btn" onclick="document.querySelector('.sidebar').classList.toggle('active')" style="display:none; font-size:24px; cursor:pointer; color:var(--primary); margin-bottom:15px;"><i class="fas fa-bars"></i></div>`);
        }

        // Add close button inside sidebar if not present
        if (content.includes('class="sidebar"') && !content.includes('close-sidebar')) {
            content = content.replace(/<aside class="sidebar">/, `<aside class="sidebar">\n<div class="close-sidebar" onclick="document.querySelector('.sidebar').classList.remove('active')" style="display:none; position:absolute; top:20px; right:20px; font-size:24px; cursor:pointer; color:white;"><i class="fas fa-times"></i></div>`);
        }

        fs.writeFileSync(p, content);
        console.log('Updated HTML:', file);
    }
});

const cssFiles = ['admin-dashboard.css', 'user-dashboard.css'];
const cssDir = path.join(dir, 'css');

const responsiveCSS = `
/* Enhanced Mobile Responsiveness for Dashboards */
.table-card {
    overflow-x: auto;
}
table {
    min-width: 600px;
}

@media(max-width:768px){
    .sidebar {
        left: -300px;
        width: 260px !important;
        z-index: 2000;
        transition: left 0.3s ease;
    }
    .sidebar.active {
        left: 0;
    }
    .sidebar ul li {
        font-size: 16px !important;
    }
    .sidebar ul li i {
        margin-right: 12px !important;
    }
    .sidebar .logo {
        font-size: 28px !important;
    }
    .close-sidebar {
        display: block !important;
    }
    .main-content {
        margin-left: 0 !important;
        width: 100% !important;
        padding: 15px !important;
    }
    .dashboard-menu-btn {
        display: block !important;
    }
    .stats-grid {
        grid-template-columns: 1fr !important;
    }
    .topbar {
        flex-direction: column;
        align-items: flex-start;
    }
    .profile-card {
        grid-template-columns: 1fr !important;
    }
    .profile-right {
        grid-template-columns: 1fr !important;
    }
}
`;

cssFiles.forEach(file => {
    let p = path.join(cssDir, file);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        
        if (!content.includes('Enhanced Mobile Responsiveness')) {
            content += responsiveCSS;
            fs.writeFileSync(p, content);
            console.log('Updated CSS:', file);
        }
    }
});

console.log('Done!');
