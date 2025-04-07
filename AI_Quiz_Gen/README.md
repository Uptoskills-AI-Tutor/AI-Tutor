# AI-Powered Quiz Generator 🎯

An interactive quiz application that generates programming-related multiple-choice questions using Google's Gemini AI. The application features a modern web interface built with Streamlit and a Flask backend that handles quiz generation.

## Features ✨

- **Multiple Programming Languages**: Support for various programming languages including Python, Java, JavaScript, C++, Go, R, SQL, and Rust
- **Difficulty Levels**: Choose between easy, medium, and hard difficulty levels
- **Customizable Quiz Length**: Generate quizzes with 5-50 questions
- **Mixed Question Types**: 60% theoretical and 40% coding-based questions
- **Interactive UI**: Clean and user-friendly interface
- **Instant Feedback**: Immediate scoring and answer review
- **Progress Tracking**: Track your performance across different topics

## Prerequisites 📋

- Python 3.8 or higher
- Google Gemini API key

## Installation 🚀

1. Clone the repository:
```bash
git clone <your-repository-url>
cd AI_Quiz_Gen
```

2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

3. Configure your Gemini API key:
   - Open `quizzes.py`
   - Replace the API key placeholder with your actual Gemini API key:
   ```python
   genai.configure(api_key="your-api-key-here")
   ```

## Running the Application 🏃‍♂️

1. Start the Flask backend server:
```bash
python quizzes.py
```

2. In a new terminal, start the Streamlit frontend:
```bash
streamlit run quizzes_ui.py
```

3. Open your web browser and navigate to the URL shown in the Streamlit output (typically http://localhost:8501)

## Usage Guide 📖

1. Select your preferred programming language from the dropdown menu
2. Choose the difficulty level
3. Adjust the number of questions using the slider
4. Click "Generate Quiz" to create a new quiz
5. Answer all questions and submit your quiz
6. Review your results and see which questions you got right or wrong
7. Try another quiz by clicking "Try Another Quiz"

## Project Structure 📁

- `quizzes.py`: Flask backend server that handles quiz generation using Gemini AI
- `quizzes_ui.py`: Streamlit frontend interface for user interaction
- `requirements.txt`: List of Python dependencies

## Technologies Used 🛠️

- **Frontend**: Streamlit
- **Backend**: Flask
- **AI**: Google Gemini AI
- **HTTP Client**: Requests
- **Data Format**: JSON

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- Google Gemini AI for providing the quiz generation capabilities
- Streamlit and Flask communities for the excellent frameworks 