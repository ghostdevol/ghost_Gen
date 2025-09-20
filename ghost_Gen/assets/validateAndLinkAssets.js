const fs = require('fs');
const path = require('path');

const jsonRoot = path.resolve(__dirname, 'Assets/JSON');
const prefabRoot = path.resolve(__dirname, 'Assets/Prefabs');

const assetTypes = {
    Buildings: 'model_id',
    Characters: 'character_id',
    Vehicles: 'vehicle_id',
    Weapons: 'weapon_id'
};

function getJsonIds(folder, keyField) {
    const ids = new Set();
    const files = fs.readdirSync(folder).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const filePath = path.join(folder, file);
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (data[keyField]) {
                ids.add(data[keyField]);
            } else {
                console.warn(`⚠️ ${file} missing key: ${keyField}`);
            }
        } catch (err) {
            console.error(`❌ Error parsing ${file}: ${err.message}`);
        }
    });

    return ids;
}

function getPrefabNames(folder) {
    const files = fs.readdirSync(folder).filter(f => f.endsWith('.prefab'));
    return new Set(files.map(f => path.basename(f, '.prefab')));
}

function crossReferenceAssets() {
    console.log(`🔍 Cross-referencing prefabs and JSON metadata...`);

    Object.entries(assetTypes).forEach(([type, keyField]) => {
        const jsonFolder = path.join(jsonRoot, type);
        const prefabFolder = path.join(prefabRoot, type);

        if (!fs.existsSync(jsonFolder) || !fs.existsSync(prefabFolder)) {
            console.warn(`❌ Missing folder for ${type}`);
            return;
        }

        const jsonIds = getJsonIds(jsonFolder, keyField);
        const prefabNames = getPrefabNames(prefabFolder);

        console.log(`📁 ${type}: ${jsonIds.size} JSONs, ${prefabNames.size} prefabs`);

        jsonIds.forEach(id => {
            if (!prefabNames.has(id)) {
                console.warn(`🔗 Missing prefab for JSON: ${id}`);
            }
        });

        prefabNames.forEach(name => {
            if (!jsonIds.has(name)) {
                console.warn(`📄 Unlinked prefab (no JSON): ${name}`);
            }
        });
    });
}

crossReferenceAssets();
