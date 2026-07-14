// Google Gemini AI service — reads API key from environment variables.
// Add to .env.local:
//   GEMINI_API_KEY=...

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export async function generateContent(
  prompt: string,
  systemInstruction?: string
): Promise<string> {
  if (!genAI) {
    return mockResponse(prompt);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const fullPrompt = systemInstruction
      ? `${systemInstruction}\n\nUser: ${prompt}`
      : prompt;
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    return text;
  } catch (err) {
    console.error('Gemini API error:', err);
    return mockResponse(prompt);
  }
}

export async function generateChatResponse(
  messages: { role: string; content: string }[],
  systemInstruction?: string
): Promise<string> {
  if (!genAI) {
    return mockResponse(messages[messages.length - 1]?.content || '');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const lastMessage = messages[messages.length - 1]?.content || '';
    const fullPrompt = systemInstruction
      ? `${systemInstruction}\n\nUser: ${lastMessage}`
      : lastMessage;

    const result = await chat.sendMessage(fullPrompt);
    return result.response.text();
  } catch (err) {
    console.error('Gemini chat error:', err);
    return mockResponse(messages[messages.length - 1]?.content || '');
  }
}

// Fallback responses when API key is not configured
function mockResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('gate') || lower.includes('entrance')) {
    return 'Gate A is located at the north entrance of the stadium. From your current position, head towards the main concourse and follow the signs for "Gate A — North." Estimated walking time: approximately 3 minutes.';
  }
  if (lower.includes('seat')) {
    return 'Your seat is in Section 112, Row 14, Seat 7. From Gate A, walk along the concourse until you reach Section 112. Take the aisle stairs down to Row 14. Your seat is the 7th seat from the aisle.';
  }
  if (lower.includes('crowd') || lower.includes('congestion')) {
    return 'Gate B currently has moderate crowd density (about 65% capacity). The estimated wait time is 8 minutes. I recommend using Gate C, which has lighter traffic with only a 3-minute wait.';
  }
  if (lower.includes('washroom') || lower.includes('restroom') || lower.includes('toilet')) {
    return 'The nearest washroom is located next to Section 110, approximately 50 meters from your current position. There is also one near Section 115 if you prefer a less crowded option.';
  }
  if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant')) {
    return 'The best food options near you are:\n1. **Stadium Grill** (30m away, 5-min wait, 4.5★) — Burgers, fries, hot dogs\n2. **Taco Stand** (60m away, 3-min wait, 4.2★) — Mexican cuisine\n3. **Coffee Corner** (40m away, 2-min wait, 4.7★) — Coffee and pastries';
  }
  if (lower.includes('translate') || lower.includes('spanish') || lower.includes('french') || lower.includes('language')) {
    return 'Here is the translation:\n\n**Spanish:** "¿Dónde está la Puerta A?" (Where is Gate A?)\n**French:** "Où est la Porte A?"\n**German:** "Wo ist Tor A?"\n**Arabic:** "أين البوابة أ؟"\n\nI can translate any phrase for you — just ask!';
  }
  if (lower.includes('rule') || lower.includes('football') || lower.includes('soccer') || lower.includes('offside')) {
    return 'Football (soccer) is played with 11 players per team on a rectangular field. Key rules:\n\n• **Offside:** A player is offside if they are nearer to the opponent\'s goal line than both the ball and the second-last defender when the ball is played to them.\n• **Fouls:** Direct free kicks are awarded for kicking, tripping, jumping at, charging, striking, pushing, or holding an opponent.\n• **Yellow/Red Cards:** Yellow = warning. Red = ejection. Two yellows = red.\n• **Penalty Kick:** Awarded for fouls inside the 18-yard box.';
  }
  if (lower.includes('emergency') || lower.includes('exit') || lower.includes('evacuate')) {
    return '🚨 EMERGENCY PROCEDURES:\n\n1. **Stay calm** — do not run.\n2. **Nearest exit:** Exit 7 is 40 meters to your left (Section 110 aisle).\n3. **Alternative exit:** Exit 9 is 80 meters to your right (Section 115 aisle).\n4. Follow the green exit signs above each aisle.\n5. Emergency personnel in orange vests can assist you.\n6. Assembly point: Stadium Plaza (north side).\n\nIf you need medical assistance, signal a volunteer or call the emergency number displayed on your ticket.';
  }
  if (lower.includes('transport') || lower.includes('metro') || lower.includes('bus') || lower.includes('taxi')) {
    return 'Transportation options from the stadium:\n\n1. **Metro** — Line 3 departs every 4 minutes. Stadium Station is 5 minutes away on foot. Fastest option!\n2. **Bus** — Route 47 and Route 12 both serve the stadium. Next departure: 6 minutes.\n3. **Taxi** — Taxi rank at Gate D. Estimated wait: 10 minutes.\n4. **Ride Share** — Pickup zone at Gate C. 5-minute wait for most rides.\n\nI recommend the Metro for the fastest departure.';
  }
  if (lower.includes('accessib') || lower.includes('wheelchair') || lower.includes('disability')) {
    return 'Accessibility services available:\n\n• **Wheelchair routes** are marked with blue signage throughout the stadium.\n• **Elevators** are located near each gate (A, B, C, D).\n• **Accessible seating** is available in Sections 103, 109, 115, and 121.\n• **Audio assistance** is available — ask any volunteer with an orange vest.\n• **Sensory room** is located near Gate B for guests who need a quiet space.';
  }

  return "I'm your StadiumGPT AI companion! I can help you with:\n• Finding gates, seats, washrooms, and exits\n• Crowd density and queue information\n• Food recommendations\n• Transportation options\n• Multilingual translation\n• Football rules and match info\n• Emergency procedures\n• Accessibility guidance\n\nWhat would you like to know?";
}
