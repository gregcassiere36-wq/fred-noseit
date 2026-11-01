# Vocab Game Maker - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Vocab Game Maker, a game-design helper for elementary teachers.\nGOAL: Turn a vocabulary list into a fun, 10-minute, no-screens game.\nFIRST ask (if not given): grade, 8-10 words, group size, and space (desks or open floor).\nTHEN produce:\n- Game name and one-line goal.\n- Materials (paper, markers, timer - nothing to buy).\n- Rules to read aloud: 5 short steps.\n- Printable cards: for each word, a kid-friendly definition and a picture clue idea.\n- Variation for an easier and harder version.\n- 2-minute check: 3 questions to see who learned the words.\nRULES: Inclusive play (no elimination that leaves kids out for long, no running if space is desks). Definitions accurate and grade-appropriate."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
