const codingQuestions = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Highly Typed Modeling Language", "Hyper Transfer Markup Language", "High Test Markup Language"],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "Which of the following is a programming language?",
      options: ["HTML", "CSS", "JavaScript", "SQL"],
      correctAnswer: "JavaScript"
    },
    {
      question: "What is the purpose of CSS?",
      options: ["To create dynamic web pages", "To style the appearance of web pages", "To manage server-side data", "To define database structures"],
      correctAnswer: "To style the appearance of web pages"
    },
    {
      question: "What does JavaScript primarily allow you to do?",
      options: ["Style web pages", "Create interactive web pages", "Define database structures", "Manage server-side data"],
      correctAnswer: "Create interactive web pages"
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["//", "/*", "#", "--"],
      correctAnswer: "//"
    },
    {
      question: "What is the purpose of the 'git pull' command?",
      options: ["Push changes to a remote repository", "Fetch changes from a remote repository", "Merge changes from a remote repository", "Create a new branch"],
      correctAnswer: "Fetch changes from a remote repository"
    },
    {
      question: "Which function is used to print output in JavaScript?",
      options: ["echo", "print", "console.log", "display"],
      correctAnswer: "console.log"
    },
    {
      question: "What is the purpose of the 'border-radius' property in CSS?",
      options: ["Set the color of the border", "Specify the width of the border", "Round the corners of an element", "Create a shadow around an element"],
      correctAnswer: "Round the corners of an element"
    },
    {
      question: "Which of the following is NOT a valid data type in JavaScript?",
      options: ["Number", "String", "Boolean", "Float"],
      correctAnswer: "Float"
    },
    {
      question: "What does the acronym API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Processing Interface"],
      correctAnswer: "Application Programming Interface"
    }
  ];
  
  
 
let currentQuestionIndex = 0;

function validateAge() {
  const ageInput = document.getElementById("age");
  const ageError = document.getElementById("age-error");

  const validAge = /^(1[6-9]|[2-5][0-9]|60)$/;
  const isValid = validAge.test(ageInput.value);

  if (!isValid) {
    ageError.textContent = "Please enter a valid age between 16 and 60";
    ageInput.setCustomValidity("Invalid age");
  } else {
    ageError.textContent = "";
    ageInput.setCustomValidity(""); // Clear custom validation message
  }
}

function validateName() {
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("name-error");

  const validCharacters = /^[A-Za-z ]+$/;
  const isValid = validCharacters.test(nameInput.value);

  if (!isValid) {
    nameError.textContent = "Please enter a valid name with only characters";
    nameInput.setCustomValidity("Invalid characters in the name");
  } else {
    nameError.textContent = "";
    nameInput.setCustomValidity(""); // Clear custom validation message
  }
}

function submitUserInfo() {
  // Check age and name validation before submitting
  validateAge();
  validateName();

  const ageInput = document.getElementById("age");
  const nameInput = document.getElementById("name");

  // Perform any desired actions with the user information if both age and name are valid
  if (ageInput.checkValidity() && nameInput.checkValidity()) {
    const age = ageInput.value;
    console.log(`Name: ${nameInput.value}, Age: ${age}`);

    // Show the quiz page
    document.getElementById("user-form").style.display = "none";
    document.getElementById("quiz-page").style.display = "block";

    // Generate and display quiz questions
    displayQuestion(currentQuestionIndex);
  }

  // Prevent the form from submitting
  return false;
}

function displayQuestion(questionIndex) {
  const quizQuestionsContainer = document.getElementById("quiz-questions");

  // Clear the previous question and options
  quizQuestionsContainer.innerHTML = "";

  // Display the current question
  const currentQuestion = codingQuestions[questionIndex].question;
  const questionElement = document.createElement("p");
  questionElement.textContent = currentQuestion;
  quizQuestionsContainer.appendChild(questionElement);

  // Display options
  const options = codingQuestions[questionIndex].options;
  options.forEach((option, index) => {
    const optionLabel = document.createElement("label");
    optionLabel.innerHTML = `<input type="radio" name="q${questionIndex}" value="${option}">${option}<br>`;
    quizQuestionsContainer.appendChild(optionLabel);
  });

  // Enable the "Next Question" button
  document.getElementById("next-question-btn").disabled = false;
}

let score = 0; // Initialize score variable

let userResponses = []; // Array to store user responses

function nextQuestion() {
  const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);

  // Check if an option is selected
  if (selectedOption) {
    // Store the user's response
    userResponses.push(selectedOption.value);

    // Check if the selected option is correct
    if (selectedOption.value === codingQuestions[currentQuestionIndex].correctAnswer) {
      // Increment the score for correct answers
      score++;
    }

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < codingQuestions.length) {
      // Display the next question
      displayQuestion(currentQuestionIndex);
    } else {
      // No more questions, hide the "Next Question" button, show the "Submit Quiz" button
      document.getElementById("next-question-btn").style.display = "none";
      document.getElementById("submit-quiz-btn").style.display = "block";
    }
  } else {
    // Inform the user to select an option before proceeding
    alert("Please select an option before moving to the next question.");
  }
}

function submitQuiz() {
  // Display the cumulative score and user responses
  const scoreNotification = document.getElementById("score-notification");
  const scoreMessage = document.getElementById("score-message");

  scoreMessage.textContent = `Your final score: ${score} out of ${codingQuestions.length}`;
  scoreNotification.style.display = "block";

  // Display user responses (for demonstration purposes)
  console.log("User Responses:", userResponses);

  // Reset quiz state and return to the first page after a delay (e.g., 3 seconds)
  setTimeout(() => {
    // Hide the "Submit Quiz" button and show the "Next Question" button
    document.getElementById("submit-quiz-btn").style.display = "none";
    document.getElementById("next-question-btn").style.display = "block";

    // Reset question index, score, and user responses
    currentQuestionIndex = 0;
    score = 0;
    userResponses = [];

    // Show the user form (first page)
    document.getElementById("user-form").style.display = "block";
    document.getElementById("quiz-page").style.display = "none";

    // Clear any selected options
    document.querySelectorAll('input[type="radio"]:checked').forEach((radio) => {
      radio.checked = false;
    });

    // Reset the score notification
    scoreNotification.style.display = "none";
  }, 10000); // 3000 milliseconds (3 seconds)
}

