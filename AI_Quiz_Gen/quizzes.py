from flask import Flask, request, jsonify
import google.generativeai as genai
import json
import re

app = Flask(__name__)

# Configure Gemini API (Replace with your actual API key)
genai.configure(api_key="AIzaSyDX7ZppvqpUBhqe_ezA5Wmm9AZ7TYCewVg")

def clean_json_string(text):
    """Clean the JSON string by removing markdown code blocks and fixing common issues."""
    # Remove markdown code blocks if present
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    
    # Remove any leading/trailing whitespace
    text = text.strip()
    
    # Fix common JSON formatting issues
    text = re.sub(r',\s*}', '}', text)  # Remove trailing commas in objects
    text = re.sub(r',\s*]', ']', text)  # Remove trailing commas in arrays
    text = re.sub(r'[\n\r\t]', '', text)  # Remove newlines and tabs
    
    # Fix the "answer" field that's sometimes incorrectly placed
    text = re.sub(r',\s*"answer":\s*"([^"]+)"\s*}', r', "answer": "\1"}', text)
    
    return text

def fix_question_format(question):
    """Fix common issues in question format."""
    if not isinstance(question, dict):
        return None
    
    # Ensure all required fields are present
    required_fields = ['question', 'options', 'answer']
    if not all(field in question for field in required_fields):
        return None
    
    # Ensure options is a list
    if not isinstance(question['options'], list):
        return None
    
    # Ensure answer is one of the options
    if question['answer'] not in question['options']:
        return None
    
    return question

def generate_mcq(programming_language, difficulty, num_questions=20):
    prompt = (
        f"Generate a multiple-choice quiz in {programming_language} with {num_questions} questions. "
        f"The quiz should contain 60% theoretical and 40% coding-based MCQs. "
        f"Ensure the difficulty level is {difficulty}. Provide four options per question and mark the correct answer. "
        f"Return output as a valid JSON array without explanations or markdown formatting. "
        f"Each question should have exactly these fields: question, options (array), answer (string)."
    )

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        # 🔍 Debug: Print Raw API Response
        print("🔍 Raw Gemini API Response:", response.text)

        if not response or not response.text:
            return jsonify({"error": "Empty response from Gemini API. Please check your API key and try again."})

        # Clean and parse the response
        cleaned_text = clean_json_string(response.text)
        
        try:
            # First attempt: direct JSON parsing
            quiz_data = json.loads(cleaned_text)
        except json.JSONDecodeError as e:
            print(f"⚠️ Initial JSON parsing failed: {str(e)}")
            try:
                # Second attempt: extract JSON array and parse
                json_start = cleaned_text.find("[")
                json_end = cleaned_text.rfind("]")
                if json_start != -1 and json_end != -1:
                    json_str = cleaned_text[json_start:json_end + 1]
                    quiz_data = json.loads(json_str)
                else:
                    raise ValueError("No valid JSON array found in response")
            except Exception as e:
                print(f"❌ Error extracting JSON: {str(e)}")
                return jsonify({"error": "Failed to parse quiz data. Please try again."})

        if not isinstance(quiz_data, list):
            return jsonify({"error": "Quiz data format is incorrect. Expected a list of questions."})

        # Validate and fix each question
        valid_questions = []
        for question in quiz_data:
            fixed_question = fix_question_format(question)
            if fixed_question:
                valid_questions.append(fixed_question)

        if not valid_questions:
            return jsonify({"error": "No valid questions found in the generated quiz. Please try again."})

        return jsonify({"quiz": valid_questions})

    except Exception as e:
        print(f"❌ Error generating quiz: {str(e)}")
        return jsonify({"error": f"Failed to generate quiz: {str(e)}"})

@app.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided in request"})

        if "language" not in data or "difficulty" not in data:
            return jsonify({"error": "Missing required fields. Please provide 'language' and 'difficulty'."})

        programming_language = data["language"].strip()
        difficulty = data["difficulty"].strip()
        num_questions = int(data.get("num_questions", 20))  # Default to 20 if not provided

        if not programming_language or not difficulty:
            return jsonify({"error": "Language and difficulty cannot be empty"})

        return generate_mcq(programming_language, difficulty, num_questions)

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True, port=3000)
