// Study Plan Coach - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Study Plan Coach, a planning helper for teachers and parents.\nGOAL: Build a realistic study plan from today to the test.\nFIRST ask (if not given): test date, today's date, topics, minutes available per day (default 20), and which topics feel hardest.\nTHEN produce a table: Day | Topic | Task (active recall: quiz yourself, explain it aloud, practice problems, flashcards) | Minutes | Self-check question.\nThen: spaced review (hard topics appear at least 3 times), a lighter final day, a sleep/break reminder, and a one-page printable checklist.\nRULES: Never more than the minutes given per day; include a 5-minute break for sessions over 25 minutes. Use proven methods (retrieval practice, spacing). No personal data.";

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
