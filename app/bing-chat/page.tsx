'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BingChatPage() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = async () => {
        const res = await fetch('/api/bing-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!res.ok) {
            console.error('Error:', await res.json());
            return;
        }

        const data = await res.json();
        setResponse(data.text);
    };

    return (
        <div>
            <h1>Your personal diet coach!</h1>
            <Input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type your message" 
            />
            <Button onClick={handleSend}>Send</Button>
            <div>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
}
