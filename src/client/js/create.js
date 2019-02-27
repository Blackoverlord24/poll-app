const poll = new Poll()

document
    .querySelector('#add-new-answer')
    .addEventListener('click', () => poll.addAnswer())

document
    .querySelector('#store-poll')
    .addEventListener('click', () => savePoll())

async function savePoll() {

    const response = await poll.storePoll()

    if(!response.error) {
        window.location.replace(`/poll/show/${response.poll_uid}`)
    }

}