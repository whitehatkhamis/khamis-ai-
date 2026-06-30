export default async function handler(req, res) {
  try {
    const { prompt, image } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    const userContent = [{ type: "text", text: prompt || "What is in this image? Be detailed." }];
    if (image) {
      userContent.push({ type: "image_url", image_url: { url: image } });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
          { "role": "system", "content": "You are Khamis AI. A friendly AI assistant created by WhiteHat Khamis. Always introduce yourself as Khamis AI if someone asks for your name. You speak Hausa and English fluently. If user uploads an image, describe it clearly." },
          { "role": "user", "content": userContent }
        ]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ text: `Error: ${data.error.message}` });
    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ text: `Error: ${error.message}` });
  }
}
