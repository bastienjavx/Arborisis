export interface Env {
  ANALYZER_URL: string;
  ANALYZER_SECRET: string;
  LARAVEL_API_URL?: string;
  LARAVEL_API_SECRET?: string;
}

interface R2EventBody {
  object?: {
    key?: string;
  };
}

const AUDIO_EXTENSIONS = new Set([
  "wav", "mp3", "flac", "ogg", "m4a", "aac", "wma", "webm",
]);

function isAudioFile(key: string): boolean {
  const ext = key.split(".").pop()?.toLowerCase();
  return ext !== undefined && AUDIO_EXTENSIONS.has(ext);
}

function extractSoundId(key: string): string | null {
  const parts = key.split("/");
  // Expected: sounds/original/{sound_id}/{filename}
  if (parts.length < 4) return null;
  const soundId = parts[2];
  if (!soundId || !/[\w-]+/.test(soundId)) return null;
  return soundId;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Simple healthcheck endpoint
    if (request.method === "GET" && new URL(request.url).pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  },

  async queue(batch: MessageBatch<R2EventBody>, env: Env, ctx: ExecutionContext): Promise<void> {
    for (const message of batch.messages) {
      const body = message.body;
      const objectKey = body.object?.key;

      if (!objectKey || !objectKey.startsWith("sounds/original/")) {
        message.ack();
        continue;
      }

      if (!isAudioFile(objectKey)) {
        message.ack();
        continue;
      }

      const soundId = extractSoundId(objectKey);
      if (!soundId) {
        message.ack();
        continue;
      }

      try {
        const res = await fetch(`${env.ANALYZER_URL}/analyze`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.ANALYZER_SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sound_id: soundId,
            original_r2_key: objectKey,
            force: false,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error(`[Worker] Analyzer error ${res.status}: ${text}`);
          message.retry();
          continue;
        }

        message.ack();
      } catch (err) {
        console.error(`[Worker] Network error calling analyzer: ${err}`);
        message.retry();
      }
    }
  },
};
