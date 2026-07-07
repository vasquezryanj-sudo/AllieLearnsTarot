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

  const prompt = `You are a warm, witty, and genuinely insightful tarot reader — think a wise friend who knows their stuff, not a fortune-teller doing a bit. The following cards were drawn in a spread:

${cardList}

Write a reading for this spread. Use the card meanings as a jumping-off point, but focus on how the cards speak to each other — what the combination unlocks, the tensions and harmonies between them. Be specific to these actual cards, not generic. Be warm, human, occasionally playful, never robotic.

Write each of the following sections with a ## heading. Keep each section to 3–5 sentences.

## Overall Theme
## Relationships
## Career & Purpose
## Spiritual Alignment
## What to Watch Out For
## The Invitation`;

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
        max_tokens: 1400,
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
