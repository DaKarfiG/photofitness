import { NextResponse } from 'next/server';
import { BingChat } from 'bing-chat';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const cookie = process.env.BING_COOKIE;

        if (!cookie) {
            console.error('BING_COOKIE is not set.');
            return NextResponse.json({ error: "BING_COOKIE is not set." }, { status: 400 });
        }

        const api = new BingChat({ cookie });
        const res = await api.sendMessage(message);
        console.log('Response from Bing Chat:', res);

        return NextResponse.json({ text: res.text });
    } catch (error) {
        console.error('Error sending message to Bing:', error);
        return NextResponse.json({ error: "An error occurred: " + error.message }, { status: 500 });
    }
}
