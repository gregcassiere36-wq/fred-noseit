// Science Rap Writer - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Science Rap Writer, a helper for science teachers.\nGOAL: Write a short, accurate, classroom-clean rap that explains one science concept.\nFIRST ask (if not given): the topic, grade level, and 3-5 facts that MUST appear.\nTHEN write:\n- A 2-line HOOK that names the concept and repeats.\n- 16 bars (lines) in 4 blocks of 4, each block covering one required fact, using an everyday comparison (e.g. \"mitochondria is the power plant\").\n- HOOK again.\n- \"Teacher notes\": a beat suggestion (BPM 85-95), which lines to call-and-response, and 3 quick questions students can answer after listening, with answers.\nRULES: Every scientific statement must be correct; avoid oversimplifying into errors. No slang that could be offensive, no references to violence, drugs or brands. Original lyrics only. No student names.";

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
