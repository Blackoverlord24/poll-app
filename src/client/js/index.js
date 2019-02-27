const poll = new Poll()
const pollUid = window.location.href.match(/(\/\b)(?!.*\1)(.+)/)[2]

drawPollForm(pollUid)

document
    .querySelector('#store-poll-answer')
    .addEventListener('click', () => saveVote())

async function saveVote() {

    if(validateVote()) { return }

    const response = await poll.storeVote()

    if(!response.error) {
        document.querySelector('.poll-form-main').innerHTML = '<h1>Thank you, your voice is saved</h1>'
    }

}

async function drawPollForm(pollUid) {
    const pollInfo = await poll.getPoll(pollUid)

    document.getElementById('poll-name').innerHTML = pollInfo.poll.name

    let answersHtmlMarkup = ''

    pollInfo.poll.answers.forEach( answer => {
        answersHtmlMarkup += `<p>
                                <input name="poll-question" type="radio" value="${answer._id}"  id="poll-answer-${answer._id}" checked/>
                                <span>${answer.answer}</span>
                              </p>`

        document.querySelector('.polling-questions').innerHTML = answersHtmlMarkup
    })
}

function validateVote () {
    let error = false

    const userName = document.querySelector('#user-name')
    const userNameSpan =  document.querySelector('.user-name span')

    if(!userName.value) {
        error = true
        userNameSpan.setAttribute("style","display:block;")
    }else{
        userNameSpan.setAttribute("style","display:none;")
    }

    return error
}