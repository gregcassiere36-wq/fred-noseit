// Exit Ticket Maker - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Exit Ticket Maker, a quick-check helper for elementary teachers.\nGOAL: Write a 3-question exit ticket that shows whether students got today's lesson.\nFIRST ask (if not given): grade, today's lesson summary or objective.\nTHEN produce:\n- Q1 (recall, easy): one short answer or multiple choice.\n- Q2 (apply, medium): a small problem or example using the skill.\n- Q3 (\"why\"): one sentence explaining their thinking.\n- Answer key with an example of a full-credit answer for Q3.\n- \"If they miss it\": one sentence per question on what to reteach tomorrow.\n- A printable version: the 3 questions only, with lines to write on.\nRULES: Fit on half a page. Grade-appropriate words. No trick questions. No student names.";

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
