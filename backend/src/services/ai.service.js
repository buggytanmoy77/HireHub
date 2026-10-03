const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const resumeAnalysisSchema = {
  type: "object",

  properties: {
    summary: {
      type: "string",
      description:
        "A concise professional summary of the candidate based only on the resume.",
    },

    experienceLevel: {
      type: "string",
      enum: [
        "student",
        "internship",
        "entry-level",
        "experienced",
      ],
      description:
        "The candidate's overall professional experience level.",
    },

    jobType: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "internship",
          "full-time",
          "part-time",
          "contract",
        ],
      },
      description:
        "Types of jobs that are appropriate based on the candidate's current career stage.",
    },

    preferredLocations: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Locations explicitly mentioned as preferred by the candidate. Do not invent preferences.",
    },

    workPreference: {
      type: "string",
      enum: [
        "remote",
        "hybrid",
        "onsite",
        "unspecified",
      ],
      description:
        "Work arrangement preference if explicitly stated in the resume. Otherwise use unspecified.",
    },

    skills: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Technical and professional skills explicitly supported by the resume.",
    },

    keywords: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Important technical keywords that can be used to match the candidate against job descriptions.",
    },

    education: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Educational qualifications found in the resume.",
    },

    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: {
            type: "string",
          },
          company: {
            type: "string",
          },
          duration: {
            type: "string",
          },
        },
        required: [
          "role",
          "company",
          "duration",
        ],
      },
    },

    suitableRoles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          role: {
            type: "string",
          },
          reason: {
            type: "string",
          },
        },
        required: [
          "role",
          "reason",
        ],
      },
    },

    searchQueries: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Specific job-search queries suitable for a job-search API. Include role and relevant technology where useful.",
    },
  },

  required: [
    "summary",
    "experienceLevel",
    "jobType",
    "preferredLocations",
    "workPreference",
    "skills",
    "keywords",
    "education",
    "experience",
    "suitableRoles",
    "searchQueries",
  ],
};

const analyzeResume = async (resumeText) => {
  if (!resumeText || !resumeText.trim()) {
    throw new Error("Resume text is required");
  }

  const prompt = `
You are an AI career analysis system for a job recommendation platform.

Analyze the following resume and create a structured candidate profile that
will later be used to search for suitable jobs.

IMPORTANT RULES:

1. Only use information supported by the resume.
2. Do not invent skills, experience, education, locations, or preferences.
3. Distinguish between skills demonstrated in projects and professional work.
4. Consider projects, internships, competitive programming, certifications,
   education and technical experience when determining suitable roles.
5. Determine the candidate's realistic career stage.
6. Determine whether internship, full-time, or other job types are appropriate
   based on the candidate's current stage.
7. Only specify preferred locations if the resume explicitly indicates them.
8. If the resume does not mention a work arrangement, use "unspecified".
9. Generate multiple realistic job roles when appropriate.
10. Generate practical search queries that can be directly sent to a job-search
    API.
11. Search queries should contain useful job titles and technologies when
    appropriate.
12. Avoid overly broad queries such as "technology jobs".
13. Do not rank roles based on arbitrary assumptions.
14. Do not claim that the candidate is qualified for a role if the resume does
    not provide evidence.
15. Keywords should contain technologies, frameworks, tools, concepts and
    domain terms useful for matching job descriptions.

For example, instead of:

"Backend Developer"

a useful search query could be:

"Node.js Backend Developer"

or:

"Backend Developer Node.js Express"

depending on the candidate's actual skills.

Resume:

${resumeText}
`;

  const response = await ai.interactions.create({
    model: "gemini-3.8-flash",

    input: prompt,

    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: resumeAnalysisSchema,
    },
  });

  return JSON.parse(response.output_text);
};

module.exports = {
  analyzeResume,
};