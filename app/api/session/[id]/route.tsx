import { NextResponse } from "next/server"

const mockSessionData: Record<string, any> = {
  "mock-session-1": {
    question:
      "Some people believe that technology has made our lives more complex. Others think it has simplified our lives. Discuss both views and give your opinion.",
    answer:
      "Technology has become an integral part of modern life, and its impact on our daily routines is undeniable. While some argue that technological advancements have complicated our existence, others believe they have made life simpler and more efficient. In my opinion, although technology can sometimes be overwhelming, its benefits in simplifying various aspects of life outweigh the drawbacks.\n\nOn one hand, critics argue that technology has made life more complex. The constant need to update software, learn new applications, and manage multiple devices can be stressful. For example, many elderly people struggle to adapt to smartphones and online banking systems. Additionally, the proliferation of social media and instant messaging has created an expectation of constant availability, leading to increased stress and reduced work-life balance.\n\nOn the other hand, technology has undoubtedly simplified many tasks. Online shopping allows people to purchase goods without leaving their homes, saving time and effort. Communication has become instantaneous through email and video calls, enabling people to stay connected regardless of distance. Furthermore, automation in industries has reduced manual labor and increased productivity, making many processes more efficient.\n\nIn conclusion, while technology does present certain challenges, its role in simplifying our lives is more significant. The key is to use technology wisely and ensure that it serves our needs rather than controls them.",
    feedback: {
      overall_score: 7.0,
      evaluation_feedback: {
        criteria: {
          task_response: {
            details: [
              "You have fully addressed all parts of the task.",
              "Your position is clear and well-developed throughout.",
              "Main ideas are relevant and well-supported with examples.",
            ],
          },
          coherence_and_cohesion: {
            details: [
              "Your essay has excellent overall progression.",
              "Paragraphs are logically organized with clear central topics.",
              "Cohesive devices are used effectively throughout.",
            ],
          },
          lexical_resource: {
            details: [
              "You use a wide range of vocabulary appropriately.",
              "Less common vocabulary items are used with good control.",
              "Word choice is precise with very few errors.",
            ],
          },
          grammatical_range_and_accuracy: {
            details: [
              "You use a wide range of complex structures effectively.",
              "The majority of sentences are error-free.",
              "Grammar errors are rare and do not impede communication.",
            ],
          },
        },
      },
      constructive_feedback: {
        criteria: {
          task_response: {
            score: 7.0,
            strengths: [
              "Clear and engaging introduction.",
              "Both views are discussed thoroughly.",
              "Strong conclusion that restates your position.",
            ],
            areas_for_improvement: ["Could provide more specific examples in body paragraphs."],
            recommendations: ["Include statistics or real-world examples to strengthen arguments."],
          },
          coherence_and_cohesion: {
            score: 7.5,
            strengths: [
              "Excellent paragraph structure.",
              "Smooth transitions between ideas.",
              "Clear topic sentences in each paragraph.",
            ],
            areas_for_improvement: ["Minor: Could use more varied referencing."],
            recommendations: ["Experiment with different cohesive devices for variety."],
          },
          lexical_resource: {
            score: 7.0,
            strengths: [
              "Wide range of vocabulary used accurately.",
              "Good use of collocations.",
              "Topic-specific vocabulary is appropriate.",
            ],
            areas_for_improvement: ["A few instances of repetition could be avoided."],
            recommendations: ["Use more synonyms to avoid repeating key words."],
          },
          grammatical_range_and_accuracy: {
            score: 6.5,
            strengths: [
              "Good variety of complex structures.",
              "Most sentences are grammatically correct.",
              "Effective use of conditional sentences.",
            ],
            areas_for_improvement: ["Minor errors in article usage.", "Some sentences could be more concise."],
            recommendations: ["Review article usage rules.", "Practice writing more concise complex sentences."],
          },
        },
      },
    },
    statistics: {
      total_words: 267,
      unique_words: 178,
      lexical_density: 0.67,
      average_word_length: 5.2,
      common_words: [
        { word: "technology", count: 8 },
        { word: "life", count: 6 },
        { word: "people", count: 5 },
        { word: "has", count: 4 },
        { word: "more", count: 4 },
      ],
      sentence_count: 14,
      average_sentence_length: 19.1,
      paragraph_count: 4,
    },
    annotated_essay: `<div class="essay-content">Technology has become an integral part of modern life, and its impact on our daily routines is undeniable. While some argue that technological advancements have complicated our existence, others believe they have made life simpler and more efficient. In my opinion, although technology can sometimes be overwhelming, its benefits in simplifying various aspects of life outweigh the drawbacks.\n\nOn one hand, critics argue that technology has made life more complex. The constant need to update software, learn new applications, and manage multiple devices can be stressful. For example, many elderly people struggle to adapt to smartphones and online banking systems. Additionally, the proliferation of social media and instant messaging has created an expectation of constant availability, leading to increased stress and reduced work-life balance.\n\nOn the other hand, technology has undoubtedly simplified many tasks. Online shopping allows people to purchase goods without leaving their homes, saving time and effort. Communication has become instantaneous through email and video calls, enabling people to stay connected regardless of distance. Furthermore, automation in industries has reduced manual labor and increased productivity, making many processes more efficient.\n\nIn conclusion, while technology does present certain challenges, its role in simplifying our lives is more significant. The key is to use technology wisely and ensure that it serves our needs rather than controls them.</div>`,
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return mock data if available, otherwise generate new mock data
    const sessionData = mockSessionData[id] || {
      question: "Sample IELTS Writing Task 2 question for this session.",
      answer: "This is a sample essay response that would have been submitted for this session.",
      feedback: null,
      statistics: null,
      annotated_essay: null,
    }

    return NextResponse.json(sessionData)
  } catch (error) {
    console.error("Error in session detail API route:", error)
    return NextResponse.json({ error: "Failed to fetch session details" }, { status: 500 })
  }
}
