class Poll {
  constructor() {
    this.answersNumber = 2
  }

  addAnswer () {
    this.answersNumber++
    const answerHtmlMarkup = `<div class="poll-answer">
                            <b>Answer ${this.answersNumber}:</b>
                            <input type="text" placeholder="Answer on poll ${this.answersNumber}" id="create_answer_${this.answersNumber}">
                            <span>Field is required</span>
                        </div>`

    document
      .querySelector('.poll-answers')
      .insertAdjacentHTML("beforeEnd", answerHtmlMarkup);
  }

  async storePoll () {

    if(!this.validatePoll()) {  return }

    const question = document.querySelector('#create-poll-question').value
    const answers = []

    for(let i = 1; i <= this.answersNumber; i++) {
      const answer = document.getElementById(`create_answer_${i}`).value

      answers.push(answer)
    }

    const rawResponse = await fetch('../poll', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: question, answers: answers})
    })

    return await rawResponse.json()
  }

  async getPoll (uid) {
    const rawResponse = await fetch(`../../poll/${uid}`)

    return await rawResponse.json()
  }

  async storeVote () {
    const userName = document.getElementById('user-name').value
    const answer = document.querySelector('input[name="poll-question"]:checked').value

    const rowResponse = await fetch('../../poll/vote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({answer_id:answer, user_name: userName })
    })

    return await rowResponse.json()

  }

  validatePoll () {
    let validation = true

    const question = document.querySelector('#create-poll-question')
    const questionSpan =  document.querySelector('span')

    if(!question.value) {
      validation = false
      questionSpan.setAttribute("style","display:block;")
    }else{
      questionSpan.setAttribute("style","display:none;")
    }

    for(let i = 1; i <= this.answersNumber; i++) {
      const answer = document.getElementById(`create_answer_${i}`)
      const answerSpan =  answer.nextSibling.nextElementSibling

      if(!answer.value){
        validation = false
        answerSpan.setAttribute("style","display:block;")
      } else {
        answerSpan.setAttribute("style","display:none;")
      }
    }

    return validation
  }
}
