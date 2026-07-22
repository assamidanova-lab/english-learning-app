export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to call OpenAI' });
  }
}
