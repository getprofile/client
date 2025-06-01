# GetProfile Node.js Client

A lightweight TypeScript client for the **GetProfile API** — quickly integrate dynamic personality profiling into your Node.js and TypeScript applications.

---

## ✨ Features

- Submit any raw data (chat logs, bios, activity logs) to update profiles.
- Retrieve structured profiles: interests, personality, mood trends, and more.
- Delete profiles when needed.
- Secure, easy to use, and fully documented.

---

## 🚀 Installation

```bash
npm install getprofile-client
```

---

## 🛠️ Usage

```ts
import { GetProfileClient } from "getprofile-client";

// Create a client instance
const client = new GetProfileClient({
  apiKey: process.env.GETPROFILE_API_KEY!, // Your API key
});

async function run() {
  // 1️⃣ Submit data to update the profile
  await client.submitProfileUpdate(
    "user123",
    "Alex is a photographer who loves hiking and indie music.",
    "bio"
  );

  // 2️⃣ Retrieve the structured profile
  const profile = await client.getProfile("user123");
  console.log("Profile:", profile);

  // 3️⃣ Delete the profile if needed
  // await client.deleteProfile("user123");
}

run().catch(console.error);
```

✅ **Pro Tip:** Use environment variables to store your API key for better security!

---

## 📚 Documentation

- **API Reference:** [https://getprofile-docs.miliukov.dev/api-reference](https://getprofile-docs.miliukov.dev/api-reference)
- **Submit Data Guide:** [https://getprofile-docs.miliukov.dev/builders/submit-data](https://getprofile-docs.miliukov.dev/builders/submit-data)
- **Get Profile Guide:** [https://getprofile-docs.miliukov.dev/builders/get-profile](https://getprofile-docs.miliukov.dev/builders/get-profile)

---

## ⚖️ License

MIT — feel free to use and contribute!

---

Have fun building smarter, more personalized experiences with **GetProfile**! 🚀
