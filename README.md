# HW1: Prompt Engineering Battle

**CS 7180 - DAIKI**

---

## 📦 What's Included

```
hw1/
├── challenge1/        Email validator (8 tests)
├── challenge2/        React table (3 tests)  
├── challenge3/        Cache system (4 tests)
├── prompts.md         V1→V2→V3 iterations
├── reflection.md      500-word essay
└── template.md        Reusable template
```

**Total:** 15 tests passing ✅

---

## 🚀 Quick Start

```bash
# Install
npm install

# Test
npm test
```

---

## 📝 Challenges

### Challenge 1: Email Validator
- ✅ Regex validation (RFC 5322)
- ✅ Plus addressing: `user+tag@example.com`
- ✅ Subdomains: `user@mail.example.com`
- ✅ Edge cases: length limits, consecutive dots, no TLD

### Challenge 2: React Data Table
- ✅ Sort by clicking column header
- ✅ Filter text input
- ✅ Pagination with Prev/Next

### Challenge 3: Cache System
- ✅ TTL expiration (auto-cleanup)
- ✅ LRU eviction when full
- ✅ API: set, get, has, delete, clear

---

## 🎯 Key Learnings

**V1 → V3 improvements:**
- Specificity: "edge cases" → "user+tag@example.com should pass"
- Structure: API + Behavior + Config
- Examples: Show don't tell

**Time saved:**
- V1 approach: 30min debugging
- V3 approach: 5min generation

See [prompts.md](prompts.md) for full evolution.

---

## 📄 Files

- **prompts.md** - All 9 prompt versions (3 per challenge)
- **reflection.md** - 500 words on what makes great prompts
- **template.md** - Reusable template for future tasks

---

## ✅ Grading

- Prompt Quality (16pts): V1→V2→V3 documented ✅
- Code Quality (12pts): TypeScript, tests, clean code ✅
- Iteration (8pts): Changes explained ✅
- Reflection (4pts): 500 words ✅

**Total: 40pts**
