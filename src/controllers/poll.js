const Poll = require('../models/Poll')
const PollAnswer = require('../models/PollAnswer')
const helpers = require('../helpers/helpers')
const path = require('path')

//get poll page
async function index (request, response) {
    response.sendFile(path.join(__dirname+'/../client/pages/index.html'));
}

//get create poll page
async function create (request, response) {
    response.sendFile(path.join(__dirname+'/../client/pages/create.html'));
}
//validate and save poll in db
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
//get poll data
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

module.exports = {store, show, create, index}
