import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: error.response?.data || 'Error fetching response from ChatGPT' }, { status: 500 });
  }
}
