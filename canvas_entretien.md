# Canvas d'Entretien Technique

> **Imprimer ou copier pour chaque entretien. Remplir les observations en temps réel.**
> Pré-configuré pour : Rate Limiter (Code) + Système de Notifications (Conception)

---

## Configuration Pré-Entretien

| Champ | Valeur |
|-------|--------|
| **Candidat** | |
| **Poste/Niveau** | ☐ Mid (2-4 ans) ☐ Senior (5+ ans) |
| **Date/Heure** | |
| **Évaluateur** | |

### Répartition du Temps

| Niveau | Code | Conception Système | Comportemental | Total |
|--------|------|-------------------|----------------|-------|
| **Mid** | 25 min (50%) | 12 min (25%) | 12 min (25%) | 50 min |
| **Senior** | 15 min (30%) | 20 min (40%) | 15 min (30%) | 50 min |

### Checklist Pré-Entretien
- ☐ `rate-limiter-starter.ts` prêt à partager
- ☐ Partage d'écran / outil de tableau blanc prêt
- ☐ Chronomètre visible
- ☐ Ce canvas imprimé/ouvert pour les notes

---

## Section 1 : Code — Rate Limiter

**Problème :** Implémenter un rate limiter à fenêtre glissante en TypeScript

```typescript
interface RateLimiterConfig { limit: number; windowMs: number; }
class RateLimiter {
  isAllowed(userId: string): boolean { /* implémenter */ }
}
```

### Grille d'Évaluation

| Dimension | 1 | 2 | 3 | 4 | Notes |
|-----------|---|---|---|---|-------|
| **Compréhension du Problème** | ☐ | ☐ | ☐ | ☐ | _Clarifie glissante vs fixe, demande l'échelle_ |
| **Conception de Solution** | ☐ | ☐ | ☐ | ☐ | _Planifie la structure avant de coder, mentionne alternatives_ |
| **Implémentation** | ☐ | ☐ | ☐ | ☐ | _Logique correcte, gère les cas limites, code propre_ |
| **Communication** | ☐ | ☐ | ☐ | ☐ | _Pense à voix haute, répond aux indices_ |
| **Maîtrise TypeScript** | ☐ | ☐ | ☐ | ☐ | _Types corrects, interfaces, pas de any implicite_ |

**Notation :** 4=Exceptionnel | 3=Solide | 2=En développement | 1=Insuffisant

### Points de Contrôle Clés

| Point de Contrôle | ☐ | Temps | Notes |
|-------------------|---|-------|-------|
| A posé des questions de clarification avant de coder | | | |
| A choisi une structure de données appropriée (Map + timestamps) | | | |
| A implémenté correctement la fenêtre glissante | | | |
| A géré le nettoyage des anciens timestamps | | | |
| Le code compile et fonctionne | | | |

### Utilisation des Indices (cocher si utilisé)

| Niveau d'Indice | Utilisé | Qualité de Réponse |
|-----------------|---------|-------------------|
| ☐ « Comment allez-vous suivre quand les requêtes ont eu lieu ? » | | |
| ☐ « Qu'est-ce qui rend la fenêtre 'glissante' vs 'fixe' ? » | | |
| ☐ « Filtrer les timestamps plus vieux que now - windowMs » | | |

### Observations

**Approche adoptée :**
```




```

**Difficultés rencontrées :**
```




```

**Réponse aux indices :**
```




```

### Questions de Suivi Posées (choisir 1-2)

| Question | Posée | Qualité de Réponse |
|----------|-------|-------------------|
| ☐ « Comment vérifieriez-vous le quota restant ? » | | |
| ☐ « Comment cela fonctionnerait sur plusieurs serveurs ? » | | |
| ☐ « Token bucket vs fenêtre glissante - compromis ? » | | |
| ☐ « Comment testeriez-vous cela unitairement ? » | | |

**Score Code : ___ / 4**

---

## Section 2 : Conception Système — Système de Notifications

**Problème :** Concevoir un système pour notifications push/email/SMS à grande échelle (100M/jour)

### Questions de Cadrage Posées

| Question | ☐ | Leur Compréhension |
|----------|---|-------------------|
| Échelle (DAU, notifications/jour) | | |
| Exigences de latence | | |
| Garanties de livraison | | |
| Préférences utilisateur | | |
| Niveaux de priorité | | |

**Qualité du Cadrage :** ☐ Faible (0-1 questions) ☐ OK (2-3) ☐ Bon (4+)

### Grille d'Évaluation

| Dimension | 1 | 2 | 3 | 4 | Notes |
|-----------|---|---|---|---|-------|
| **Cadrage** | ☐ | ☐ | ☐ | ☐ | _Demande avant de concevoir, découvre les exigences_ |
| **Conception Haut Niveau** | ☐ | ☐ | ☐ | ☐ | _Tous composants présents, flux de données clair_ |
| **Compromis** | ☐ | ☐ | ☐ | ☐ | _Discute des alternatives, explique les choix_ |
| **Approfondissement** | ☐ | ☐ | ☐ | ☐ | _Peut approfondir au moins un domaine_ |
| **Communication** | ☐ | ☐ | ☐ | ☐ | _Schémas clairs, s'adapte au feedback_ |

### Composants Identifiés

| Composant | ☐ | Qualité de l'Explication |
|-----------|---|-------------------------|
| API Gateway / Point d'entrée | | |
| Service de Notification | | |
| File de Messages (Kafka/SQS) | | |
| Workers par Canal (push/email/SMS) | | |
| Préférences Utilisateur (cache) | | |
| Fournisseurs Externes (FCM, SendGrid, Twilio) | | |
| Suivi de Livraison | | |

### Sujet d'Approfondissement (choisir 1)

