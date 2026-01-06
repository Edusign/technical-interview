/**
 * Rate Limiter - Reference Solution
 *
 * ⚠️  INTERVIEWER ONLY - DO NOT SHARE WITH CANDIDATE
 *
 * This file contains multiple valid solutions with analysis.
 * Use this to evaluate candidate approaches, not as the "only right answer."
 */

// ============================================================================
// SOLUTION 1: Sliding Window with Timestamp Array
// ============================================================================
// Approach: Store array of timestamps per user, filter old ones on each request
// Time: O(n) where n = requests in window
// Space: O(users * limit)
// Best for: Simplicity, small limits

interface RateLimiterConfig {
  limit: number;
  windowMs: number;
}

class RateLimiterSlidingWindow {
  private limit: number;
  private windowMs: number;
  private requests: Map<string, number[]>;

  constructor(config: RateLimiterConfig) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
    this.requests = new Map();
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get existing timestamps or empty array
    let timestamps = this.requests.get(userId) || [];

    // Filter to only keep timestamps within the window (cleanup)
    timestamps = timestamps.filter((ts) => ts > windowStart);

    // Check if under limit
    if (timestamps.length < this.limit) {
      timestamps.push(now);
      this.requests.set(userId, timestamps);
      return true;
    }

    // Update even on rejection (cleanup old timestamps)
    this.requests.set(userId, timestamps);
    return false;
  }

  // Bonus: Get remaining quota
  getRemainingQuota(userId: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const timestamps = this.requests.get(userId) || [];
    const validRequests = timestamps.filter((ts) => ts > windowStart);
    return Math.max(0, this.limit - validRequests.length);
  }
}

// ============================================================================
// SOLUTION 2: Sliding Window with Queue (Optimized)
// ============================================================================
// Approach: Use queue structure, only remove from front
// Time: O(k) where k = expired timestamps to remove (amortized O(1))
// Space: O(users * limit)
// Best for: Higher throughput scenarios

class RateLimiterQueue {
  private limit: number;
  private windowMs: number;
  private requests: Map<string, number[]>;

  constructor(config: RateLimiterConfig) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
    this.requests = new Map();
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(userId)) {
      this.requests.set(userId, []);
    }

    const timestamps = this.requests.get(userId)!;

    // Remove expired timestamps from the front (queue-style)
    while (timestamps.length > 0 && timestamps[0] <= windowStart) {
      timestamps.shift();
    }

    if (timestamps.length < this.limit) {
      timestamps.push(now);
      return true;
    }

    return false;
  }
}

// ============================================================================
// SOLUTION 3: Token Bucket Algorithm
// ============================================================================
// Approach: Tokens regenerate over time, each request consumes one
// Time: O(1)
// Space: O(users)
// Best for: Burst handling, smoother rate limiting

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

class RateLimiterTokenBucket {
  private limit: number;
  private windowMs: number;
  private buckets: Map<string, TokenBucket>;

  constructor(config: RateLimiterConfig) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
    this.buckets = new Map();
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();

    let bucket = this.buckets.get(userId);

    if (!bucket) {
      // First request: full bucket
      bucket = { tokens: this.limit, lastRefill: now };
      this.buckets.set(userId, bucket);
    }

    // Calculate tokens to add based on time passed
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = (timePassed / this.windowMs) * this.limit;

    // Refill bucket (cap at limit)
    bucket.tokens = Math.min(this.limit, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    // Check if we have a token
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }

    return false;
  }
}

// ============================================================================
// SOLUTION 4: With Automatic Cleanup (Memory-Conscious)
// ============================================================================
// Approach: Periodic cleanup of inactive users
// Best for: Long-running services with many transient users

class RateLimiterWithCleanup {
  private limit: number;
  private windowMs: number;
  private requests: Map<string, number[]>;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(config: RateLimiterConfig & { cleanupIntervalMs?: number }) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
    this.requests = new Map();

