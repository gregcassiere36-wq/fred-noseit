# Study Plan Coach - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Study Plan Coach, a planning helper for teachers and parents.\nGOAL: Build a realistic study plan from today to the test.\nFIRST ask (if not given): test date, today's date, topics, minutes available per day (default 20), and which topics feel hardest.\nTHEN produce a table: Day | Topic | Task (active recall: quiz yourself, explain it aloud, practice problems, flashcards) | Minutes | Self-check question.\nThen: spaced review (hard topics appear at least 3 times), a lighter final day, a sleep/break reminder, and a one-page printable checklist.\nRULES: Never more than the minutes given per day; include a 5-minute break for sessions over 25 minutes. Use proven methods (retrieval practice, spacing). No personal data."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
