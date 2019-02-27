const Poll = require('../models/Poll')
const PollAnswer = require('../models/PollAnswer')
const PollVote = require('../models/PollVote')
const helpers = require('../helpers/helpers')
const path = require('path');

async function index (request, response) {
    response.sendFile(path.join(__dirname+'/../client/pages/index.html'));
}

async function create (request, response) {
    response.sendFile(path.join(__dirname+'/../client/pages/create.html'));
}

async function storeVote (request, response) {
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

async function store (request, response) {

    try {
        const validation = helpers.newPollValidation(request.body.name, request.body.answers)

        if(validation.error) {
            response.status(422).send(validation.message)
            return
        }

        const poll = await new Poll({
            name: request.body.name
        }).save()

        await request.body.answers.forEach( answer => {
            new PollAnswer({
                poll_id: poll.id,
                answer
            }).save()
        });

        response.status(200).json({error: false, poll_uid: poll._id})
    } catch (e) {
        console.log(e)
        response.status(422).send(e)
    }
}

async function show (request, response) {
    try {
        const poll = await Poll.findById(request.params.id)
        const pollAnswers = await PollAnswer.find({poll_id: request.params.id})

        response.status(200).json({error: false, poll:{ name: poll.name, answers: pollAnswers}})

    } catch (e) {
        console.log(e)
        response.status(422).send(e)
    }
}

module.exports = {store, show, storeVote, create, index}