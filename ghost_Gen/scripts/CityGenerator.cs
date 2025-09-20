using UnityEngine;

public class CityGenerator : MonoBehaviour
{
    void Start()
    {
        string[] lines = new string[] {
          "Block_A,0,0,Faction_A",
          "Block_B,10,0,Faction_B",
          "Terminal_01,5,5,dApp",
          "WalletGate_01,15,0,WalletLocked",
          ""
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