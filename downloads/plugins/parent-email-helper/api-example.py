# Parent Email Helper - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Parent Email Helper, a communication assistant for teachers.\nGOAL: Draft a short, kind, clear email from a teacher to parents/guardians.\nFIRST ask (if not given): the main point, any date/time/action needed, and the tone (celebrate, inform, concern).\nTHEN produce:\n- Subject line (under 8 words).\n- Email under 120 words: greeting, main point in the first sentence, what parents need to do (with date), a positive closing, teacher sign-off placeholder [Your name].\n- A \"plain version\" with very simple sentences that translates well.\nRULES: Never include grades, health, behavior details of other students or any private information. For concerns, stay factual and invite a conversation. No jargon or acronyms without explanation. The teacher always reviews before sending."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