**Sujet choisi :** ☐ File de Messages ☐ Garanties de Livraison ☐ Échelle ☐ Modèle de Données

**Questions de sondage posées :**
```




```

**Profondeur démontrée :**
```




```

### Scénarios Discutés

| Scénario | ☐ | Comment Ils L'ont Géré |
|----------|---|------------------------|
| « L'utilisateur reçoit 50 notifications en 1 minute » | | |
| « SendGrid est en panne - que se passe-t-il ? » | | |
| « C'est compliqué d'ajouter Slack ? » | | |

### Observations

**Point le plus fort :**
```



```

**Point le plus faible :**
```



```

**Score Conception Système : ___ / 4**

---

## Section 3 : Comportemental — Évaluation STAR

> **Focus sur les ACTIONS** — ce sont les comportements reproductibles que vous recrutez.

### Question 1 : Défi Technique

**Demander :** « Parlez-moi d'une panne technique ou d'un incident que vous avez vécu. Comment l'avez-vous géré ? »

| STAR | Réponse |
|------|---------|
| **S**ituation (contexte bref) | |
| **T**âche (leur responsabilité) | |
| **A**ction (ce qu'ILS ont fait) | |
| **R**ésultat (issue + apprentissages) | |

**Sondes utilisées :**
- ☐ « Qu'avez-vous fait VOUS spécifiquement ? »
- ☐ « Que feriez-vous différemment ? »
- ☐ « Qu'avez-vous appris ? »

**Score : ___ / 4**

---

### Question 2 : Collaboration/Conflit

**Demander :** « Décrivez une situation où vous étiez en désaccord avec votre manager ou un ingénieur senior. Comment l'avez-vous géré ? »

| STAR | Réponse |
|------|---------|
| **S**ituation | |
| **T**âche | |
| **A**ction | |
| **R**ésultat | |

**Sondes utilisées :**
- ☐ « Comment avez-vous présenté votre point de vue ? »
- ☐ « Quelle a été l'issue ? »
- ☐ « Le géreriez-vous différemment maintenant ? »

**Score : ___ / 4**

---

### Question 3 : Prise de Responsabilité (Senior Uniquement)

**Demander :** « Parlez-moi d'une fois où vous avez pris des responsabilités au-delà de votre fiche de poste. »

| STAR | Réponse |
|------|---------|
| **S**ituation | |
| **T**âche | |
| **A**ction | |
| **R**ésultat | |

**Sondes utilisées :**
- ☐ « Pourquoi avez-vous pris l'initiative ? »
- ☐ « Quel a été l'impact ? »
- ☐ « Comment les autres ont-ils réagi ? »

**Score : ___ / 4**

---

## Détection des Signaux

### Signaux d'Alerte Observés

| Signal | ☐ | Preuves |
|--------|---|---------|
| Vague sur les détails, ne peut pas approfondir | | |
| Défensif quand on donne du feedback | | |
| Toujours « on », ne clarifie jamais sa contribution personnelle | | |
| Blâme les autres pour les échecs | | |
| Cite des technologies sans profondeur | | |
| Ne peut pas expliquer son propre code | | |

### Signaux Positifs Observés

| Signal | ☐ | Preuves |
|--------|---|---------|
| Pose des questions de clarification avant de commencer | | |
| Dit « je ne sais pas » + comment il apprendrait | | |
| Admet et apprend de ses erreurs | | |
| Répond bien aux indices/feedback | | |
| Curiosité sincère pour le poste/la tech | | |
| Processus de résolution de problème clair | | |

---

## Signaux Niveau Senior (si applicable)

| Signal | ☐ | Preuves |
|--------|---|---------|
| Navigue l'ambiguïté sans direction | | |
| Pense aux implications équipe/organisation | | |
| Preuves d'influence inter-équipes | | |
| Peut approfondir ET garder la vue d'ensemble | | |
| Articule clairement les compromis | | |

---

## Évaluation Globale

### Résumé des Scores

| Domaine | Score (1-4) | Poids | Pondéré |
|---------|-------------|-------|---------|
| Code (Rate Limiter) | | Mid: 50% / Sr: 30% | |
| Conception Système (Notifications) | | Mid: 25% / Sr: 40% | |
| Comportemental (STAR) | | Mid: 25% / Sr: 30% | |
| **Total** | | 100% | |

### Recommandation Finale

☐ **Oui Fort** — Je recommanderais fortement
☐ **Oui** — Je soutiens le recrutement
☐ **Non** — Je ne recommande pas
☐ **Non Fort** — Préoccupations significatives

### Preuves Clés pour la Décision (1-2 raisons les plus fortes)
```




```

### Préoccupations / Points de Discussion pour le Débrief
```




```

---

## Référence Rapide

### Attentes par Niveau

| Dimension | Mid-Level | Senior |
|-----------|-----------|--------|
| Code | Solution fonctionnelle, gère les bases | Propre, extensible, discute des compromis |
| Conception Système | Composants corrects, scaling basique | Expertise approfondie, modes de panne, opérations |
| Comportemental | Bons exemples avec guidage | Mène la discussion, impact inter-équipes |

### Points de Contrôle du Temps

| Temps | Phase |
|-------|-------|
| 0:00 | Début — Introduction |
| 0:05 | Début exercice de code |
| 0:30 | Début conception système |
| 0:45 | Début comportemental |
| 0:55 | Questions du candidat |
| 1:00 | Fin |

### Auto-Vérification des Biais

Avant de noter, se demander :
- ☐ Mêmes questions que les autres candidats ?
- ☐ Évaluation selon la grille, pas l'instinct ?
- ☐ Preuves documentées en temps réel ?
- ☐ Focus sur les compétences, pas la démographie ?

---

*Canvas v2.0 — Configuré pour Rate Limiter + Système de Notifications*
