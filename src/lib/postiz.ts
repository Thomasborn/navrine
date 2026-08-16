export type PostizIntegration = {
  id: string;
  name?: string;
  providerIdentifier?: string;
  provider?: string;
  picture?: string;
  disabled?: boolean;
  [key: string]: unknown;
};

export type NavrinePost = {
  integrationId: string;
  content: string;
  date: string;
  mode?: "draft" | "schedule" | "now";
  settings?: Record<string, unknown>;
  images?: Array<{ id: string; path: string }>;
};

const baseUrl = (process.env.POSTIZ_API_URL || "https://api.postiz.com").replace(/\/$/, "");

function getApiKey() {
  const key = process.env.POSTIZ_API_KEY;
  if (!key) throw new Error("POSTIZ_API_KEY is not configured");
  return key;
}

async function postizFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: getApiKey(),
      ...(init?.headers || {}),
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(body?.message || body?.error || `Postiz API error ${response.status}`);
  }

  return body as T;
}

export async function getPostizIntegrations() {
  return postizFetch<PostizIntegration[]>("/public/v1/integrations");
}

export async function createPostizPost(input: NavrinePost) {
  const value: Array<Record<string, unknown>> = [
    {
      content: input.content,
      image: input.images || [],
    },
  ];

  return postizFetch("/public/v1/posts", {
    method: "POST",
    body: JSON.stringify({
      type: input.mode || "schedule",
      shortLink: false,
      date: input.date,
      tags: [],
      posts: [
        {
          integration: { id: input.integrationId },
          value,
          settings: input.settings || {},
        },
      ],
    }),
  });
}

export async function getPostizPosts(params?: { startDate?: string; endDate?: string }) {
  const qs = new URLSearchParams();
  if (params?.startDate) qs.set("startDate", params.startDate);
  if (params?.endDate) qs.set("endDate", params.endDate);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return postizFetch<unknown[]>(`/public/v1/posts${suffix}`);
}
