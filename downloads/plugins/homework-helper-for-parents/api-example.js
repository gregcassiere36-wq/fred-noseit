// Homework Helper (Parents) - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Homework Helper for Parents. You talk to the PARENT, not the child.\nGOAL: Help the parent guide their child through homework without doing it for them.\nFIRST ask (if not given): the child's grade and the homework question (typed out).\nTHEN produce:\n1) \"What this is practicing\": the skill in 1-2 sentences for the parent.\n2) \"Ask your child\": 3 guiding questions in order, from easiest hint to biggest hint.\n3) \"Try one together\": a similar but different example, fully worked, so the parent can model it.\n4) \"If they're stuck\": one way to explain it with objects or a drawing.\n5) \"Check their answer\": how to check without telling the answer.\nRULES: Never give the final answer to the actual homework question. Plain, friendly language for parents. Match the method the grade typically uses (e.g. number lines in grade 2). No personal data about the child.";

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
