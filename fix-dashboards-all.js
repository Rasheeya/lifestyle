const fs = require('fs');
const path = require('path');

const dir = 'e:/Lifestyle';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dashScript = `
// Mobile Dashboard Menu
const dashMenuBtn = document.querySelector('.dashboard-menu-btn');
const sidebar = document.querySelector('.sidebar');
const closeSidebarBtn = document.querySelector('.close-sidebar');

if (dashMenuBtn && sidebar) {
    dashMenuBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}
`;

// Append script to main.js if not there
let mainJs = fs.readFileSync('e:/Lifestyle/js/main.js', 'utf8');
if (!mainJs.includes('dashboard-menu-btn')) {
    fs.writeFileSync('e:/Lifestyle/js/main.js', mainJs + '\n' + dashScript);
    console.log('Updated main.js');
}

files.forEach(file => {
    // Determine if it's a dashboard file
    if (file.startsWith('admin-') || file.startsWith('user-')) {
        let p = path.join(dir, file);
        let content = fs.readFileSync(p, 'utf8');
        let changed = false;

        // Add close button to sidebar
        if (content.includes('class="sidebar"') && !content.includes('close-sidebar')) {
            content = content.replace(/(<div class="sidebar"[^>]*>)/i, '$1\n<i class="fas fa-times close-sidebar" style="display:none; position:absolute; top:20px; right:20px; font-size:24px; cursor:pointer; z-index: 2001;"></i>');
            changed = true;
        }

        // Add hamburger button to topbar
        if (content.includes('class="topbar"') && !content.includes('dashboard-menu-btn')) {
            content = content.replace(/(<div class="topbar"[^>]*>)/i, '$1\n<i class="fas fa-bars dashboard-menu-btn" style="display:none; font-size: 24px; color: var(--primary); cursor: pointer; margin-right: 15px;"></i>');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(p, content);
            console.log('Updated', file);
        }
    }
});
