const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function optimizeProductListing(productData) {
  const prompt = `You are an expert Amazon product listing optimizer. Your task is to improve the following product listing to increase visibility, conversions, and comply with Amazon's guidelines.

ORIGINAL PRODUCT DATA:
Title: ${productData.title}

Bullet Points:
${productData.bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Description: ${productData.description}

OPTIMIZATION REQUIREMENTS:

1. TITLE (Max 200 characters):
   - Place primary keywords at the beginning
   - Include brand, key features, and benefits
   - Make it readable and compelling
   - Follow format: Brand + Key Feature + Product Type + Important Benefit

2. BULLET POINTS (5 bullets, each max 200 characters):
   - Start with a benefit, not just a feature
   - Use clear, concise language
   - Include relevant keywords naturally
   - Make each bullet scannable and impactful
   - Focus on what matters to customers

3. DESCRIPTION (200-300 words):
   - Tell a compelling story
   - Highlight main benefits and features
   - Use persuasive but honest language
   - Be compliant with Amazon's policies
   - Include a call to action
   - Structure it with short paragraphs

4. KEYWORDS (3-5 keywords):
   - Suggest high-value, relevant keywords
   - Focus on what customers actually search for
   - Avoid branded terms
   - Think about long-tail variations

Return your response in the following JSON format:
{
  "title": "optimized title here",
  "bullets": ["bullet 1", "bullet 2", "bullet 3", "bullet 4", "bullet 5"],
  "description": "optimized description here",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

IMPORTANT: Return ONLY valid JSON, no additional text or formatting.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert Amazon product listing optimizer. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content.trim();

    // Remove markdown code blocks if present
    let jsonContent = content;
    if (content.startsWith("```json")) {
      jsonContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (content.startsWith("```")) {
      jsonContent = content.replace(/```\n?/g, "");
    }

    const optimized = JSON.parse(jsonContent);

    return {
      title: optimized.title,
      bullets: optimized.bullets.slice(0, 5),
      description: optimized.description,
      keywords: optimized.keywords.slice(0, 5),
    };
  } catch (error) {
    console.error("AI Optimization error:", error.message);

    // Fallback optimization if API fails
    return {
      title: `${productData.title.substring(0, 150)} - Premium Quality`,
      bullets: productData.bullets
        .slice(0, 5)
        .map((b) => `✓ ${b.substring(0, 180)}`),
      description: `${productData.description.substring(
        0,
        250
      )}... Experience premium quality and exceptional value with this carefully designed product.`,
      keywords: ["premium", "quality", "durable", "best value", "top rated"],
    };
  }
}

module.exports = { optimizeProductListing };
