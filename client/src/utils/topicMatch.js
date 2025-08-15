// src/utils/topicMatch.js
import { RESOURCES } from "../data/resourcesMap";

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const matchTopic = (query) => {
  const q = norm(query);
  if (!q) return { key: null, score: 0 };

  let best = { key: null, score: 0 };

  Object.keys(RESOURCES).forEach((key) => {
    const base = norm(key);
    const keywords = (RESOURCES[key].keywords || []).map(norm);
    let score = 0;

    // direct inclusion boost
    if (q.includes(base) || base.includes(q)) score += 3;

    // keyword overlaps
    for (const k of keywords) {
      if (!k) continue;
      if (q.includes(k) || k.includes(q)) score += 2;
    }

    // token overlap
    const qTokens = new Set(q.split(" "));
    const keyTokens = new Set((base + " " + keywords.join(" ")).split(" "));
    let overlap = 0;
    qTokens.forEach((t) => keyTokens.has(t) && overlap++);

    score += overlap * 1.2;

    if (score > best.score) best = { key, score };
  });

  return best;
};
