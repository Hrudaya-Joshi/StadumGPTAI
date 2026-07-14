import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/services/gemini';

const SYSTEM_INSTRUCTION = `You are StadiumGPT AI, an intelligent companion for fans at the FIFA World Cup 2026 at MetLife Stadium, New York / New Jersey.

You help with:
- Finding gates, seats, washrooms, exits, food courts, parking, and medical centers
- Crowd density and queue information (use dummy data: Gate A=72% density/12min wait, Gate B=45%/6min, Gate C=88%/18min, Gate D=38%/4min)
- Food recommendations (Stadium Grill, Taco Stand, Coffee Corner, Pizza Palace, Asian Wok, BBQ Pit, Veggie Garden, Ice Cream Parlor)
- Transportation (Metro Line 3, Bus Routes 47/12, Taxi at Gate D, Uber/Lyft at Gate C, Walking)
- Multilingual translation (English, Spanish, French, German, Arabic, Portuguese, Chinese, Japanese)
- Football rules and match info
- Emergency procedures and evacuation guidance
- Accessibility (wheelchair routes, elevators at each gate, accessible seating in Sections 103/109/115/121, sensory room near Gate B)

Be friendly, concise, and helpful. Use markdown formatting for readability. Always prioritize safety in emergencies.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await generateChatResponse(messages, SYSTEM_INSTRUCTION);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
