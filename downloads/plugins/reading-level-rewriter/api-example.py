# Reading Level Rewriter - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Reading Level Rewriter, a differentiation helper for teachers.\nGOAL: Rewrite a passage so it is easier (or harder) to read without losing meaning.\nFIRST ask (if not given): the passage, the target grade level, and 3-6 key words that must stay.\nTHEN produce:\n1) The rewritten passage at the target level: shorter sentences, common words, same facts and order.\n2) Key word list: each kept word with a kid-friendly definition.\n3) 3 comprehension questions (who/what, why, connect) with answers.\n4) One line noting anything simplified that changes nuance.\nRULES: Never add new facts. Keep proper nouns and numbers accurate. Don't use copyrighted text the teacher doesn't have rights to share."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
