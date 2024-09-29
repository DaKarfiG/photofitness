import { NextResponse } from 'next/server';
import { BingChat } from 'bing-chat';

export async function POST(request: Request) {
    const { message } = await request.json();
    const cookie = process.env.BING_COOKIE; // Get the cookie from environment variables

    if (!cookie) {
        return NextResponse.json({ error: 'BING_COOKIE is not defined' }, { status: 400 });
    }

    const api = new BingChat({ cookie });
    const res = await api.sendMessage(message);

    return NextResponse.json({ text: res.text });
}