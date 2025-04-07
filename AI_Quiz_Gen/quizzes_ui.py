import streamlit as st
import requests
import json

st.title("AI-Powered Quiz Generator 🎯")

# Initialize session state for quiz and answers if not exists
if 'quiz' not in st.session_state:
    st.session_state.quiz = None
if 'user_answers' not in st.session_state:
    st.session_state.user_answers = {}
if 'quiz_submitted' not in st.session_state:
    st.session_state.quiz_submitted = False

# Create two columns for better layout
col1, col2 = st.columns(2)

with col1:
    programming_language = st.selectbox("Select Programming Language:", 
                                        ["Python", "Java", "JavaScript", "C++", "Go", "R", "SQL", "Rust"])
    difficulty = st.selectbox("Select Difficulty Level:", ["easy", "medium", "hard"])

with col2:
    num_questions = st.slider("Number of Questions:", 
                            min_value=5, 
                            max_value=50, 
                            value=20, 
                            step=5,
                            help="Choose how many questions you want in your quiz")

if st.button("Generate Quiz"):
    with st.spinner("Generating Quiz... Please wait."):
        try:
            response = requests.post("http://127.0.0.1:3000/generate_quiz", 
                                     json={
                                         "language": programming_language, 
                                         "difficulty": difficulty,
                                         "num_questions": num_questions
                                     })

            if response.status_code == 200:
                try:
                    quiz_data = response.json().get("quiz", [])

                    if not quiz_data:
                        st.error("Received an empty quiz. Please try again.")
                    else:
                        st.session_state.quiz = quiz_data
                        st.session_state.user_answers = {}
                        st.session_state.quiz_submitted = False
                        st.rerun()

                except json.JSONDecodeError:
                    st.error("Error: Unable to decode JSON response from API.")

            else:
                error_message = response.json().get("error", "Unknown error occurred.")
                st.error(f"API Error: {error_message}")

        except requests.exceptions.RequestException as e:
            st.error(f"Request Error: {e}")

# Display quiz if available
if st.session_state.quiz:
    st.subheader(f"Generated Quiz 📜 ({len(st.session_state.quiz)} questions)")
    
    # Create a form for the quiz
    with st.form("quiz_form"):
        for i, question in enumerate(st.session_state.quiz, start=1):
            st.write(f"**Q{i}:** {question['question']}")
            
            # Create radio buttons for options
            options = question["options"]
            selected_answer = st.radio(
                f"Select your answer for Question {i}:",
                options,
                key=f"q_{i}",
                index=None
            )
            
            # Store the selected answer
            st.session_state.user_answers[i] = selected_answer
            
            st.markdown("---")  # Add a separator between questions
        
        # Submit button
        submitted = st.form_submit_button("Submit Quiz")
        
        if submitted:
            # Check if all questions are answered
            if len(st.session_state.user_answers) == len(st.session_state.quiz):
                st.session_state.quiz_submitted = True
                st.rerun()
            else:
                st.warning("Please answer all questions before submitting!")

# Show results after submission
if st.session_state.quiz_submitted:
    st.subheader("Quiz Results 📊")
    
    score = 0
    total_questions = len(st.session_state.quiz)
    
    for i, question in enumerate(st.session_state.quiz, start=1):
        user_answer = st.session_state.user_answers.get(i)
        correct_answer = question["answer"]
        
        # Create columns for better layout
        col1, col2 = st.columns([3, 1])
        
        with col1:
            st.write(f"**Q{i}:** {question['question']}")
            st.write(f"Your answer: {user_answer}")
            st.write(f"Correct answer: {correct_answer}")
        
        with col2:
            if user_answer == correct_answer:
                st.success("Correct! ✅")
                score += 1
            else:
                st.error("Incorrect ❌")
        
        st.markdown("---")
    
    # Display final score
    percentage = (score / total_questions) * 100
    st.subheader(f"Final Score: {score}/{total_questions} ({percentage:.1f}%)")
    
    # Add a button to retry the quiz
    if st.button("Try Another Quiz"):
        st.session_state.quiz = None
        st.session_state.user_answers = {}
        st.session_state.quiz_submitted = False
        st.rerun()
