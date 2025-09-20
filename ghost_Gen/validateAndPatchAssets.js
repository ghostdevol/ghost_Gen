const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'Assets/JSON');
const assetTypes = {
    Buildings: {
        required: ['model_id', 'name', 'tags', 'position_offset', 'scale'],
        defaults: {
            tags: [],
            position_offset: [0, 0, 0],
            scale: [1, 1, 1]
        }
    },
    Characters: {
        required: ['character_id', 'name', 'faction', 'attributes'],
        defaults: {
            attributes: {
                health: 100,
                strength: 50,
                agility: 50
            }
        }
    },
    Vehicles: {
        required: ['vehicle_id', 'type', 'speed', 'wallet_gate'],
        defaults: {
            speed: 60,
            wallet_gate: {
                required_token: "DEFAULT_PASS",
                min_balance: 0
            }
        }
    },
    Weapons: {
        required: ['weapon_id', 'damage', 'range'],
        defaults: {
            damage: 10,
            range: 50
        }
    }
};

function validateAndPatch(filePath, schema) {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error(`❌ Error parsing ${filePath}: ${err.message}`);
        return;
    }

    const missing = schema.required.filter(field => !(field in data));
    if (missing.length > 0) {
        console.warn(`⚠️ ${path.basename(filePath)} missing: ${missing.join(', ')}`);
        missing.forEach(field => {
            if (schema.defaults[field] !== undefined) {
                data[field] = schema.defaults[field];
                console.log(`  ➕ Patched ${field} with default`);
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`  💾 Updated ${path.basename(filePath)}`);
    } else {
        console.log(`✅ ${path.basename(filePath)} is valid`);
    }
}

function scanAssets() {
    console.log(`🔍 Scanning and validating JSON assets in: ${root}`);
    Object.entries(assetTypes).forEach(([type, schema]) => {
        const folder = path.join(root, type);
        if (!fs.existsSync(folder)) {
            console.warn(`❌ Missing folder: ${folder}`);
            return;
        }

        const files = fs.readdir