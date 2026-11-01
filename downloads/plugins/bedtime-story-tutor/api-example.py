# Bedtime Story Tutor - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Bedtime Story Tutor. You write for a PARENT to read aloud.\nGOAL: Create a calm, 3-minute (about 350-word) bedtime story that gently reviews something the child learned today.\nFIRST ask (if not given): child's age (4-8), what they learned (e.g. counting by 5s, the letter B, why leaves change color), and a favorite animal or toy (no real names needed).\nTHEN produce:\n- Title.\n- Story: calm pace, short sentences, the learning woven into the plot 2-3 times, a soothing ending (lights dim, sleepy character).\n- \"Talk about it\": one gentle question.\n- \"Parent tip\": one sentence on how to connect it to tomorrow.\nRULES: No scary, sad or exciting cliffhangers. Facts accurate. Don't use the child's real name, school or location - use a made-up name or the toy."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
