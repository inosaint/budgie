/**
 * Netlify Function: Generate Travel Itinerary using Claude API
 *
 * This serverless function securely calls the Claude API to generate
 * detailed travel itineraries based on user input.
 *
 * Note: Uses Node 18+ built-in fetch API (no dependencies needed)
 */

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { source, destination, duration, budget, travelers, dates, flights, accommodation, meals, activities, total, perPerson } = JSON.parse(event.body);

    // Validate required fields
    if (!source || !destination || !duration) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: source, destination, duration' })
      };
    }

    // Get Claude API key from environment variable
    const CLAUDE_API_KEY = process.env.budgie;
    if (!CLAUDE_API_KEY) {
      console.error('budgie environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Construct the prompt for Claude
    const prompt = `You are a professional travel planner. Generate a detailed ${duration}-day travel itinerary from ${source} to ${destination}.

Trip Details:
- Duration: ${duration} days
- Travelers: ${travelers} person(s)
- Budget tier: ${budget}
- Travel dates: ${dates}
- Total budget: ${total}
- Budget breakdown:
  * Flights: ${flights}
  * Accommodation: ${accommodation}
  * Meals: ${meals}
  * Local expenses: ${activities}
  * Per person: ${perPerson}

Please create a realistic, practical itinerary that:
1. Includes flights, accommodation check-ins/check-outs, sightseeing, activities, and meals
2. Considers the budget tier (${budget}) when recommending hotels, restaurants, and activities
3. Provides practical tips like booking advice, estimated costs, timing recommendations, and insider tips
4. Uses appropriate icons: ✈️ for flights/transport, 🏨 for accommodation/meals, ⭐ for sightseeing/activities
5. Is optimized for ${travelers} traveler(s)

CRITICAL: You must return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. The response must be pure JSON that can be parsed directly.

Return the itinerary in this EXACT JSON structure:
{
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "icon": "✈️",
          "description": "Brief activity description",
          "notes": "Practical tips, booking advice, costs, timing"
        }
      ]
    }
  ]
}

Day 1 should include the departure flight from ${source}.
The last day (Day ${duration}) should include the return flight to ${source}.
All other days should include a mix of activities, sightseeing, meals, and accommodation appropriate for ${destination}.

Remember: Return ONLY the JSON object, no other text.`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to generate itinerary', details: errorText })
      };
    }

    const data = await response.json();

    // Extract the itinerary from Claude's response
    const claudeResponse = data.content[0].text;

    // Try to parse the response as JSON
    let itinerary;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = claudeResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, claudeResponse];
      const jsonText = jsonMatch[1].trim();
      itinerary = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', claudeResponse);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to parse itinerary response',
          rawResponse: claudeResponse
        })
      };
    }

    // Validate the structure
    if (!itinerary.days || !Array.isArray(itinerary.days)) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Invalid itinerary structure',
          itinerary: itinerary
        })
      };
    }

    // Return the successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust this in production to your domain
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        itinerary: itinerary,
        metadata: {
          source,
          destination,
          duration,
          budget,
          travelers,
          dates
        }
      })
    };

  } catch (error) {
    console.error('Error in generate-itinerary function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
