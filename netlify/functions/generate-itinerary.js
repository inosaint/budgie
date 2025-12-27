/**
 * Netlify Function: Generate Travel Itinerary using Claude API
 *
 * This serverless function securely calls the Claude API to generate
 * detailed travel itineraries based on user input.
 */

const Anthropic = require('@anthropic-ai/sdk');

/**
 * Fetch available models and select the best Claude Sonnet model
 * @param {string} apiKey - Anthropic API key
 * @returns {Promise<string>} - The ID of the best available model
 */
async function getFallbackModel(apiKey) {
  try {
    const client = new Anthropic({ apiKey });
    const models = [];

    // Fetch all available models
    for await (const modelInfo of client.models.list()) {
      models.push(modelInfo.id);
    }

    // Prefer Sonnet models, sort by date (newest first)
    const sonnetModels = models
      .filter(id => id.includes('sonnet'))
      .sort((a, b) => b.localeCompare(a)); // Lexicographic sort puts newer dates first

    if (sonnetModels.length > 0) {
      console.log('Available Sonnet models:', sonnetModels);
      return sonnetModels[0]; // Return the latest Sonnet model
    }

    // Fallback to any Claude 3.5 model
    const claude35Models = models
      .filter(id => id.includes('claude-3-5') || id.includes('claude-3.5'))
      .sort((a, b) => b.localeCompare(a));

    if (claude35Models.length > 0) {
      console.log('Available Claude 3.5 models:', claude35Models);
      return claude35Models[0];
    }

    // Last resort: return the first available model
    if (models.length > 0) {
      console.log('Using first available model:', models[0]);
      return models[0];
    }

    throw new Error('No models available');
  } catch (error) {
    console.error('Error fetching fallback model:', error);
    throw error;
  }
}

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
    const { source, destination, duration, budget, travelers, dates, flights, accommodation, meals, activities, total, perPerson, regenerateDay } = JSON.parse(event.body);

    // Validate required fields
    if (!source || !destination || !duration) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: source, destination, duration' })
      };
    }

    // Get Claude API key and model from environment variables
    // Support both ANTHROPIC_API_KEY (standard) and budgie (legacy) for backwards compatibility
    const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.budgie;
    const CLAUDE_MODEL = process.env.CLAUDE_MODEL || 'claude-haiku-4-5';

    if (!CLAUDE_API_KEY) {
      console.error('ANTHROPIC_API_KEY environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Construct the prompt for Claude
    const prompt = regenerateDay
      ? `You are a professional travel planner. Generate activities for Day ${regenerateDay} of a ${duration}-day travel itinerary from ${source} to ${destination}.

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

Please create a realistic, practical itinerary for Day ${regenerateDay} that:
1. Includes ${regenerateDay === 1 ? 'departure flight from ' + source : regenerateDay === parseInt(duration) ? 'return flight to ' + source : 'a mix of activities, sightseeing, meals, and accommodation'}
2. Considers the budget tier (${budget}) when recommending hotels, restaurants, and activities
3. Provides practical tips like booking advice, estimated costs, timing recommendations, and insider tips
4. Uses appropriate icons: ✈️ for flights/transport, 🏨 for accommodation/meals, ⭐ for sightseeing/activities
5. Is optimized for ${travelers} traveler(s)

CRITICAL: You must return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. The response must be pure JSON that can be parsed directly.

Return the itinerary in this EXACT JSON structure:
{
  "days": [
    {
      "day": ${regenerateDay},
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

Remember: Return ONLY the JSON object with a single day, no other text.`
      : `You are a professional travel planner. Generate a detailed ${duration}-day travel itinerary from ${source} to ${destination}.

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

    // Helper function to call Claude API with a specific model
    const callClaudeAPI = async (modelToUse) => {
      return await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: modelToUse,
          max_tokens: 4096,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });
    };

    // Call Claude API with the configured model
    let response = await callClaudeAPI(CLAUDE_MODEL);
    let modelUsed = CLAUDE_MODEL;
    let usedFallback = false;

    // Handle model not found error with automatic fallback
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', errorText);

      // Check if it's a model deprecation/not found error
      if (errorText.includes('not_found_error') && errorText.includes('model:')) {
        console.warn(`MODEL DEPRECATION DETECTED: Model '${CLAUDE_MODEL}' is no longer available`);
        console.log('Attempting to fetch and use a fallback model...');

        try {
          // Fetch the best available model and retry
          const fallbackModel = await getFallbackModel(CLAUDE_API_KEY);
          console.log(`Retrying with fallback model: ${fallbackModel}`);

          response = await callClaudeAPI(fallbackModel);
          modelUsed = fallbackModel;
          usedFallback = true;

          // If the fallback also fails, return the error
          if (!response.ok) {
            const fallbackErrorText = await response.text();
            console.error('Fallback model also failed:', fallbackErrorText);
            return {
              statusCode: response.status,
              body: JSON.stringify({
                error: 'Failed to generate itinerary with fallback model',
                details: fallbackErrorText,
                attemptedModels: [CLAUDE_MODEL, fallbackModel]
              })
            };
          }
        } catch (fallbackError) {
          console.error('Error fetching fallback model:', fallbackError);
          return {
            statusCode: 500,
            body: JSON.stringify({
              error: `The Claude model '${CLAUDE_MODEL}' is no longer available and automatic fallback failed. Please update CLAUDE_MODEL environment variable to a current model version (e.g., claude-3-5-sonnet-20241022).`,
              details: errorText,
              fallbackError: fallbackError.message
            })
          };
        }
      } else {
        // Non-model-related error
        return {
          statusCode: response.status,
          body: JSON.stringify({
            error: 'Failed to generate itinerary',
            details: errorText,
            currentModel: CLAUDE_MODEL
          })
        };
      }
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

    // Log if fallback was used
    if (usedFallback) {
      console.log(`SUCCESS: Itinerary generated using fallback model '${modelUsed}' (original model '${CLAUDE_MODEL}' was unavailable)`);
    }

    // Return the successful response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // CORS: Allow requests from the same domain (Netlify will handle this automatically)
        // For production, restrict to specific domains via environment variable
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
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
          dates,
          modelUsed,
          ...(usedFallback && {
            fallbackUsed: true,
            originalModel: CLAUDE_MODEL,
            warning: 'The configured model was unavailable. A fallback model was automatically selected.'
          })
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
