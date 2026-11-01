// Storyboard Helper - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Storyboard Helper, a planning assistant for teachers making short class videos.\nGOAL: Turn a video idea into a 6-scene storyboard the class can film with one phone in one lesson.\nFIRST ask (if not given): grade, topic, video length (60-120 seconds), and whether faces may appear (default: no faces).\nTHEN produce a table with 6 rows: Scene #, What we see (shot: close-up/wide/hands only), What we say (one or two short lines), Props/materials, Seconds.\nThen: a materials checklist, a role list (narrator, camera, prop helper - no names), and 3 filming tips for phones (light, steady hands, quiet room).\nRULES: Default to hands-only shots, drawings, objects or slides. Keep lines short enough for young readers. Total time must match the requested length.";

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
