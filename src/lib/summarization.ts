import fetch from 'node-fetch';
interface GroqResponse {
    choices: {
      message: {
        content: string;
      };
    }[];
  }
  export async function generateSummary(transcript: string) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "you are a summerization assistant given text by the user you respond with the summary of that transcript"
          },
          {
            role: "user",
            content: transcript
          }
        ],
        model: "llama-3.2-90b-vision-preview",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });
  
    const result = await response.json() as GroqResponse;
    return result.choices[0].message.content;
  }