const poll = new Poll()
//get poll uid from url
const pollUid = window.location.href.match(/(\/\b)(?!.*\1)(.+)/)[2]

if(localStorage.getItem('is_already_voted') === '1') {
  document.querySelector('.poll-form-main').innerHTML = '<h1>You have already voted</h1>'
}else{
  drawPollForm()
  document
    .querySelector('#store-poll-answer')
    .addEventListener('click', () => saveVote())
}

drawTableResults()

//refresh table poll results every 10 sec
setInterval(function () {
  drawTableResults()
}, 10000)

async function saveVote() {
  const pollForm = document.querySelector('.poll-form-main')

  if (validateVote()) {
    return
  }

  const response = await poll.storeVote()

  if (!response.error) {
    localStorage.setItem('is_already_voted', '1');
    pollForm.innerHTML = '<h1>Thank you, your voice is saved</h1>'
    drawTableResults()
  }
}

//make and show poll form with answers
async function drawPollForm() {
  const pollInfo = await poll.getPoll(pollUid)

  document.getElementById('poll-name').innerHTML = pollInfo.poll.name

  let answersHtmlMarkup = ''

  pollInfo.poll.answers.forEach(answer => {
    answersHtmlMarkup += `<p>
                                <input name="poll-question" type="radio" value="${answer._id}"  id="poll-answer-${answer._id}" checked/>
                                <span>${answer.answer}</span>
                              </p>`

    document.querySelector('.polling-questions').innerHTML = answersHtmlMarkup
  })
}

//make and show poll table results
async function drawTableResults() {
  const tableHead = document.querySelector('.poll-result table thead tr')
  const tableBody = document.querySelector('.poll-result table tbody')

  const pollInfo = await poll.getPollVotes(pollUid)
  const answers = pollInfo.pollAnswers
  const votes = pollInfo.pollVotes

  let tableHeadHtmlMarkup = '<th>Name</th>'

  answers.forEach(answer => {
    tableHeadHtmlMarkup += `<th>${answer.answer}</th>`
  })

  tableHead.innerHTML = tableHeadHtmlMarkup

  let tableBodyHtmlMarkup = ''

  votes.forEach(vote => {
    tableBodyHtmlMarkup += `<tr><td>${vote.user_name}</td>`

    answers.forEach(answer => {
      tableBodyHtmlMarkup += `<td id="${vote.user_name}_${answer._id}"></td>`
    })

    tableBodyHtmlMarkup += '</tr>'
  })
  tableBody.innerHTML = tableBodyHtmlMarkup

  votes.forEach(vote => {

    document.getElementById(`${vote.user_name}_${vote.answer_id}`).innerHTML = 'X'

  })
}

function validateVote() {
  let error = false

  const userName = document.querySelector('#user-name')
  const userNameSpan = document.querySelector('.user-name span')

  if (!userName.value) {
    error = true
    userNameSpan.setAttribute("style", "display:block;")
  } else {
    userNameSpan.setAttribute("style", "display:none;")
  }

  return error
}
