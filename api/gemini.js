export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;
  const GEMINI_KEY = process.env.GEMINI_KEY; // Wannan boye ne

  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'API Key not set' });
  }

  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await geminiRes.json();
    const reply = data.candidates[0].content.parts[0].text;

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}
