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
    questionElement.innerHTML = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElements.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElements.firstChild) {
        answerButtonsElements.removeChild(answerButtonsElements.firstChild)
    }
}

function selectAnswer() {
    const selectedButtons = event.target
    const correct = selectedButtons.dataset.correct
    setStatusClass(document.body.correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionsIndex + 1){ 
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText= 'Restart'
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
            {text:'3', correct: false}
        ]

    }
]