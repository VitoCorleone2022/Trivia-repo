
let questionBtn = document.getElementById('question-btn')
let playBtn = document.getElementById('play-btn')

// botón de prueba
questionBtn.addEventListener('click', () => {
    getQuestion()
})

const getQuestion = async () => {
    const result = await
        axios
            .get('https://opentdb.com/api.php?amount=10&category=31&type=boolean')
            .then((questions) => {
                $('#question').html(`<div> ${questions.data.results[0].question} </div>`)
                console.log(questions.data.results[0].question);

                if (questions.data.results[0].type === 'boolean') {
                    console.log('boolean')
                    let wrongAnswer = questions.data.results[0].incorrect_answers[0]
                    let rightAnswer = questions.data.results[0].correct_answer

                    $('#question').append(`<div id="wrong-btn" class="btn"> ${wrongAnswer} </div>`)
                    $('#question').append(`<div id="right-btn" class="btn"> ${rightAnswer} </div>`)

                    //interaction
                    $('#right-btn').click(function () {
                        console.log('this is the right answer:' + rightAnswer)
                        $('#solution').text('Correct :)')
                        $('#right-btn').addClass('right')
                        $('#wrong-btn').off("click")
                        nextButton()
                    })
                                    
                    $('#wrong-btn').click(function () {
                        console.log('this is the wrong answer:' + wrongAnswer)
                        $('#solution').text('Wrong :c')
                        $('#wrong-btn').addClass('wrong')
                        $('#right-btn').off("click")
                        nextButton()
                    })
                }

                //Multiple answers - Work in progress
                if (questions.data.results[0].type === 'multiple') {
                    console.log('multiple')
                }
            }
            )
            .catch((err) => {
                console.log('rejected: ', err)
            })
}

function nextButton() {
    $('#next-btn').fadeIn()
}

$('#play-btn').click(function () {
    $('#play-btn').fadeOut()
    $('#intro').fadeOut()
    getQuestion()
})

$('#next-btn').click(function() {
    getQuestion()
    $('#solution').text('')
    $('#next-btn').fadeOut()
})

// work in progress
function randomAnswersButtonOrder () {

}

