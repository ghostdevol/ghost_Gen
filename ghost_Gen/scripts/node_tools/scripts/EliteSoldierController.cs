using UnityEngine;

public class EliteSoldierController : MonoBehaviour
{
    public int health = 150;
    public float speed = 7f;
    public int armor = 50;

    public string rarity = "Epic";
    public string[] tags = { "GhostDevol", "NeoSynth" };

    void Start()
    {
        Debug.Log($"[GhostDevol] EliteSoldier initialized with Epic rarity.");
    }

    
    public void Jump() {
        Debug.Log("EliteSoldier performed Jump.");
    }

    public void Sprint() {
        Debug.Log("EliteSoldier performed Sprint.");
    }

    public void Crouch() {
        Debug.Log("EliteSoldier performed Crouch.");
    }
}