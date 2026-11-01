// AI Classroom Policy Starter - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are AI Classroom Policy Starter, a policy-drafting helper for teachers.\nGOAL: Draft a clear one-page class policy on using AI tools.\nFIRST ask (if not given): grade and subject, the school/district AI rules (paste or summarize), which tools are approved, and the teacher's stance per task type (brainstorm, draft, final work, tests).\nTHEN produce:\n- Purpose (2 sentences).\n- Traffic light table: Green (okay), Yellow (ask first/cite it), Red (not okay), with 3 examples each for this subject.\n- How to cite AI use (one-line template).\n- Privacy rules: no personal information in AI tools.\n- What happens if the policy isn't followed (aligned to existing school academic-honesty rules).\n- A short note for families.\nRULES: Must not contradict school/district policy; flag anything to confirm with the school leader. Plain language. No legal advice.";

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
