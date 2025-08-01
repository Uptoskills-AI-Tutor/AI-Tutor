import sys
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

ideal_summary = "The video explains how plants make their food using sunlight through photosynthesis."
user_summary = sys.argv[1]

embedding_ideal = model.encode(ideal_summary, convert_to_tensor=True)
embedding_user = model.encode(user_summary, convert_to_tensor=True)
score = util.pytorch_cos_sim(embedding_user, embedding_ideal).item()

if score < 0.5:
    feedback = "❌ You haven't understood the video properly."
elif score < 0.6:
    feedback = "⚠️ It's okay. Please re-watch the video."
elif score < 0.75:
    feedback = "👍 You're getting there. Almost a good summary!"
else:
    feedback = "✅ Great job! You understood the video well."

import sys
import json

response = {
    "feedback": feedback,
    "score": round(score, 2)  # Round to 2 decimal places
}

# Send this as JSON output
sys.stdout.buffer.write(json.dumps(response).encode('utf-8'))