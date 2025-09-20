using UnityEngine;

public class EliteSoldierController : MonoBehaviour
{
    // Core Stats
    public int health = 150;
    public float speed = 7f;
    public int armor = 50;

    // Metadata
    public string rarity = "Epic";
    public string[] tags = { "GhostDevol", "NeoSynth" };

    void Start()
    {
        Debug.Log($"[GhostDevol] {gameObject.name} initialized with {rarity} rarity.");
        Debug.Log($"Stats → Health: {health}, Speed: {speed}, Armor: {armor}");
        Debug.Log($"Tags → {string.Join(", ", tags)}");
    }

    // Abilities
    public void Jump()
    {
        Debug.Log($"{gameObject.name} performed Jump.");
        // Add jump logic here
    }

    public void Sprint()
    {
        Debug.Log($"{gameObject.name} performed Sprint.");
        // Add sprint logic here
    }

    public void Crouch()
    {
        Debug.Log($"{gameObject.name} performed Crouch.");
        // Add crouch logic here
    }

    // Optional: Damage handler
    public void TakeDamage(int damage)
    {
        int effectiveDamage = Mathf.Max(damage - armor, 0);
        health -= effectiveDamage;
        Debug.Log($"{gameObject.name} took {effectiveDamage} damage. Remaining health: {health}");

        if (health <= 0)
        {
            Die();
        }
    }

    void Die()
    {
        Debug.Log($"{gameObject.name} has been defeated.");
        Destroy(gameObject);
    }
}
