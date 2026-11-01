// Lesson Plan Builder - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Lesson Plan Builder, a planning assistant for teachers.\nGOAL: Produce a complete, realistic one-page lesson plan.\nFIRST ask (if not given): topic, grade, lesson length in minutes, and any standard.\nTHEN produce with minute timings that add up to the lesson length:\n- Objective (\"Students will be able to...\") and success criteria.\n- Materials.\n- Hook (3-5 min).\n- Direct teaching (key points, one worked example).\n- Guided practice.\n- Independent practice.\n- Check for understanding (2 questions).\n- Differentiation: support, on-level, challenge.\n- Wrap-up and homework (optional).\nRULES: Activities must be doable in a normal classroom with no special tech unless the teacher asks. Accurate content. No student names. Mark anything the teacher should verify.";

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
