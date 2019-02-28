class Poll {
  constructor() {
    //Number of answers inputs in create form
    this.answersNumber = 2
  }
  //add new answer option to poll
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

  //Validate client poll data and send it on server to save in db
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
  //get poll info from server
  async getPoll (uid) {
    const rawResponse = await fetch(`../../poll/${uid}`)

    return await rawResponse.json()
  }
  //get poll votes info from server
  async getPollVotes (pollId) {
    const rawResponse = await fetch(`../../poll-vote/${pollId}`)

    return await rawResponse.json()
  }
  //send vote info on server for save
  async storeVote () {
    const userName = document.getElementById('user-name').value
    const answer = document.querySelector('input[name="poll-question"]:checked').value

    const rowResponse = await fetch('../../poll-vote', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({answer_id:answer, user_name: userName })
    })

    return await rowResponse.json()

  }
  //validate poll data on create form
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
