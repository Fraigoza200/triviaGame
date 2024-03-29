const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElements = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionsIndex

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click', () =>{
    currentQuestionsIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() =>Math.random() - .5)
    currentQuestionsIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])
}
function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElements.appendChild(button)
    })
}

function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElements.firstChild) {
        answerButtonsElements.removeChild(answerButtonsElements.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElements.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length> currentQuestionsIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

const questions = [
    {
        question: 'How many outs are there in one inning?',
        answers: [
            {text:'6', correct: true},
            {text:'3', correct: false},
            {text: '9', correct: false},
            {text:'5', correct: false}
        ]

    },
    {
        question:'How many teams are there in Major League Baseball?',
        answers: [
            {text:'32', correct: true},
            {text:'24', correct: false},
            {text:'42', correct: false},
            {text:'16', correct: false}
        ]
    },
    {
        question: 'How many  defensive players are there on the field during each inning of play?',
        answers: [
           {text: '12', correct: false},
           {text: '6', correct: false},
           {text: '9', correct: true},
           {text: '18', correct: false}
        ]
    },
    {
        question: 'Not including the Major Leagues, what accessories are used to hit the baseball?',
        answers: [
            {text:'bat', correct: true},
            {text: 'broom stick', correct: true},
            {text: 'metal batl', correct: true},
            {text: 'A persons hand', correct: false}
        ]
    }
]