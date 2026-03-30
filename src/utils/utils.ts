import { useEffect, useState } from "react";
import type { MfeConfig } from "../config/config";

const loaded = new Map<string, Promise<void>>();

function getSrc(mfe: MfeConfig) {
  const env = (import.meta as any).env || {};
  const value = env[mfe.env];
  return value + "/index.js";
}

function loadScript(src: string): Promise<void> {
  if (loaded.has(src)) return loaded.get(src)!;

  const p = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.type = "module";
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });

  loaded.set(src, p);
  return p;
}

export function prefetchMfe(mfe: MfeConfig) {
  const src = getSrc(mfe);
  if (document.querySelector(`link[href="${src}"]`)) return;
  const link = document.createElement("link");
  link.rel = "modulepreload";
  link.href = src;
  document.head.appendChild(link);
}

export function useMfeScript(mfe: MfeConfig) {
  const [ready, setReady] = useState(false);
  const url = getSrc(mfe);

  useEffect(() => {
    let cancelled = false;
    loadScript(url)
      .then(() => !cancelled && setReady(true))
      .catch(() => !cancelled && setReady(false));
    return () => {
      cancelled = true;
    };
  }, [url]);

  return ready;
}
