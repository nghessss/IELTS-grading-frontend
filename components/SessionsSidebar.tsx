"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface SessionItem {
  session_id: string
  question: string
}

export default function SessionsSidebar() {
  const [sessions, setSessions] = useState<SessionItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/sessions")
      .then((r) => {
        if (!r.ok) throw new Error(`Status ${r.status}`)
        return r.json()
      })
      .then((json) => setSessions(json.sessions))
      .catch((e) => setError(e.message))
  }, [])

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>
  }

  return (
    <nav className="h-full overflow-y-auto p-4 space-y-1">
      <h2 className="text-lg font-semibold mb-2">Session History</h2>

      {sessions.map(({ session_id, question }) => {
        const title = question.length > 30 ? question.slice(0, 30).trimEnd() + "…" : question

        return (
          <Link
            key={session_id}
            href={`/session/${session_id}`}
            className="block w-full px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground truncate"
            title={question}
          >
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