    // Start cleanup interval (default: every minute)
    const cleanupMs = config.cleanupIntervalMs || 60000;
    this.cleanupInterval = setInterval(() => this.cleanup(), cleanupMs);
  }

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let timestamps = this.requests.get(userId) || [];
    timestamps = timestamps.filter((ts) => ts > windowStart);

    if (timestamps.length < this.limit) {
      timestamps.push(now);
      this.requests.set(userId, timestamps);
      return true;
    }

    this.requests.set(userId, timestamps);
    return false;
  }

  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    for (const [userId, timestamps] of this.requests.entries()) {
      const valid = timestamps.filter((ts) => ts > windowStart);
      if (valid.length === 0) {
        this.requests.delete(userId);
      } else {
        this.requests.set(userId, valid);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// ============================================================================
// EVALUATION NOTES
// ============================================================================

/**
 * ACCEPTABLE SOLUTIONS:
 * - Solution 1 or 2: Most candidates will reach this
 * - Clean implementation with proper types
 * - Handles basic edge cases
 *
 * GOOD SOLUTIONS (Mid-Level):
 * - Mentions or implements cleanup
 * - Discusses time complexity
 * - Handles edge cases proactively
 * - Good code organization
 *
 * EXCELLENT SOLUTIONS (Senior):
 * - Discusses multiple algorithms (sliding window vs token bucket)
 * - Mentions distributed considerations
 * - Implements with extensibility in mind
 * - Proactive about memory management
 *
 * COMMON ISSUES TO LOOK FOR:
 *
 * 1. Off-by-one in window boundary:
 *    - `ts > windowStart` vs `ts >= windowStart`
 *    - Usually not critical but shows attention to detail
 *
 * 2. Not filtering on rejection:
 *    - Memory grows unbounded if not cleaned on every call
 *
 * 3. Using `<` instead of `<=` for limit check:
 *    - `timestamps.length < this.limit` is correct
 *    - `timestamps.length <= this.limit` allows one extra request
 *
 * 4. Mutating while iterating:
 *    - Using filter() or while+shift is safer than splice in loop
 *
 * FOLLOW-UP DISCUSSION POINTS:
 *
 * Q: "How would this work across multiple servers?"
 * A: Need shared storage (Redis), or consistent routing (sticky sessions)
 *    - Redis MULTI/EXEC for atomic operations
 *    - Lua scripts for atomic sliding window
 *    - Trade-off: network latency vs accuracy
 *
 * Q: "Sliding window vs token bucket - when to use which?"
 * A: Sliding window:
 *      - Strict limit enforcement
 *      - Better for hard caps (API quotas)
 *    Token bucket:
 *      - Allows controlled bursts
 *      - Smoother traffic (good for rate limiting outgoing requests)
 *      - More memory efficient (O(1) per user vs O(limit) per user)
 *
 * Q: "What about leaky bucket?"
 * A: Processes requests at fixed rate, queues excess
 *    - Good for smoothing traffic
 *    - More complex, requires background processing
 */

// ============================================================================
// TEST CASES
// ============================================================================

function runTests() {
  console.log("=== Testing RateLimiterSlidingWindow ===");
  const limiter1 = new RateLimiterSlidingWindow({ limit: 3, windowMs: 1000 });

  console.log(limiter1.isAllowed("user1")); // true
  console.log(limiter1.isAllowed("user1")); // true
  console.log(limiter1.isAllowed("user1")); // true
  console.log(limiter1.isAllowed("user1")); // false
  console.log(limiter1.isAllowed("user2")); // true
  console.log("Remaining quota:", limiter1.getRemainingQuota("user1")); // 0
  console.log("Remaining quota:", limiter1.getRemainingQuota("user2")); // 2

  console.log("\n=== Testing RateLimiterTokenBucket ===");
  const limiter2 = new RateLimiterTokenBucket({ limit: 3, windowMs: 1000 });

  console.log(limiter2.isAllowed("user1")); // true
  console.log(limiter2.isAllowed("user1")); // true
  console.log(limiter2.isAllowed("user1")); // true
  console.log(limiter2.isAllowed("user1")); // false

  console.log("\n=== Edge Cases ===");
  const limiter3 = new RateLimiterSlidingWindow({ limit: 1, windowMs: 100 });
  console.log("Limit 1:", limiter3.isAllowed("test")); // true
  console.log("Limit 1:", limiter3.isAllowed("test")); // false
}

// Uncomment to run tests
// runTests();

export {
  RateLimiterSlidingWindow,
  RateLimiterQueue,
  RateLimiterTokenBucket,
  RateLimiterWithCleanup,
};
