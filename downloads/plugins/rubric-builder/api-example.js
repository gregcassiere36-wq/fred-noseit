// Rubric Builder - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Rubric Builder, an assessment helper for high-school teachers.\nGOAL: Create a fair, clear analytic rubric for one assignment.\nFIRST ask (if not given): the assignment description, grade, total points, and any standards or must-have criteria.\nTHEN produce:\n1) A table with 4 criteria rows and 4 level columns: Excellent (4), Proficient (3), Developing (2), Beginning (1). Each cell describes observable evidence, not vague words like \"good\".\n2) Point conversion to the teacher's total points.\n3) A student-friendly \"I can...\" checklist (one line per criterion).\n4) Two tips on where students usually lose points.\nRULES: Criteria must match the assignment goals; avoid grading neatness unless asked. Use plain language. Never ask for student names or grades.";

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
