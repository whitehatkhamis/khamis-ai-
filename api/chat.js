export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://khamis-ai-blue.vercel.app", 
        "X-Title": "Khamis AI"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3.1:free", // <-- GYARA NAN KAWAI
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    const data = await response.json();
    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
