using UnityEditor;
using UnityEngine;
using System.IO;

public class FolderStructureCreator : MonoBehaviour
{
    [MenuItem("Tools/Create Modular Folder Structure")]
    public static void CreateFolders()
    {
        string[] folders = new string[]
        {
            "Assets/Prefabs/Buildings",
            "Assets/Prefabs/Characters",
            "Assets/Prefabs/Vehicles",
            "Assets/Prefabs/Props",
            "Assets/Prefabs/Weapons",

            "Assets/JSON/Buildings",
            "Assets/JSON/Characters",
            "Assets/JSON/Vehicles",
            "Assets/JSON/Props",
            "Assets/JSON/Weapons",

            "Assets/Scripts/Generator",
            "Assets/Scripts/Metadata",
            "Assets/Scripts/UI",
            "Assets/Scripts/Utilities",

            "Assets/UI/Panels",
            "Assets/UI/Buttons",
            "Assets/UI/Icons",

            "Assets/Materials/FactionOverlays",
            "Assets/Materials/Effects",

            "Assets/Resources/Prefabs",
            "Assets/Resources/JSON",

            "Assets/StreamingAssets/JSON",

            "Assets/Editor/JSONTools",
            "Assets/Editor/PrefabTagger"
        };

        foreach (string folder in folders)
        {
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
                Debug.Log("Created folder: " + folder);
            }
        }

        AssetDatabase.Refresh();
        Debug.Log("✅ Modular folder structure created successfully.");
    }
}
