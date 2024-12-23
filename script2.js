const All_Questions = [
    {
        'Question': 'What is the capital of France?',
        'options': ["Berlin", "Madrid", "Paris", "Rome"],
        'correct_answer': 'Paris'
    },
    {
        'Question': 'Which planet is known as the Red Planet?',
        'options': ["Earth", "Mars", "Jupiter", "Saturn"],
        'correct_answer': "Mars"
    },
    {
        'Question': "Who wrote 'Hamlet'?",
        'options': ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        'correct_answer': "Shakespeare"
    },
    {
        'Question': "What is the largest ocean on Earth?",
        'options': ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        'correct_answer': "Pacific Ocean"
    },
];

let Count_All_Questions = 0;
let score = 0;

const Box = document.getElementById('box');
const Quiz = document.getElementById('quiz');
const question_container = document.getElementById('question_container');
const question = document.getElementById('question');
const ul = document.getElementById('options');
const next_btn = document.getElementById('next_btn');
const result = document.getElementById('result');
const Rank = document.getElementById('Rank');
const restart_btn = document.getElementById('restart_btn');

function loadQuestion() {
    let Question_Answer = All_Questions[Count_All_Questions];

    let Question = Question_Answer.Question;
    question.innerHTML = Question;

    let options = Question_Answer.options;

    // पहले के विकल्पों को हटाना
    ul.innerHTML = '';

    options.forEach((opt) => {
        const li = document.createElement('li');
        li.innerHTML = opt;
        li.addEventListener('click', checkAnswer);
        ul.appendChild(li);
    });

    // 'next_btn' को छिपाना जब तक कोई उत्तर न दिया जाए
    next_btn.classList.add('hidden');
}

function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correct_answer = All_Questions[Count_All_Questions].correct_answer;

    if (selectedAnswer === correct_answer) {
        score++;
    }

    // सभी विकल्पों को निष्क्रिय करना
    document.querySelectorAll('li').forEach((opt) => {
        opt.classList.add('disabled');
        if (opt.textContent === correct_answer) {
            opt.style.backgroundColor = "#4CAF50"; // सही उत्तर हरा होगा
        } else if (opt.textContent === selectedAnswer) {
            opt.style.backgroundColor = 'red'; // गलत उत्तर लाल होगा
        }
    });

    next_btn.classList.remove('hidden'); // 'next' बटन को दिखाना
}

function nextQuestion() {
    Count_All_Questions++;

    if (Count_All_Questions < All_Questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    result.classList.remove('hidden');
    Rank.innerHTML = `${score} / ${All_Questions.length}`;
}

function restartQuiz() {
    Count_All_Questions = 0;
    score = 0;
    result.classList.add("hidden");
    loadQuestion();
    next_btn.classList.add("hidden");
}

// 'next_btn' और 'restart_btn' पर इवेंट लिसनर जोड़ना
next_btn.addEventListener("click", nextQuestion);
restart_btn.addEventListener("click", restartQuiz);

// पहला सवाल लोड करना
loadQuestion();
