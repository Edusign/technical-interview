# Exercice de Code : Rate Limiter

## Énoncé du Problème

Concevez et implémentez une classe rate limiter en TypeScript qui limite le nombre de requêtes qu'un utilisateur peut faire dans une fenêtre de temps.

```
Exigences :
- Classe `RateLimiter` avec limite et durée de fenêtre configurables
- `isAllowed(userId: string): boolean` - retourne true si la requête est autorisée
- Plusieurs utilisateurs doivent être suivis indépendamment
- La fenêtre est "glissante" - basée sur les N dernières secondes, pas des intervalles fixes
```

**Exemple :**
```typescript
const limiter = new RateLimiter({ limit: 3, windowMs: 1000 }); // 3 requêtes par seconde

limiter.isAllowed("user1"); // true (1ère requête)
limiter.isAllowed("user1"); // true (2ème requête)
limiter.isAllowed("user1"); // true (3ème requête)
limiter.isAllowed("user1"); // false (limite dépassée)
limiter.isAllowed("user2"); // true (utilisateur différent)

// Après 1 seconde...
limiter.isAllowed("user1"); // true (fenêtre réinitialisée)
```
