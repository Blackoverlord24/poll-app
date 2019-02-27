const newPollValidation = function (question, answers) {

    const validation = {
        error: false,
        message: []
    }

    if(!question) {
        validation.error = true
        validation.message.push('Question is required')
    }

    if(answers.length < 2) {
        validation.error = true
        validation.message.push(`At least 2 answers are required.`)
    } else {
        answers.forEach( (answer, index) => {
            if(!answer) {
                validation.error = true
                validation.message.push(`Answer ${index + 1} is required.`)
            }
        });
    }

    return validation
}

const newVoteValidation = function (name, answer_id) {

    const validation = {
        error: false,
        message: []
    }

    if(!name) {
        validation.error = true
        validation.message.push('Name is required')
    }

    if(!answer_id) {
        validation.error = true
        validation.message.push('Answer is required')
    }

    return validation
}

module.exports = {newPollValidation, newVoteValidation}