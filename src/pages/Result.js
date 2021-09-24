import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useAnswers from '../hooks/useAnswers'
import Analysis from './Analysis'
import Summery from './Summery'
import _ from 'lodash'

export default function Result() {
    const { id } = useParams()
    const { location } = useHistory()
    const { state } = location;
    const { qna } = state;

    const { loading, error, answers } = useAnswers(id)

    function calculate() {

        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndex = []
            let checkedIndex = []

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndex.push(index2)
                if (qna[index1].options[index2].checked) {
                    checkedIndex.push(index2)
                    option.checked = true;
                }
            })
            if (_.isEqual(correctIndex, checkedIndex)) {
                score = score + 5;
            }
        })
        return score;
    }

    const userScore = calculate()

    return (
        <>
            {loading && <div> Loading... </div>}
            {error && <div> There was an Error! </div>}
            {answers && answers.length > 0 && (
                <>
                    <Summery score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    )
}
