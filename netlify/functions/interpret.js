exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let cards;
  try {
    ({ cards } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: "Bad Request" };
  }

  if (!cards || cards.length === 0) {
    return { statusCode: 400, body: "No cards provided" };
  }

  const cardList = cards
    .map(function (c) {
      const arcanaLabel = c.arcana === "major" ? "Major Arcana" : c.suit + " (Minor Arcana)";
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
      return { statusCode: 502, body: "API error" };
    }

    const data = await response.json();
    const text = data.content && data.content[0] && data.content[0].text;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
