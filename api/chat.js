export default async function handler(req, res) {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ai-blue.vercel.app", // TABBATAR URL NAKA NE WANNAN
        "X-Title": "Khamis AI"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3.1:free", 
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    const data = await response.json();
    console.log(data); // Wannan zai taimaka mana ganin kuskure

    if (data.error) {
        // Idan akwai kuskure daga OpenRouter, aiko shi kai tsaye
        return res.status(400).json({ text: `Kuskure: ${data.error.message}` });
    }

    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ text: `Kuskure: ${error.message}` });
  }
}
