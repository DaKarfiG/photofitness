import { useState } from 'react';

const BingChat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ text: string; fromBing: boolean }[]>([]);

    const sendMessage = async () => {
        if (!input) return;

        setMessages((prev) => [...prev, { text: input, fromBing: false }]);
        setInput('');

        const response = await fetch('/api/bing-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.text, fromBing: true }]);
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index} style={{ color: msg.fromBing ? 'blue' : 'black' }}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default BingChat;
