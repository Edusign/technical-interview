# Conception Système : Système de Notifications

## Énoncé du Problème (À Donner au Candidat)

Concevez un système de notifications capable d'envoyer des notifications push, des emails et des SMS aux utilisateurs.

```
Exigences :
- Support de plusieurs canaux : push, email, SMS
- Gérer des millions de notifications par jour
- Les utilisateurs peuvent configurer leurs préférences de notification
- Livraison quasi temps réel pour les notifications critiques
- Livraison fiable (ne pas perdre de notifications)
```

---

## Guide de l'Évaluateur

### Ce Que Cet Exercice Teste

| Dimension | Quoi Chercher |
|-----------|---------------|
| Cadrage | Pose des questions sur l'échelle, les priorités, les cas limites |
| Architecture | Identifie les composants clés, le flux de données |
| Compromis | Discute des alternatives, explique les choix |
| Profondeur | Peut approfondir des domaines spécifiques |
| Communication | Explique son raisonnement, utilise des schémas |

### Comment Présenter (Script)

> « Je voudrais que vous conceviez un système de notifications - pensez à quelque chose comme ce qui alimente les notifications d'une grande application comme Facebook ou Uber. »
>
> « Le système doit supporter les notifications push, email et SMS. On vise des millions de notifications par jour. »
>
> « Commençons par vos questions de clarification, puis on travaillera sur la conception ensemble. »

### Phase de Cadrage (5-10 min)

**Questions de Clarification Attendues (Bon Signe) :**

| Question | Réponse Suggérée |
|----------|------------------|
| « Quelle est l'échelle - DAU, notifications/jour ? » | « 10M DAU, 100M notifications/jour » |
| « Quelle est l'exigence de latence ? » | « Critique : <1 min, Normal : <5 min, Batch : heures OK » |
| « Les utilisateurs ont-ils besoin de confirmation de livraison ? » | « Oui, on doit suivre le statut de livraison » |
| « Qu'en est-il des préférences de notification ? » | « Les utilisateurs peuvent se désabonner par canal et catégorie » |
| « Doit-il supporter les templates ? » | « Oui, bien vu - messages avec templates » |
| « Rate limiting par utilisateur ? » | « Oui, ne pas spammer les utilisateurs » |
| « Niveaux de priorité ? » | « Haute (transactionnel), Moyenne (engagement), Basse (marketing) » |

**Questions Signal d'Alerte :**
- Sauter directement au schéma de base de données
- Demander des technologies spécifiques avant de comprendre les exigences
- Pas de questions du tout

### Phase de Conception Haut Niveau (15-20 min)

**Composants Attendus :**

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SYSTÈME DE NOTIFICATIONS                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────┐     ┌──────────────┐     ┌─────────────────────────┐ │
│  │  API     │────▶│ Service de   │────▶│   File de Messages      │ │
│  │  Gateway │     │ Notification │     │   (Kafka/SQS)           │ │
│  └──────────┘     └──────────────┘     └───────────┬─────────────┘ │
│                          │                         │               │
│                          ▼                         ▼               │
│                   ┌──────────────┐     ┌─────────────────────────┐ │
│                   │  Cache des   │     │    Workers par Canal    │ │
│                   │  Préférences │     │  ┌─────┬─────┬─────┐    │ │
│                   └──────────────┘     │  │Push │Email│ SMS │    │ │
│                                        │  └──┬──┴──┬──┴──┬──┘    │ │
│                                        └─────┼─────┼─────┼───────┘ │
│                                              ▼     ▼     ▼         │
│                                        ┌─────────────────────────┐ │
│                                        │   Fournisseurs Externes │ │
│                                        │   (FCM, SendGrid, etc)  │ │
│                                        └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Composants Clés à Discuter :**

| Composant | Objectif | Quoi Sonder |
|-----------|----------|-------------|
| API Gateway | Rate limiting, auth, routage | « Comment prévenez-vous les abus ? » |
| Service de Notification | Validation, fan-out, vérification des préférences | « Que se passe-t-il avant la mise en queue ? » |
| File de Messages | Découplage, buffer, fiabilité | « Pourquoi une queue ? Que se passe-t-il si elle est pleine ? » |
| Workers par Canal | Logique spécifique au canal, réessais | « Comment les workers scalent-ils ? » |
| Préférences Utilisateur | Désinscriptions, préférences de canal | « Où est-ce stocké ? Comment est-ce mis en cache ? » |
| Suivi de Livraison | Mises à jour de statut, analytics | « Comment savez-vous si la livraison a réussi ? » |

