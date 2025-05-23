const fetch = require('node-fetch');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

exports.handler = async (event) => {
  const { problem } = JSON.parse(event.body);
  const activities = [
    'Mindful Listening Practice',
    'Perspective Swap',
    'Thought Check',
    'Grounding Breath',
    'Movement Break',
    'Posture Check',
    'Heart-Beat Reflection',
    'Compassion Pause',
    'Unity Reminder'
  ];

  const prompt = `We have a list of activities: ${activities.join(', ')}.\nUser issue: "${problem}".\nWhich single activity best addresses this issue? Respond with the title exactly as in the list.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an assistant that selects the best self-help activity from a list." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  const activityTitle = data.choices[0].message.content.trim();

  return {
    statusCode: 200,
    body: JSON.stringify({ activityTitle })
  };
};
