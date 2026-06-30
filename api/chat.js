export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY ba a saka ba" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://khamis-ai-blue.vercel.app", // SAKE SAUNA URL NAKA NAN
        "X-Title": "Khamis AI"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free", // Wannan KYAUTA
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }

    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
