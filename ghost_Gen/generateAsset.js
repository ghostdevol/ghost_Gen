const fs = require('fs');
const path = require('path');

const inputDir = './assets';
const outputDir = './scripts';

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.json')) {
    const asset = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));
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
        Debug.Log($"Stats → Health: {health}, Speed: {speed}, Armor: {armor}");
        Debug.Log($"Tags → {string.Join(", ", tags)}");
    }

    ${asset.abilities.map(ability => `
    public void ${ability}() {
        Debug.Log("${asset.name} performed ${ability}.");
        // Add ${ability} logic here
    }`).join('\n')}
}
`;

    fs.writeFileSync(path.join(outputDir, `${className}.cs`), script.trim());
    console.log(`Generated: ${className}.cs`);
  }
});
