import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { foodItem } = await request.json(); // Get the food item from the request body
        const apiKey = process.env.NUTRITIONIX_API_KEY; // Ensure your API key is in the environment variables

        if (!apiKey) {
            console.error('NUTRITIONIX_API_KEY is not set.');
            return NextResponse.json({ error: 'NUTRITIONIX_API_KEY is not set.' }, { status: 400 });
        }

        const res = await fetch(`https://api.nutritionix.com/v1_1/search/${foodItem}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Pass your API key and any other required parameters
            // Example: `appId` and `appKey` are optional based on your account setup
            params: {
                appId: process.env.NUTRITIONIX_APP_ID,
                appKey: apiKey,
                fields: 'item_name,nutritional_info', // Specify the fields you want to retrieve
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Error from Nutritionix API:', errorData);
            return NextResponse.json({ error: 'Error fetching data from Nutritionix API.' }, { status: res.status });
        }

        const data = await res.json();
        console.log('Response from Nutritionix API:', data);

        return NextResponse.json(data); // Return the data received from Nutritionix
    } catch (error) {
        console.error('Error in Nutritionix API route:', error);
        return NextResponse.json({ error: 'An error occurred: ' + error.message }, { status: 500 });
    }
}
