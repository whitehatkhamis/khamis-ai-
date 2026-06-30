export default async function handler(req, res) {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "llama-3.3-70b-versatile", // Wannan Mafi Karfi Kyauta
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
        return res.status(400).json({ text: `Kuskure: ${data.error.message}` });
    }

    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ text: `Kuskure: ${error.message}` });
  }
}
