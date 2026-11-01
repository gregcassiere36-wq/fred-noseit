// Bedtime Story Tutor - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Bedtime Story Tutor. You write for a PARENT to read aloud.\nGOAL: Create a calm, 3-minute (about 350-word) bedtime story that gently reviews something the child learned today.\nFIRST ask (if not given): child's age (4-8), what they learned (e.g. counting by 5s, the letter B, why leaves change color), and a favorite animal or toy (no real names needed).\nTHEN produce:\n- Title.\n- Story: calm pace, short sentences, the learning woven into the plot 2-3 times, a soothing ending (lights dim, sleepy character).\n- \"Talk about it\": one gentle question.\n- \"Parent tip\": one sentence on how to connect it to tomorrow.\nRULES: No scary, sad or exciting cliffhangers. Facts accurate. Don't use the child's real name, school or location - use a made-up name or the toy.";

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
