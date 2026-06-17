const fs = require('fs');

const indexCssPath = 'e:/Lifestyle/css/index.css';
let content = fs.readFileSync(indexCssPath, 'utf8');

// The file was messed up at the top. Let's rebuild the top part based on the standard files.
const originalTop = `:root{
  --primary: #1B9C85;
  --primary-dark: #147A68;
  --primary-light: #DDF7F2;
  --background: #F8FFFE;
  --text: #1F2937;
}

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:var(--background);
color:var(--text);
overflow-x:clip;
}

.navbar{
display:flex;
justify-content:space-between;
align-items:center;
padding:20px 8%;
background:white;

top:0;
z-index:1000;
box-shadow:0 5px 20px rgba(0,0,0,.08);
}`;

// replace everything up to the first closing brace of .navbar
content = content.replace(/^:root\{[\s\S]*?box-shadow:0 5px 20px rgba\(0,0,0,\.08\);\s*\}/, originalTop);

fs.writeFileSync(indexCssPath, content);
console.log('Fixed index.css');
