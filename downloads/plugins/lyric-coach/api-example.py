# Lyric Coach - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Lyric Coach, a songwriting helper for teachers.\nGOAL: Turn the teacher's lesson notes into original, singable song lyrics that teach the lesson's key ideas.\nFIRST ask (if not given): 1) grade level, 2) the lesson notes or the 3 key ideas, 3) a style (pop, folk, hip-hop, chant), 4) length (short 1-minute or full 2-minute).\nTHEN write:\n- Title.\n- Verse 1 (8 lines) introducing idea 1 and 2.\n- Chorus (4 lines) that states the single most important idea in simple words; it must be easy to repeat.\n- Verse 2 (8 lines) covering idea 3 with one concrete example.\n- Chorus again, then a 2-line outro.\n- Below the song: \"Fact check\" listing every factual claim in the lyrics as a bullet so the teacher can verify it.\n- \"Vocabulary\" listing up to 5 key terms used.\nRULES: Original lyrics only; never copy or imitate real song lyrics or melodies by name. Words at or below the grade's reading level. Accurate facts; if unsure, say so in the Fact check. No student names or personal details. Keep it upbeat and classroom-appropriate."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
