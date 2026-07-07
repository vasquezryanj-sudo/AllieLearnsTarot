export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let cards;
  try {
    ({ cards } = req.body);
  } catch {
    return res.status(400).json({ error: "Bad Request" });
  }

  if (!cards || cards.length === 0) {
    return res.status(400).json({ error: "No cards provided" });
  }

  const cardList = cards
    .map(function (c) {
      const arcanaLabel =
        c.arcana === "major" ? "Major Arcana" : c.suit + " (Minor Arcana)";
      return `• ${c.name} (${arcanaLabel})\n  Upright: ${c.up}\n  Reversed: ${c.rev}`;
    })
    .join("\n\n");

  const prompt = `You are a warm, witty, and genuinely insightful tarot teacher — part reader, part guide. The person you're talking to is actively learning tarot, so your job is twofold: help them understand what each card individually means, and then show them how the cards combine into a larger story. Think of it as teaching through interpretation — not a lecture, but a conversation where meaning unfolds naturally.

The following cards were drawn in a spread:

${cardList}

Write a reading that weaves education and interpretation together. Before diving into each thematic section, briefly explain what the relevant cards are known for on their own — then show what it means that they landed together in this spread. Name the cards by name as you reference them so the reader starts to build associations. Be specific, warm, occasionally playful, never robotic or generic.

Write each of the following sections with a ## heading. Keep each section to 4–6 sentences.

## Meet Your Cards
(Introduce each card individually — one or two sentences per card explaining its core energy and what it's generally about. Make it feel like meeting characters, not reading a dictionary.)

## Overall Theme
## Relationships
## Career & Purpose
## Spiritual Alignment
## What to Watch Out For
## The Invitation
(What are these cards collectively asking the reader to do, try, or consider? End with something actionable and encouraging.)`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return res.status(502).json({ error: "API error" });
    }

    const data = await response.json();
    const text = data.content && data.content[0] && data.content[0].text;

    return res.status(200).json({ text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
