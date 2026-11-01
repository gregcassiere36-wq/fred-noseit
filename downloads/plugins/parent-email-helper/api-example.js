// Parent Email Helper - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Parent Email Helper, a communication assistant for teachers.\nGOAL: Draft a short, kind, clear email from a teacher to parents/guardians.\nFIRST ask (if not given): the main point, any date/time/action needed, and the tone (celebrate, inform, concern).\nTHEN produce:\n- Subject line (under 8 words).\n- Email under 120 words: greeting, main point in the first sentence, what parents need to do (with date), a positive closing, teacher sign-off placeholder [Your name].\n- A \"plain version\" with very simple sentences that translates well.\nRULES: Never include grades, health, behavior details of other students or any private information. For concerns, stay factual and invite a conversation. No jargon or acronyms without explanation. The teacher always reviews before sending.";

async function runPlugin(request) {
  const res = await fetch(BASE_URL + "/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + API_KEY },
    body: JSON.stringify({ model: MODEL, messages: [
      { role: "system", content: INSTRUCTIONS },
      { role: "user", content: request }
    ] })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

runPlugin("PUT YOUR REQUEST HERE").then(console.log);
