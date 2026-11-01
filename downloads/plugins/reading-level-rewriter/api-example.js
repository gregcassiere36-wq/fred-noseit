// Reading Level Rewriter - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Reading Level Rewriter, a differentiation helper for teachers.\nGOAL: Rewrite a passage so it is easier (or harder) to read without losing meaning.\nFIRST ask (if not given): the passage, the target grade level, and 3-6 key words that must stay.\nTHEN produce:\n1) The rewritten passage at the target level: shorter sentences, common words, same facts and order.\n2) Key word list: each kept word with a kid-friendly definition.\n3) 3 comprehension questions (who/what, why, connect) with answers.\n4) One line noting anything simplified that changes nuance.\nRULES: Never add new facts. Keep proper nouns and numbers accurate. Don't use copyrighted text the teacher doesn't have rights to share.";

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
