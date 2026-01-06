/**
 * Rate Limiter - Code de Démarrage
 *
 * Implémentez un rate limiter qui limite le nombre de requêtes
 * qu'un utilisateur peut faire dans une fenêtre de temps glissante.
 *
 * Exigences :
 * - Suivre les requêtes par utilisateur indépendamment
 * - Utiliser une fenêtre glissante (les N dernières secondes depuis maintenant)
 * - Retourner true si la requête est autorisée, false si limitée
 */

interface RateLimiterConfig {
  limit: number; // Nombre max de requêtes autorisées
  windowMs: number; // Fenêtre de temps en millisecondes
}

class RateLimiter {
  constructor(config: RateLimiterConfig) {
    // TODO: Initialiser vos structures de données
  }

  /**
   * Vérifie si une requête de l'utilisateur donné doit être autorisée.
   * @param userId - Identifiant unique de l'utilisateur
   * @returns true si la requête est autorisée, false si limitée
   */
  isAllowed(userId: string): boolean {
    // TODO: Implémenter le rate limiting à fenêtre glissante
    return true;
  }
}

// === Cas de Test ===
// Décommentez pour tester votre implémentation

/*
const limiter = new RateLimiter({ limit: 3, windowMs: 1000 });

console.log(limiter.isAllowed("user1")); // true
console.log(limiter.isAllowed("user1")); // true
console.log(limiter.isAllowed("user1")); // true
console.log(limiter.isAllowed("user1")); // false (dépassé)
console.log(limiter.isAllowed("user2")); // true (utilisateur différent)

// Attendre 1 seconde et tester à nouveau
setTimeout(() => {
  console.log(limiter.isAllowed("user1")); // true (fenêtre réinitialisée)
}, 1100);
*/
