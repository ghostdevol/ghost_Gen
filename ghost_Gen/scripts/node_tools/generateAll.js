const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const choice = prompt("What do you want to generate? (city, character, vehicle, gear, all): ").toLowerCase();

// Paths
const assetDir = path.join(__dirname, 'assets');
const scriptDir = path.join(__dirname, 'scripts');
const cityPath = path.join(__dirname, 'city_layout', 'city.csv');

// Asset Generator
if (['character', 'vehicle', 'gear', 'all'].includes(choice)) {
  fs.readdirSync(assetDir).forEach(file => {
    if (file.endsWith('.json')) {
      const asset = JSON.parse(fs.readFileSync(path.join(assetDir, file), 'utf8'));
      const className = `${asset.name}Controller`;

      const script = `
using UnityEngine;

public class ${className} : MonoBehaviour
{
    public int health = ${asset.stats.health};
    public float speed = ${asset.stats.speed}f;
    public int armor = ${asset.stats.armor};

    public string rarity = "${asset.rarity}";
    public string[] tags = { ${asset.tags.map(tag => `"${tag}"`).join(', ')} };

    void Start()
    {
        Debug.Log($"[GhostDevol] ${asset.name} initialized with ${asset.rarity} rarity.");
    }

    ${asset.abilities.map(ability => `
    public void ${ability}() {
        Debug.Log("${asset.name} performed ${ability}.");
    }`).join('\n')}
}
`;

      fs.writeFileSync(path.join(scriptDir, `${className}.cs`), script.trim());
      console.log(`Generated: ${className}.cs`);
    }
  });
}

// City Generator
if (choice === 'city' || choice === 'all') {
  if (fs.existsSync(cityPath)) {
    const cityData = fs.readFileSync(cityPath, 'utf8').split('\n');
    const cityScript = `
using UnityEngine;

public class CityGenerator : MonoBehaviour
{
    void Start()
    {
        string[] lines = new string[] {
          ${cityData.map(line => `"${line.trim()}"`).join(',\n          ')}
        };

        foreach (string line in lines)
        {
            string[] parts = line.Split(',');
            string prefabName = parts[0];
            Vector3 position = new Vector3(float.Parse(parts[1]), 0, float.Parse(parts[2]));
            GameObject block = Instantiate(Resources.Load<GameObject>(prefabName), position, Quaternion.identity);
            block.tag = parts[3];
        }
    }
}
`;

    fs.writeFileSync(path.join(scriptDir, `CityGenerator.cs`), cityScript.trim());
    console.log(`Generated: CityGenerator.cs`);
  } else {
    console.log("City layout file not found.");
  }
}
