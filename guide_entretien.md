# Guide du Conducteur d'Entretien Technique

> Un guide pratique pour mener des entretiens de développeurs mid-level et senior.
> À utiliser avec le Canvas d'Entretien Technique et les matériaux de problèmes.

---

## Avant l'Entretien

### 1-2 Jours Avant

- [ ] Relire le CV du candidat
  - Noter les projets intéressants à aborder
  - Identifier les zones à explorer (lacunes, transitions, technologies)
  - Se concentrer sur les compétences démontrées, pas le pedigree

- [ ] Sélectionner le focus selon le niveau :

  | Niveau | Code | Conception Système | Comportemental |
  |--------|------|-------------------|----------------|
  | Mid (2-4 ans) | 50% (~25 min) | 25% (~12 min) | 25% (~12 min) |
  | Senior (5+ ans) | 30% (~15 min) | 40% (~20 min) | 30% (~15 min) |

- [ ] Préparer les matériaux :
  - Imprimer/ouvrir le Canvas d'Entretien Technique
  - Ouvrir `coding/rate-limiter.md` (guide évaluateur)
  - Ouvrir `coding/rate-limiter-starter.ts` (à partager)
  - Ouvrir `system-design/notification-system.md`
  - Avoir un chronomètre prêt

### 30 Minutes Avant

- [ ] Tester votre vidéo/audio si à distance
- [ ] Préparer le partage d'écran pour l'exercice de code
- [ ] Avoir de l'eau à portée
- [ ] Désactiver les notifications/distractions
- [ ] Relire les progressions d'indices dans les guides

---

## Structure de l'Entretien (60 minutes)

