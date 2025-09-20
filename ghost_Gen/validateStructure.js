const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'Assets');
const requiredJsonFields = {
    Buildings: ['model_id', 'name', 'tags', 'position_offset', 'scale'],
    Characters: ['character_id', 'name', 'faction', 'attributes'],
    Vehicles: ['vehicle_id', 'type', 'speed', 'wallet_gate'],
    Weapons: ['weapon_id', 'damage', 'range']
};

function validateJson(filePath, requiredFields) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const missing = requiredFields.filter(field => !(field in data));
        if (missing.length > 0) {
            console.warn(`⚠️ ${path.basename(filePath)} missing fields: ${missing.join(', ')}`);
        } else {
            console.log(`✅ ${path.basename(filePath)} is valid`);
        }
    } catch (err) {
        console.error(`❌ Error parsing ${filePath}: ${err.message}`);
    }
}

function scanFolder(folder, category) {
    const fullPath = path.join(root, folder);
    if