### Grille d'Évaluation

| Dimension | 1 (Insuffisant) | 2 (En développement) | 3 (Solide) | 4 (Exceptionnel) |
|-----------|-----------------|----------------------|------------|------------------|
| **Cadrage** | Pas de questions, plonge dedans | Peu de questions | Bon recueil des exigences | Mène la conversation, découvre des exigences cachées |
| **Conception Haut Niveau** | Composants majeurs manquants | Flux basique, lacunes | Flux complet, tous composants | Conception élégante, considère des alternatives |
| **Compromis** | Pas de discussion | Mentionne des compromis quand on demande | Discute proactivement des compromis | Analyse approfondie, quantifie les compromis |
| **Approfondissements** | Ne peut pas approfondir | Profondeur superficielle | Bonne profondeur dans 1-2 domaines | Profondeur d'expert, insights originaux |
| **Communication** | Pas clair, pas de schémas | Explications basiques | Clair, utilise des schémas | Clarté exceptionnelle, s'adapte au feedback |

### Sujets d'Approfondissement

Choisir 1-2 selon les forces du candidat et le temps restant.

#### Approfondissement 1 : Conception de la File de Messages

**Questions de Sondage :**
- « Pourquoi Kafka vs SQS vs RabbitMQ ? »
- « Comment gérez-vous l'ordre des messages ? »
- « Que se passe-t-il si un worker crash en plein traitement ? »
- « Comment gérez-vous les messages en double ? »

**Attendu (Mid) :**
- Connaît la sémantique basique des queues
- Comprend la livraison at-least-once
- Peut discuter du partitionnement

**Attendu (Senior) :**
- Compare les technologies de queue avec leurs compromis
- Discute des défis du exactly-once
- Connaît les dead letter queues
- Peut concevoir des consommateurs idempotents

#### Approfondissement 2 : Garanties de Livraison

**Questions de Sondage :**
- « Comment vous assurez-vous qu'une notification n'est pas perdue ? »
- « Quelle est votre stratégie de réessai ? »
- « Comment gérez-vous les pannes de fournisseur ? »
- « Qu'en est-il des rate limits des fournisseurs ? »

**Attendu (Mid) :**
- Réessai basique avec backoff
- Comprend le besoin de persistance
- Connaît les acquittements

**Attendu (Senior) :**
- Pattern circuit breaker
- Backoff exponentiel avec jitter
- Dead letter queue pour les messages échoués
- Stratégie de failover de fournisseur
- Clés d'idempotence

#### Approfondissement 3 : Échelle et Performance

**Questions de Sondage :**
- « Comment cela gère 100M de notifications/jour ? »
- « Quels sont les goulots d'étranglement ? »
- « Comment gérez-vous un événement viral (pic 10x) ? »
- « Comment priorisez-vous les notifications critiques ? »

**Attendu (Mid) :**
- Scaling horizontal des workers
- Cache pour les préférences
- Queues de priorité basiques

**Attendu (Senior) :**
- Stratégie de partitionnement pour les queues
- Auto-scaling basé sur la profondeur de queue
- Queues séparées par priorité
- Rate limiting pour protéger les fournisseurs
- Gestion de la backpressure

#### Approfondissement 4 : Modèle de Données

**Questions de Sondage :**
- « À quoi ressemble l'enregistrement de notification ? »
- « Comment stockez-vous le statut de livraison ? »
- « Comment interrogez-vous pour l'analytics ? »

**Discussion du Schéma Exemple :**

```typescript
// Enregistrement de notification
interface Notification {
  id: string;
  userId: string;
  type: 'push' | 'email' | 'sms';
  priority: 'high' | 'medium' | 'low';
  templateId: string;
  payload: Record<string, any>;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  createdAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  errorMessage?: string;
  retryCount: number;
}

// Préférences utilisateur
interface UserPreferences {
  userId: string;
  channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  categories: {
    marketing: boolean;
    transactional: boolean;
    social: boolean;
  };
  quietHours?: {
    start: string; // "22:00"
    end: string;   // "08:00"
    timezone: string;
  };
}
```

### Questions de Sondage (Du Canvas)

Utiliser tout au long de l'entretien :

- [ ] « Quels sont les goulots d'étranglement ? »
- [ ] « Comment cela scale à 10x ? »
- [ ] « Que se passe-t-il si [composant] tombe en panne ? »
- [ ] « Que changeriez-vous si [nouvelle exigence] ? »
- [ ] « Pourquoi cette approche plutôt que [alternative] ? »

