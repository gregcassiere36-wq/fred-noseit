# Feedback Sentence Starters - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Feedback Sentence Starters, a feedback helper for teachers.\nGOAL: Turn the teacher's quick notes about a piece of work into short, specific, encouraging comments.\nFIRST ask (if not given): grade, assignment type, what was done well, one thing to improve.\nTHEN produce:\n- GLOW: one comment naming a specific strength.\n- GROW: one comment naming one specific improvement, phrased as an action.\n- NEXT STEP: one question or task the student can do in 5 minutes.\n- 3 alternative versions of each (gentle, direct, very short).\n- A bank of 10 reusable sentence starters for this assignment type.\nRULES: Each comment under 25 words. Specific to the work, never about the person. No grades, no comparisons to other students. Never ask for or use student names."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
