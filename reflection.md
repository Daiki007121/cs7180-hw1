# What Makes a Great Prompt?

Through three coding challenges, I learned that great prompts are specific, structured, and example-driven. The difference between "create an email validator" and a production-ready validator came down to prompt precision.

## Specificity Over Vagueness

My first prompts were generic: "validate emails" or "build a cache." These generated basic code that missed edge cases. When I added concrete examples—"handle user+tag@example.com" instead of "special formats"—the AI immediately understood. For the cache, specifying "evict oldest when full, track lastAccess timestamp" was clearer than "implement LRU."

The pattern: every vague word became a specific example in V3. "Edge cases" became "consecutive dots should fail." "Good performance" became "O(1) operations." Numbers eliminated ambiguity.

## Structure Reduces Iteration

V1 prompts were unstructured requests. V3 prompts followed a template:
- **What to build:** "TypeScript Cache class"
- **API:** "set(key, value, ttl?), get(key), has(key)"
- **Behavior:** "Auto-expire on access, evict LRU when full"
- **Config:** "maxSize (default 100), defaultTTL (60s)"

This structure meant one generation instead of three iterations. The React table prompt specified exact props (data, columns), exact features (sort on click, filter all columns), and exact UI (Prev/Next buttons). No back-and-forth needed.

## Examples as Anchors

Abstract requirements confused the AI. "Support plus addressing" was meaningless until I wrote "user+tag@domain.com should pass." For the table, "sortable columns" became "click header once for ascending, twice for descending." Concrete examples acted as test cases built into the prompt.

The email validator jumped from 60% to 95% coverage when I listed specific invalid cases: "user..name@example.com should fail, user@example (no TLD) should fail, 255+ char emails should fail."

## The Right Level of Detail

Too little detail: "create a cache" → basic Map wrapper
Too much detail: specifying implementation → inflexible code
Just right: API + behavior + constraints

For the cache, I specified *what* (TTL, LRU, max size) but not *how* (Map vs object, specific data structures). This gave the AI creative freedom while ensuring requirements were met.

## Incremental Refinement Works

V1 → V2 → V3 wasn't wasted effort—it taught me what matters:
- V1 revealed missing requirements
- V2 showed where I needed examples
- V3 combined all lessons

But the real insight: if I'd started with V3 thinking, V1 would've been production-ready. The iteration taught me prompt construction, not code improvement.

## Practical Impact

Before: "Write a validator" → 30 minutes debugging edge cases
After: "TypeScript validator: regex RFC 5322, handles user+tag@domain.com and subdomains, rejects consecutive dots and missing TLDs, max 254 chars" → 5 minutes

The 10-minute prompt investment saved 25 minutes of fixing. For the table and cache, similar patterns: detailed prompts generated better code faster than vague prompts + debugging.

## Reusable Template

My final template:
```
Create [Language] [Type]:
- API: [method signatures]
- Behavior: [specific rules with examples]
- Config: [parameters with defaults]
```

This works for any technical task. The key: treat the prompt like a spec document, not a casual request.

**Conclusion:** Great prompts are precise specifications with concrete examples. They're worth the upfront investment because they eliminate iteration. The lesson isn't "write better prompts for AI"—it's "think more clearly about requirements."

*Word count: 500*