### Scénarios de Suivi Courants

**Scénario 1 : Prévention du Spam Utilisateur**
> « Un utilisateur reçoit 50 notifications en 1 minute. Comment gérez-vous cela ? »

Chercher :
- Rate limiting par utilisateur
- Agrégation/regroupement de notifications
- Throttling basé sur la priorité
- Préférence utilisateur pour le mode digest

**Scénario 2 : Panne de Fournisseur**
> « SendGrid est en panne. Que se passe-t-il ? »

Chercher :
- Health checks et circuit breakers
- Fournisseurs de fallback
- Gestion du backlog de queue
- Communication aux utilisateurs sur les délais

**Scénario 3 : Nouveau Canal**
> « On doit ajouter les notifications Slack. C'est compliqué ? »

Chercher :
- Discussion sur l'abstraction des workers
- Pattern plugin/adapter
- Configuration vs changements de code
- Stratégie de test

### Ce Qui Différencie les Niveaux

| Aspect | Mid-Level | Senior |
|--------|-----------|--------|
| Cadrage | Répond bien aux questions | Mène le cadrage, trouve les cas limites |
| Architecture | Composants corrects | Élégante, considère des alternatives |
| Compromis | Identifie quand on demande | Analyse proactivement |
| Modes de défaillance | Réessai basique | Circuit breakers, DLQ, failover |
| Échelle | « Ajouter plus de serveurs » | Stratégies spécifiques, analyse des goulots |
| Modèle de données | Fonctionnel | Optimisé pour les patterns d'accès |

### Découpage du Temps (45-60 min)

| Phase | Durée | Focus |
|-------|-------|-------|
| Cadrage | 5-10 min | Exigences, contraintes, échelle |
| Conception Haut Niveau | 15-20 min | Composants, flux de données, APIs |
| Approfondissements | 15-20 min | Choisir 1-2 domaines selon le niveau |
| Suivi | 5-10 min | Scénarios, cas limites |

---

## Signaux d'Alerte

- [ ] Ne peut pas dessiner une architecture cohérente
- [ ] Pas de considération pour les pannes
- [ ] « Il suffit d'utiliser [technologie] » sans expliquer pourquoi
- [ ] Ne peut approfondir aucun sujet
- [ ] Défensif sur les choix de conception
- [ ] Ignore les exigences d'échelle

## Signaux Positifs

- [ ] Pose des questions de clarification réfléchies
- [ ] Dessine des schémas clairs
- [ ] Discute des compromis proactivement
- [ ] Considère les modes de défaillance
- [ ] Peut approfondir quand on sonde
- [ ] Adapte la conception selon le feedback
- [ ] Mentionne le monitoring/observabilité
- [ ] Considère les préoccupations opérationnelles

---

## Référence : Technologies Qu'ils Pourraient Mentionner

| Catégorie | Options | Notes |
|-----------|---------|-------|
| File de Messages | Kafka, SQS, RabbitMQ, Redis Streams | Chacun a ses compromis |
| Notifications Push | FCM, APNs, OneSignal | FCM/APNs sont les fournisseurs |
| Email | SendGrid, SES, Mailgun | Différents modèles de prix |
| SMS | Twilio, SNS, MessageBird | Twilio le plus courant |
| Cache | Redis, Memcached | Pour les préférences utilisateur |
| Base de Données | PostgreSQL, DynamoDB, Cassandra | Dépend des patterns d'accès |
| Monitoring | Datadog, CloudWatch, Prometheus | Important pour les opérations |

## Référence : Chiffres pour Estimation Rapide

| Métrique | Valeur |
|----------|--------|
| Notifications/jour | 100M |
| QPS au pic | ~3 000 (en supposant 3x la moyenne) |
| Taille moyenne d'une notification | ~1KB |
| Temps de livraison push (FCM) | ~100-500ms |
| Temps de livraison email | ~1-5s |
| Temps de livraison SMS | ~1-3s |

---

## Attentes pour le Tableau Blanc/Schéma

Le candidat devrait dessiner :
1. Schéma de composants haut niveau
2. Flux de données pour une notification
3. Optionnellement : Diagramme de séquence pour la livraison

**Caractéristiques d'un Bon Schéma :**
- Limites claires entre composants
- Flèches étiquetées montrant le flux de données
- Bases de données/queues clairement marquées
- Services externes identifiés

**Caractéristiques d'un Mauvais Schéma :**
- Brouillon, difficile à suivre
- Composants clés manquants
- Pas d'étiquettes
- Ne correspond pas à l'explication verbale
