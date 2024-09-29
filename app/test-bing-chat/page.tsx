// app/test-bing-chat/page.tsx

'use client';

import { useEffect } from 'react';

export default function TestBingChatAPI() {
  useEffect(() => {
    const testAPI = async () => {
      const response = await fetch('/api/bing-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello, Bing!' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        return;
      }

      const data = await response.json();
      console.log('Response from Bing:', data.text);
    };

    testAPI();
  }, []); // Runs once when the component mounts

  return <div>Testing Bing Chat API...</div>;
}