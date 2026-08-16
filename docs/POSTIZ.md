# Navrine + Postiz

Navrine uses Postiz as an external publishing engine. Navrine owns content strategy, generation, review, and UX; Postiz owns social account connections, scheduling, publishing, retries, and provider-specific delivery.

## 1. Run or use Postiz

Use either Postiz Cloud or a self-hosted Postiz instance. For self-hosting, follow the upstream Postiz documentation and configure PostgreSQL, Redis, JWT, frontend/backend URLs, storage, and the social providers you want to connect.

Upstream repository: `gitroomhq/postiz-app`

## 2. Create a Postiz API key

Create an API token in Postiz and allow-list the public IP address of the Navrine server if required by your Postiz configuration.

## 3. Configure Navrine

Copy `.env.example` to `.env.local` and set:

```env
POSTIZ_API_URL=https://api.postiz.com
POSTIZ_API_KEY=your-real-api-key
```

For self-hosted Postiz, replace `POSTIZ_API_URL` with your backend API base URL.

Never expose `POSTIZ_API_KEY` with a `NEXT_PUBLIC_` prefix.

## 4. Navrine server endpoints

### Connected channels

```http
GET /api/content/channels
```

This proxies Postiz `GET /public/v1/integrations`.

### Planned/scheduled posts

```http
GET /api/content/posts
GET /api/content/posts?startDate=2026-08-01T00:00:00.000Z&endDate=2026-09-01T00:00:00.000Z
```

### Create a draft or scheduled post

```http
POST /api/content/posts
Content-Type: application/json
```

Example:

```json
{
  "integrationId": "your-postiz-integration-id",
  "content": "Navrine generated this post.",
  "date": "2026-08-17T09:00:00.000Z",
  "mode": "schedule",
  "settings": {}
}
```

`mode` accepts `draft`, `schedule`, or `now`.

For provider-specific publishing, pass Postiz provider settings in the `settings` object. Examples include Instagram story/post type, LinkedIn carousel settings, YouTube metadata, TikTok privacy/direct-post settings, and X reply controls.

## 5. Recommended Navrine flow

```text
Brand Brain
  -> Content Idea
  -> AI Draft
  -> Human/AI Review
  -> Channel Adaptation
  -> /api/content/posts
  -> Postiz
  -> Social Network
  -> Analytics / Learning Loop
```

## Architecture decision

Do not embed the full Postiz monorepo inside Navrine. Postiz requires its own backend/orchestrator infrastructure and has a separate release lifecycle. Keeping it behind its public API makes Navrine much easier to maintain and lets Postiz handle provider integrations independently.

## License note

Postiz and its Node SDK are AGPL-3.0. Keep the publishing service boundary explicit and review AGPL obligations before distributing or operating modified Postiz code as part of a commercial network service.
