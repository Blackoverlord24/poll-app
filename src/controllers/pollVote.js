const PollVote = require('../models/PollVote')
const PollAnswer = require('../models/PollAnswer')
const helpers = require('../helpers/helpers')

//validate and save poll vote in db
async function store(request, response) {
  try {

    const validation = helpers.newVoteValidation(request.body.user_name, request.body.answer_id)

    if(validation.error) {
      response.status(422).send(validation.message)
      return
    }

    await new PollVote({
      answer_id: request.body.answer_id,
      user_name: request.body.user_name,
    }).save()

    response.status(200).json({error: false})
  } catch (e) {
    console.log(e)
    response.status(422).send(e)
  }
}
//get poll vote data
async function show(request, response) {
  try {

    const pollAnswers = await PollAnswer.find({poll_id: request.params.poll_id})
    let pollVotes = []

    for (let answer of pollAnswers) {

      for (let vote of await PollVote.find({ answer_id: answer._id })) {
        pollVotes.push({
          answer_id: answer._id,
          user_name: vote.user_name
        })
      }
    }
    response.status(200).json({error: false, pollAnswers, pollVotes})
  } catch (e) {
    console.log(e)
    response.status(422).send(e)
  }
}

module.exports = {store, show}
