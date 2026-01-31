# Prompt Template

Use this for any coding task:

```
Create [LANGUAGE] [TYPE] that:

API:
- [method1(params)]: [what it does]
- [method2(params)]: [what it does]

Behavior:
- [Feature 1]: [specific example, e.g., "user+tag@example.com should pass"]
- [Feature 2]: [edge case, e.g., "consecutive dots should fail"]
- [Feature 3]: [constraint, e.g., "max 254 characters"]

Config/Props:
- [param1]: [type] (default: [value])
- [param2]: [type] (default: [value])
```

## Example: Email Validator

```
Create TypeScript function that:

API:
- validateEmail(email: string): boolean

Behavior:
- Valid: user@example.com, user+tag@domain.com, user@mail.example.com
- Invalid: no @, no TLD (user@example), consecutive dots (user..name@example.com)
- Length: max 254 chars total, max 64 before @

Config:
- None (pure function)
```

## Example: Cache

```
Create TypeScript Cache class that:

API:
- set(key: string, value: any, ttl?: number): void
- get(key: string): any | undefined
- has(key: string): boolean
- delete(key: string): boolean
- clear(): void

Behavior:
- TTL: Expire entries after ttl milliseconds, auto-remove on access
- LRU: Track lastAccess, evict oldest when size >= maxSize
- Example: set('x', 1, 1000) then get after 1.5s returns undefined

Config:
- maxSize: number (default: 100)
- defaultTTL: number (default: 60000)
```

## Tips

1. **Be specific:** "handle edge cases" → "user+tag@domain.com should pass"
2. **Use numbers:** "some tests" → "test 3 valid, 3 invalid cases"
3. **Show examples:** Don't say "special formats", say "user+tag@example.com"
4. **Define API:** List all methods with signatures
5. **State constraints:** "max 254 chars" not "reasonable length"

**Time saved:** 10min prompt vs 30min debugging