```
┌─────────────────────────────────────────────────────────────────┐
│  0:00  Introduction & Mise en Confiance               (5 min)  │
├─────────────────────────────────────────────────────────────────┤
│  0:05  Exercice de Code                             (25-30 min) │
│        - Présenter le problème (2 min)                          │
│        - Questions de clarification (5 min)                     │
│        - Implémentation (15-20 min)                             │
│        - Questions de suivi (5 min)                             │
├─────────────────────────────────────────────────────────────────┤
│  0:35  Conception Système OU Comportemental         (15-20 min) │
│        Mid-level : conception système légère + comportemental   │
│        Senior : conception système approfondie                  │
├─────────────────────────────────────────────────────────────────┤
│  0:55  Questions du Candidat                          (5 min)   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 : Introduction (5 min)

### Quoi Dire

> « Bonjour [Prénom], merci de prendre le temps aujourd'hui. Je suis [Votre Nom], [Votre Poste] chez [Entreprise]. Je suis ici depuis [X ans] et je travaille sur [contexte bref]. »
>
> « Aujourd'hui, nous allons passer environ une heure ensemble. On va commencer par un exercice de code, puis discuter de conception système, et garder du temps à la fin pour vos questions. »
>
> « Avant de commencer - avez-vous des questions sur le format ? »

### Donner le Ton

- Être chaleureux mais professionnel
- Maintenir le contact visuel (ou regarder la caméra si à distance)
- Sourire - les candidats sont nerveux
- Ne pas survendre le poste (garder pour les questions)

### Ce qu'il NE FAUT PAS Faire

- Ne pas s'excuser pour le processus d'entretien
- Ne pas dire « ce sera facile » (crée de mauvaises attentes)
- Ne pas précipiter cette phase (la mise en confiance compte)

---

## Phase 2 : Exercice de Code (25-30 min)

### Présenter le Problème

1. **Partager le fichier de démarrage** (`rate-limiter-starter.ts`)

2. **Lire l'énoncé clairement :**

> « Je voudrais que vous implémentiez un rate limiter. C'est quelque chose qu'on utilise pour prévenir les abus d'API - limiter les utilisateurs à N requêtes par fenêtre de temps. »
>
> « La méthode principale est `isAllowed(userId)` qui retourne true si la requête est autorisée, false s'ils ont dépassé leur limite. »
>
> « La fenêtre doit être glissante - c'est-à-dire qu'on regarde les N dernières secondes depuis maintenant, pas des intervalles fixes. »
>
> « N'hésitez pas à poser des questions de clarification avant de commencer. »

3. **Attendre les questions** (ne pas les presser)

### Pendant l'Implémentation

#### Votre Rôle

| Faire | Ne Pas Faire |
|-------|--------------|
| Rester engagé (hocher, « mm-hmm ») | Fixer en silence |
| Prendre des notes sur leur approche | Taper bruyamment/de façon distrayante |
| Suivre le temps mentalement | Interrompre leur flow |
| Noter quand ils sont bloqués | Donner les réponses immédiatement |

#### Quand Donner des Indices

**Attendre au moins 2-3 minutes** de blocage avant d'aider.

**Progression des Indices (utiliser avec parcimonie) :**

| Blocage Sur | Indice Niveau 1 | Indice Niveau 2 | Indice Niveau 3 |
|-------------|-----------------|-----------------|-----------------|
| Structure de données | « Comment allez-vous suivre quand chaque requête a eu lieu ? » | « Quelle structure permet de supprimer efficacement les anciennes entrées ? » | « Considérez stocker des timestamps dans une queue par utilisateur » |
| Fenêtre glissante | « Qu'est-ce qui rend une fenêtre 'glissante' vs 'fixe' ? » | « Quelles anciennes requêtes sont encore pertinentes ? » | « Filtrer les timestamps plus vieux que `now - windowMs` » |
| Pour commencer | « Quel est votre premier instinct ? » | « Quelles données devez-vous suivre ? » | « Commencez avec la Map pour les utilisateurs » |

**Comment donner les indices :**
- Formuler comme des questions, pas des réponses
- Dire « Et si vous... » pas « Vous devriez... »
- Après l'indice, leur donner le temps de réfléchir

#### S'ils Finissent en Avance

Utiliser les questions de suivi de `rate-limiter.md` :

**Pour Mid-Level :**
- « Comment ajouteriez-vous une méthode pour vérifier le quota restant ? »
- « Comment testeriez-vous cela unitairement ? »

**Pour Senior :**
- « Comment cela fonctionnerait-il sur plusieurs serveurs ? »
- « Quels sont les compromis entre fenêtre glissante et token bucket ? »

### Notation (Faire Immédiatement Après)

Utiliser la grille d'évaluation de votre canvas :

| Dimension | Score | Preuves |
|-----------|-------|---------|
| Compréhension du Problème | 1-4 | |
| Conception de Solution | 1-4 | |
| Implémentation | 1-4 | |
| Communication | 1-4 | |
| Adaptabilité | 1-4 | |

**Écrire des preuves spécifiques** - pas juste « bien » ou « mal »

---

## Phase 3 : Conception Système (15-20 min)

### Ajuster Selon le Niveau

| Niveau | Profondeur | Focus |
|--------|------------|-------|
| Mid | Composants haut niveau, scaling basique | Peuvent-ils penser au-delà du code ? |
| Senior | Approfondissements, compromis, modes de défaillance | Pensent-ils comme un architecte ? |

### Présenter le Problème

> « Changeons de sujet pour la conception système. Je voudrais que vous conceviez un système de notifications - pensez à quelque chose qui alimente les notifications d'une grande app comme Uber ou Facebook. »
>
> « Il doit supporter les notifications push, email et SMS, en gérant des millions de notifications par jour. »
>
> « Commençons par les questions de clarification, puis on travaillera ensemble sur la conception. »

### Mener la Discussion

#### Phase A : Cadrage (5 min)

**Laissez-les mener.** Les bons candidats demanderont :
- L'échelle (utilisateurs, notifications/jour)
- Les exigences de latence
- Les garanties de livraison
- Les préférences utilisateur

**S'ils ne demandent pas, inciter :**
> « Avant de concevoir, quelles questions avez-vous sur les exigences ? »

**Répondre à leurs questions** en utilisant le guide dans `notification-system.md`

#### Phase B : Conception Haut Niveau (10 min)

**Leur demander de dessiner/décrire :**
> « Décrivez-moi l'architecture haut niveau. Quels sont les composants principaux ? »

**Chercher ces composants :**
- API Gateway / Point d'entrée
- Service de Notification (traitement)
- File de Messages (découplage)
- Workers par Canal (push/email/SMS)
- Préférences Utilisateur (stockage/cache)
- Fournisseurs Externes

**Sonder au fur et à mesure :**
- « Pourquoi avez-vous choisi une queue ici ? »
- « Que se passe-t-il si ce composant tombe en panne ? »
- « Comment cela scale-t-il ? »

#### Phase C : Approfondissement (5-10 min si le temps le permet)

**Choisir UN domaine selon leurs forces :**

| S'ils semblent forts en... | Sonder |
|----------------------------|--------|
| Systèmes distribués | Conception de file de messages, garanties de livraison |
| Modélisation de données | Conception de schéma, patterns d'accès |
| Opérations | Monitoring, gestion des pannes, scénarios d'astreinte |
| Échelle | Goulots d'étranglement, cache, partitionnement |

**Exemple d'approfondissement :**
> « Allons plus en profondeur sur les garanties de livraison. Comment vous assurez-vous qu'une notification n'est pas perdue ? »

### Noter la Conception Système

| Dimension | Score | Preuves |
|-----------|-------|---------|
| Cadrage | 1-4 | |
| Conception Haut Niveau | 1-4 | |
| Compromis | 1-4 | |
| Approfondissements | 1-4 | |
| Communication | 1-4 | |

---

## Phase 4 : Comportemental (10-15 min)

### Choisir les Questions

Choisir 1-2 de la banque de questions du canvas selon :
- Les exigences du rôle (leadership ? résolution de conflits ?)
- Les zones du CV à explorer
- Ce que le code/conception n'a pas révélé

### Questions Recommandées par Focus

| Domaine de Focus | Question |
|------------------|----------|
| Résolution de problèmes | « Parlez-moi d'une panne technique que vous avez vécue. Comment l'avez-vous gérée ? » |
| Travail d'équipe | « Décrivez une situation où vous étiez en désaccord avec votre manager. Comment avez-vous géré cela ? » |
| Prise de responsabilité | « Parlez-moi d'une fois où vous avez pris des responsabilités au-delà de votre fiche de poste. » |
| Croissance | « Parlez-moi d'une erreur significative que vous avez faite. Qu'avez-vous appris ? » |

### Écoute Méthode STAR

En écoutant leur réponse, noter :

| Composant | Quoi Noter |
|-----------|------------|
| **S**ituation | Contexte bref (devrait être <20% de la réponse) |
| **T**âche | Leur responsabilité spécifique |
| **A**ction | **Ce qu'ILS ont fait** (le plus important - 50%+ de la réponse) |
| **R**ésultat | Issue + apprentissages |

### Creuser les Réponses Vagues

| S'ils disent... | Demander... |
|-----------------|-------------|
| « On a fait X » | « Qu'avez-vous fait VOUS spécifiquement ? » |
| « Ça s'est bien passé » | « Comment avez-vous mesuré le succès ? » |
| « J'ai géré » | « Décrivez-moi votre processus de réflexion » |
| Réponse générique | « Pouvez-vous me donner un exemple précis ? » |

### Signaux d'Alerte à Noter

- [ ] Dit toujours « on », jamais « je »
- [ ] Ne peut pas fournir de détails quand on creuse
- [ ] Blâme les autres pour les échecs
- [ ] Aucun apprentissage des erreurs
- [ ] Les réponses ne correspondent pas au CV

---

## Phase 5 : Questions du Candidat (5 min)

### Quoi Écouter

| Type de Question | Signal |
|------------------|--------|
| Sur l'équipe/le travail | Intérêt sincère |
| Sur la croissance/l'apprentissage | Ambitieux |
| Sur les défis | Attentes réalistes |
| Aucune question | Signal d'alerte (non préparé ou non intéressé) |

### Être Honnête

- Ne pas survendre
- Partager les vrais défis
- Être authentique sur la culture

---

## Gérer les Situations Courantes

### Le Candidat est Très Nerveux

- Ralentir votre débit
- Sourire davantage
- Dire : « Prenez votre temps, il n'y a pas d'urgence »
- Commencer par une question d'échauffement plus facile
- Normaliser : « C'est normal de réfléchir à voix haute »

### Le Candidat est Bloqué (Code)

1. Attendre 2-3 minutes (le silence est OK)
2. Demander : « À quoi pensez-vous ? »
3. Donner l'indice niveau 1
4. Si toujours bloqué après 2 min, indice niveau 2
5. Si toujours bloqué, indice niveau 3 ou passer à autre chose

**Jamais :**
- Donner la réponse directement
- Montrer de la frustration
- Les laisser tourner en rond pendant 10+ minutes

### Le Candidat Parle Trop

- Interrompre poliment : « C'est utile, laissez-moi poser une question de suivi... »
- Être direct : « Dans l'intérêt du temps, passons à... »
- Rediriger : « Intéressant - pouvez-vous me montrer en code ? »

### Le Candidat Finit Tout en Avance

**Bon signe !** Utiliser les questions de suivi :
- « Comment étendriez-vous cela pour... ? »
- « Que changeriez-vous si... ? »
- « Parlez-moi d'un problème similaire que vous avez résolu »

### Le Candidat a une Approche Très Différente

- Ne pas pénaliser les solutions non conventionnelles
- Demander : « Expliquez-moi votre raisonnement »
- Évaluer : Est-ce que ça marche ? Est-ce maintenable ?
- Leur approche pourrait être meilleure que la vôtre

### Problèmes Techniques (À Distance)

- Avoir un plan B (appel téléphonique + lien de partage d'écran)
- Dire : « Pas de souci, les problèmes techniques arrivent »
- Ne pas pénaliser pour les problèmes de connexion
- Proposer de reporter si c'est grave

---

## Après l'Entretien

### Immédiatement (Dans les 30 min)

1. **Compléter votre notation** avant de parler à quiconque
2. **Écrire des preuves spécifiques** pour chaque score
3. **Noter votre recommandation :** Oui Fort / Oui / Non / Non Fort
4. **Écrire 2-3 points clés** pour le débrief

### Guide de Notation

| Score | Signification |
|-------|---------------|
| 4 | Exceptionnel - dépasse les attentes, je recommanderais fortement |
| 3 | Solide - répond aux attentes, bon recrutement |
| 2 | En développement - quelques lacunes, nécessite discussion |
| 1 | Insuffisant - préoccupations significatives |

### Écrire de Bonnes Preuves

**Mauvais :** « Bon en code »
**Bon :** « A identifié le cas limite (entrée vide) sans aide, implémenté une solution O(1), expliqué clairement les compromis »

**Mauvais :** « A eu du mal avec la conception système »
**Bon :** « N'a pas pu expliquer pourquoi il a choisi Kafka plutôt que SQS, a raté la gestion des pannes jusqu'à ce qu'on le pousse, mais a bien récupéré avec les indices »

### Protocole de Débrief

1. **Les évaluateurs juniors parlent en premier** (éviter le biais de déférence)
2. **Partager des preuves, pas des impressions**
3. **Si vous atteignez un consensus rapidement**, essayez de le réfuter
4. **Signaler les biais si observés**

---

## Carte de Référence Rapide

### Points de Contrôle du Temps

| Temps | Vous Devriez Être À |
|-------|---------------------|
| 0:05 | Début de l'exercice de code |
| 0:20 | Candidat implémente ou termine |
| 0:35 | Début conception système ou comportemental |
| 0:50 | Conclusion, transition vers Q&R |
| 0:55 | Questions du candidat |
| 1:00 | Terminé |

### Phrases à Utiliser

| Situation | Dire |
|-----------|------|
| Début | « Prenez un moment pour lire, puis dites-moi quand vous êtes prêt » |
| Encouragement | « Vous êtes sur la bonne voie » |
| Bloqué | « Quel est votre instinct ici ? » |
| Contrôle du temps | « Il nous reste environ 10 minutes pour cette section » |
| Mauvaise piste | « Approche intéressante - que se passe-t-il avec [cas limite] ? » |
| Passer à la suite | « Bon progrès - passons à la section suivante » |
| Fin | « Merci pour votre temps aujourd'hui. Nous reviendrons vers vous bientôt. » |

### Phrases à Éviter

| Éviter | Pourquoi |
|--------|----------|
| « C'est faux » | Décourageant, jugeant |
| « Ça devrait être facile » | Ajoute de la pression |
| « Tout le monde réussit ça » | Rend l'échec plus difficile |
| « Je ne ferais pas comme ça » | Votre façon n'est pas la seule |
| « On manque de temps » | Ajoute de l'anxiété |

---

## Auto-Vérification de l'Évaluateur

### Avant de Noter

- [ ] Est-ce que j'évalue selon la grille, pas contre d'autres candidats ?
- [ ] Est-ce que je me concentre sur les compétences, pas la démographie ou le pedigree ?
- [ ] Ai-je posé les mêmes questions qu'aux autres candidats ?
- [ ] Est-ce que je laisse un moment (bon ou mauvais) colorer toute mon évaluation ?
- [ ] Ai-je documenté les preuves en temps réel ?

### Vérification des Biais

Se demander :
- Noterais-je différemment si le candidat avait une autre apparence/voix ?
- Est-ce que je fais correspondre à « des gens comme moi » ?
- Le nom de leur école/entreprise a-t-il influencé ma perception ?
- Suis-je plus/moins exigeant avec ce candidat ?

---

*Guide v1.0 — À utiliser avec le Canvas d'Entretien Technique et les Matériaux de Problèmes*
