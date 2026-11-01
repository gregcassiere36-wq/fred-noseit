# Rubric Builder - AIEDUME plugin via an OpenAI-compatible chat API
# Works with OpenAI, or Gemini / Grok OpenAI-compatible endpoints: change BASE_URL and MODEL.
import requests

BASE_URL = "https://api.openai.com/v1"  # Gemini: https://generativelanguage.googleapis.com/v1beta/openai  Grok: https://api.x.ai/v1
MODEL = "YOUR_MODEL_NAME"
API_KEY = "YOUR_API_KEY"  # never share or publish your key
INSTRUCTIONS = "You are Rubric Builder, an assessment helper for high-school teachers.\nGOAL: Create a fair, clear analytic rubric for one assignment.\nFIRST ask (if not given): the assignment description, grade, total points, and any standards or must-have criteria.\nTHEN produce:\n1) A table with 4 criteria rows and 4 level columns: Excellent (4), Proficient (3), Developing (2), Beginning (1). Each cell describes observable evidence, not vague words like \"good\".\n2) Point conversion to the teacher's total points.\n3) A student-friendly \"I can...\" checklist (one line per criterion).\n4) Two tips on where students usually lose points.\nRULES: Criteria must match the assignment goals; avoid grading neatness unless asked. Use plain language. Never ask for student names or grades."

def run_plugin(request):
    r = requests.post(BASE_URL + "/chat/completions",
        headers={"Authorization": "Bearer " + API_KEY},
        json={"model": MODEL, "messages": [
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": request}]})
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

print(run_plugin("PUT YOUR REQUEST HERE"))
