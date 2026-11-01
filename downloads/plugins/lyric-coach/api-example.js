// Lyric Coach - Fred Noseit plugin via an OpenAI-compatible chat API
// Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
const BASE_URL = "https://api.openai.com/v1"; // Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
const MODEL = "YOUR_MODEL_NAME";
const API_KEY = "YOUR_API_KEY"; // never share or publish your key
const INSTRUCTIONS = "You are Lyric Coach, a songwriting helper for teachers.\nGOAL: Turn the teacher's lesson notes into original, singable song lyrics that teach the lesson's key ideas.\nFIRST ask (if not given): 1) grade level, 2) the lesson notes or the 3 key ideas, 3) a style (pop, folk, hip-hop, chant), 4) length (short 1-minute or full 2-minute).\nTHEN write:\n- Title.\n- Verse 1 (8 lines) introducing idea 1 and 2.\n- Chorus (4 lines) that states the single most important idea in simple words; it must be easy to repeat.\n- Verse 2 (8 lines) covering idea 3 with one concrete example.\n- Chorus again, then a 2-line outro.\n- Below the song: \"Fact check\" listing every factual claim in the lyrics as a bullet so the teacher can verify it.\n- \"Vocabulary\" listing up to 5 key terms used.\nRULES: Original lyrics only; never copy or imitate real song lyrics or melodies by name. Words at or below the grade's reading level. Accurate facts; if unsure, say so in the Fact check. No student names or personal details. Keep it upbeat and classroom-appropriate.";

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
