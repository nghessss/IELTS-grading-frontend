import { NextResponse } from "next/server"

function generateMockGradingResult(question: string, answer: string) {
  const wordCount = answer.trim().split(/\s+/).length

  // Generate realistic scores based on word count
  const baseScore = wordCount < 250 ? 5.5 : wordCount < 280 ? 6.5 : 7.0
  const variance = () => Math.random() * 1 - 0.5 // -0.5 to +0.5

  const scores = {
    task_response: Math.max(5, Math.min(9, baseScore + variance())),
    coherence_and_cohesion: Math.max(5, Math.min(9, baseScore + variance())),
    lexical_resource: Math.max(5, Math.min(9, baseScore + variance())),
    grammatical_range_and_accuracy: Math.max(5, Math.min(9, baseScore + variance())),
  }

  const overall =
    (scores.task_response +
      scores.coherence_and_cohesion +
      scores.lexical_resource +
      scores.grammatical_range_and_accuracy) /
    4

  // Generate annotated essay with mock corrections
  const sentences = answer.split(/\.\s+/)
  const annotatedSentences = sentences
    .map((sentence, idx) => {
      if (idx % 3 === 0 && sentence.length > 20) {
        // Add some mock error highlighting
        const words = sentence.split(" ")
        const errorIdx = Math.floor(words.length / 2)
        words[errorIdx] = `<span class="error" title="Consider using a more precise word">${words[errorIdx]}</span>`
        return words.join(" ")
      }
      return sentence
    })
    .join(". ")

  return {
    session_id: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    feedback: {
      overall_score: Number.parseFloat(overall.toFixed(1)),
      evaluation_feedback: {
        criteria: {
          task_response: {
            details: [
              "You have addressed the main aspects of the task.",
              "Your position is clear throughout the response.",
              "Main ideas are relevant and supported with examples.",
            ],
          },
          coherence_and_cohesion: {
            details: [
              "Your essay has a clear overall progression.",
              "Paragraphs are well-organized with clear central topics.",
              "Cohesive devices are used effectively in most cases.",
            ],
          },
          lexical_resource: {
            details: [
              "You use an adequate range of vocabulary for the task.",
              "Some less common vocabulary items are used appropriately.",
              "Word choice is generally accurate with minor errors.",
            ],
          },
          grammatical_range_and_accuracy: {
            details: [
              "You use a mix of simple and complex sentence structures.",
              "Most sentences are error-free.",
              "Grammar errors rarely impede communication.",
            ],
          },
        },
      },
      constructive_feedback: {
        criteria: {
          task_response: {
            score: Number.parseFloat(scores.task_response.toFixed(1)),
            strengths: [
              "Clear introduction that presents the topic effectively.",
              "Relevant examples support your main points.",
              "Conclusion summarizes your position well.",
            ],
            areas_for_improvement: [
              "Try to address all parts of the prompt more equally.",
              "Develop some ideas more fully with additional details.",
            ],
            recommendations: [
              "Include a clearer thesis statement in your introduction.",
              "Ensure each body paragraph has a distinct main idea.",
            ],
          },
          coherence_and_cohesion: {
            score: Number.parseFloat(scores.coherence_and_cohesion.toFixed(1)),
            strengths: [
              "Logical organization with clear paragraph structure.",
              "Good use of linking words to connect ideas.",
              "Each paragraph has a clear central topic.",
            ],
            areas_for_improvement: [
              "Some transitions between paragraphs could be smoother.",
              "Avoid overusing certain linking words like 'however' and 'moreover'.",
            ],
            recommendations: [
              "Use a wider variety of cohesive devices.",
              "Practice using referencing words to avoid repetition.",
            ],
          },
          lexical_resource: {
            score: Number.parseFloat(scores.lexical_resource.toFixed(1)),
            strengths: [
              "Vocabulary is generally relevant to the topic.",
              "Some attempts to use less common vocabulary.",
              "Collocations are mostly accurate.",
            ],
            areas_for_improvement: [
              "Work on using more precise vocabulary.",
              "Reduce errors in word form and spelling.",
              "Expand your range of topic-specific vocabulary.",
            ],
            recommendations: [
              "Learn synonyms for commonly used words.",
              "Practice using academic vocabulary in context.",
              "Keep a vocabulary journal for new words.",
            ],
          },
          grammatical_range_and_accuracy: {
            score: Number.parseFloat(scores.grammatical_range_and_accuracy.toFixed(1)),
            strengths: [
              "Good variety of complex sentence structures.",
              "Most sentences are grammatically accurate.",
              "Effective use of subordinate clauses.",
            ],
            areas_for_improvement: [
              "Pay attention to subject-verb agreement in complex sentences.",
              "Be careful with article usage (a, an, the).",
              "Review conditional sentence structures.",
            ],
            recommendations: [
              "Practice using a wider range of complex structures.",
              "Review common grammar errors in your writing.",
              "Focus on accuracy while maintaining complexity.",
            ],
          },
        },
      },
    },
    statistics: {
      total_words: wordCount,
      unique_words: Math.floor(wordCount * 0.6),
      lexical_density: Number.parseFloat((Math.random() * 0.2 + 0.5).toFixed(2)),
      average_word_length: Number.parseFloat((Math.random() * 1 + 4.5).toFixed(2)),
      common_words: [
        { word: "people", count: Math.floor(Math.random() * 5 + 3) },
        { word: "important", count: Math.floor(Math.random() * 4 + 2) },
        { word: "society", count: Math.floor(Math.random() * 4 + 2) },
        { word: "believe", count: Math.floor(Math.random() * 3 + 2) },
        { word: "example", count: Math.floor(Math.random() * 3 + 2) },
      ],
      sentence_count: sentences.length,
      average_sentence_length: Number.parseFloat((wordCount / sentences.length).toFixed(1)),
      paragraph_count: answer.split(/\n\n+/).length,
    },
    annotated_essay: `<div class="essay-content">${annotatedSentences}</div>`,
  }
}

function formatGradingResponse(gradingResult: any) {
  const formatCriterion = (criterionName: string) => ({
    score: gradingResult.constructive_feedback.criteria[criterionName].score,
    evaluation_feedback: gradingResult.evaluation_feedback.criteria[criterionName].details,
    constructive_feedback: {
      strengths: gradingResult.constructive_feedback.criteria[criterionName].strengths,
      areas_for_improvement: gradingResult.constructive_feedback.criteria[criterionName].areas_for_improvement,
      recommendations: gradingResult.constructive_feedback.criteria[criterionName].recommendations,
    },
  })

  return {
    overall: gradingResult.overall_score,
    task_response: formatCriterion("task_response"),
    coherence_and_cohesion: formatCriterion("coherence_and_cohesion"),
    lexical_resource: formatCriterion("lexical_resource"),
    grammatical_range_and_accuracy: formatCriterion("grammatical_range_and_accuracy"),
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question, answer } = body

    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 })
    }

    // Simulate API delay for realistic experience
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const data = generateMockGradingResult(question, answer)
    const sessionId = data.session_id
    const gradingResult = data.feedback
    const formattedResponse = formatGradingResponse(gradingResult)
    const statistics = data.statistics
    const annotatedEssay = data.annotated_essay

    return NextResponse.json({
      sessionId,
      formattedResponse,
      statistics,
      annotatedEssay,
    })
  } catch (error) {
    console.error("Error in grade-essay API route:", error)
    return NextResponse.json({ error: "Failed to grade essay" }, { status: 500 })
  }
}
