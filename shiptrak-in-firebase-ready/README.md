# ShipTrak India — Firebase-ready scaffold


Generated at: 2025-11-02T19:25:10.748406Z

Files included:
- firestore.rules
- data/ (shipments_seed.json, users_seed.json)
- scripts/seed-firestore.ts (reads service account from file or env)
- config/.env.example (placeholders for web SDK)
- instructions.txt (how to inject real credentials safely)

DO NOT commit your `serviceAccountKey.json` to Git. Use environment variables or CI secrets.
