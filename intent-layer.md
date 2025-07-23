# Intent-Layer: A Minimal Protocol for Agent-Readable Websites

**Author:** Lee Manley
**Spec URL:** [https://intent-web.io](https://intent-web.io)
**Repo:** [https://github.com/greenhill32/intent-site](https://github.com/greenhill32/intent-site)
**Version:** Draft 001

---

## 🧭 Purpose

The **Intent Layer** is a lightweight convention for exposing machine-readable intents on websites.
It allows AI agents like ChatGPT, Claude, or Grok to:

* Understand what actions a site supports
* Fetch structured, real-time status
* (Eventually) trigger those actions securely

Inspired by API manifests like `package.json` or `openapi.yaml`, this is a minimal format optimized for read-only crawling.

---

## 🧱 Structure

### agent.json

A flat JSON manifest describing supported actions:

```json
{
  "name": "get_status",
  "method": "GET",
  "endpoint": "/status.json"
}
```

You can also support multiple intents:

```json
[
  { "name": "get_status", "method": "GET", "endpoint": "/status.json" },
  { "name": "book", "method": "POST", "endpoint": "/api/book" }
]
```

### status.json

Structured data that reflects dynamic or real-time state — such as availability, offers, or links:

```json
{
  "available": true,
  "message": "Currently accepting new projects",
  "booking_url": "https://cal.com/lee"
}
```

### Optional: Schema.org Support

Use semantic HTML tags or embedded JSON-LD to enhance AI understanding. For example:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Lee Manley",
  "url": "https://intent-web.io"
}
</script>
```

---

## 🧠 Real-World Use Case: Creator Agent

Imagine an AI that wants to:

1. Visit your site
2. Read `agent.json` to learn you support bookings
3. Fetch `status.json` to check availability
4. Present that to a user

It all works without scraping, parsing, or guesswork.

---

## 🌐 Goal

Let the web become **agent-actionable by default** — with zero backend or complex APIs. If you can host a static file, you can support AI.

This is just the beginning.

---

For updates, follow [@leemanley](https://twitter.com/leemanley) and visit [intent-web.io](https://intent-web.io)
