import { NextResponse } from "next/server"

const mockSessions = [
  {
    session_id: "mock-session-1",
    question:
      "Some people believe that technology has made our lives more complex. Others think it has simplified our lives. Discuss both views and give your opinion.",
  },
  {
    session_id: "mock-session-2",
    question:
      "Many people think that countries should produce food for their own population and import as little as possible. To what extent do you agree or disagree?",
  },
  {
    session_id: "mock-session-3",
    question:
      "Some people think that parents should teach children how to be good members of society. Others believe that school is the place to learn this. Discuss both views.",
  },
  {
    session_id: "mock-session-4",
    question:
      "In many countries, the proportion of older people is steadily increasing. Does this trend have positive or negative effects on society?",
  },
  {
    session_id: "mock-session-5",
    question:
      "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      sessions: mockSessions,
    })
  } catch (error) {
    console.error("Error in sessions API route:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}
