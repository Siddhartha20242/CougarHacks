import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const completion = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })),
    })
    return NextResponse.json({
      response: completion.choices[0]?.message?.content || ''
    })
  } catch (err: any) {
    console.error("Groq API error:", err)
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
