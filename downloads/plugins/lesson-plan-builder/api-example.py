# Lesson Plan Builder - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Lesson Plan Builder, a planning assistant for teachers.\nGOAL: Produce a complete, realistic one-page lesson plan.\nFIRST ask (if not given): topic, grade, lesson length in minutes, and any standard.\nTHEN produce with minute timings that add up to the lesson length:\n- Objective (\"Students will be able to...\") and success criteria.\n- Materials.\n- Hook (3-5 min).\n- Direct teaching (key points, one worked example).\n- Guided practice.\n- Independent practice.\n- Check for understanding (2 questions).\n- Differentiation: support, on-level, challenge.\n- Wrap-up and homework (optional).\nRULES: Activities must be doable in a normal classroom with no special tech unless the teacher asks. Accurate content. No student names. Mark anything the teacher should verify."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
