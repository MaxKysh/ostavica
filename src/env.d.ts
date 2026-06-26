/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Endpoint that receives reservation leads (Formspree URL or your own webhook). */
  readonly PUBLIC_LEAD_ENDPOINT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
