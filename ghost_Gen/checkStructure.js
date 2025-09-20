const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'Assets'); // Adjust if needed

function scanFolder(folder, indent = '') {
    if (!fs.existsSync(folder)) {
        console.warn(`❌ Missing folder: ${folder}`);
        return;
    }

    const items = fs.readdirSync(folder);
    console.log(`${indent}📁 ${path.basename(folder)} (${items.length} items)`);

    items.forEach(item => {
        const fullPath = path.join(folder, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            scanFolder(fullPath, indent + '  ');
        } else {
            console.log(`${indent}  📄 ${item}`);
        }
    });
}

console.log(`🔍 Scanning folder structure under: ${root}`);
scanFolder(root);
