'reach 0.1';

/*
 - who is involved in this application - Proposer, Voter
 - what information is known at the start of the application : the proposer knows the deadline, description, amount
 - what information is discovered the voter learns of the deadline, description, amount

 if a participant starts of with knowledge it's a field in the interact object,
 if a participant learns something, it's an argument to a function,
 if a participant provides something later, it's a result to a function
 
 1. Proposal - Publishes description, amount, deadline
 2. while deadline hasn't been reached
    2a. check voter's voting state
    2b. allow voter to vote
    2c. increment votes
    2d. show votes
 3. show votes
*/
const [isVote, YES, NO] = makeEnum(2);
const [isExecuted, EXECUTED, NOT_EXECUTED] = makeEnum(2);
const [isTimeout, TIMEOUT, NOT_TIMEOUT] = makeEnum(2);
const Common = {
    showOutcome: Fun([UInt, UInt, UInt, UInt], Null),
}
export const main = Reach.App(() => {
    const Proposal = Participant('Proposal', {
        ...Common,
        deadline: UInt,
        amount: UInt,
        description: Bytes(128),
    });
    const Voter = ParticipantClass('Voter', {
        ...Common,
        getVote: Fun([], Bool),
        setVoter: Fun([Address], Null),
        shouldVote: Fun([], Bool),
    });
    init();

    const showOutcome = (state, outcome, votesYes, votesNo) => {
        each([Proposal], () => interact.showOutcome(state, outcome, votesYes, votesNo));
    }

    Proposal.publish();
    commit();

    Proposal.only(() => {
        const deadline = declassify(interact.deadline);
        const amount = declassify(interact.amount);
        const description = declassify(interact.description)
    });
    //1
    Proposal.publish(deadline, amount, description);

    const [timeRemaining, keepGoing] = makeDeadline(deadline);
    const [votesYes, votesNo, outcome] =
        //2
        parallelReduce([0, 0, NOT_EXECUTED])
            .invariant(balance() == 0)
            .while(keepGoing())
            .case(Voter,
                () => ({
                    msg: declassify(interact.getVote()),
                    when: declassify(interact.shouldVote()),
                }),
                (msg) => 0,
                (msg) => {
                    const voter = this;
                    Voter.only(() => interact.setVoter(voter));
                    const [votedYes, votedNo] = msg ? [1, 0] : [0, 1]
                    const result = votesYes > votesNo ? EXECUTED : NOT_EXECUTED;
                    return [votesYes + votedYes, votesNo + votedNo, outcome];
                })
            .timeout(timeRemaining(), () => {
                Anybody.publish();
                const result = votesYes > votesNo ? EXECUTED : NOT_EXECUTED;
                showOutcome(TIMEOUT, outcome, votesYes, votesNo);
                return [votesYes, votesNo, outcome]
            });
    commit();
    showOutcome(NOT_TIMEOUT, outcome, votesYes, votesNo);
});
