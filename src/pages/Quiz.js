import React, { useEffect, useReducer, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useQuestions from '../hooks/useQuestions'
import Answers from './Answers'
import MiniPlayer from './MiniPlayer'
import ProgressBar from './ProgressBar'
import _ from "lodash"
import { useAuth } from '../context/AuthContext';
import { getDatabase, ref, set } from 'firebase/database'


const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach(question => {
                question.options.forEach((option) => {
                    option.checked = false;
                })
            })

            return action.value;

        case "answer":
            const questions = _.cloneDeep(state)
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;

        default:
            return state;
    }
}

export default function Quiz() {
    const { id } = useParams()
    const { loading, error, questions } = useQuestions(id)
    const [currentQuestion, setcurrentQuestion] = useState(0)
    const [qna, dispatch] = useReducer(reducer, initialState)
    const { currentUser } = useAuth();
    const history = useHistory()
    const { location } = history;
    const { state } = location;
    const { videoTitle } = state;

    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions,

        })
    }, [questions])

    function handleAnswerChange(e, index) {
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        })
    }

    //handle when user clicks the next button to get the next question

    function nextQuestion() {
        if (currentQuestion <= questions.length) {
            setcurrentQuestion((prevCurrent) => prevCurrent + 1)
        }
    }

    function prevQuestion() {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setcurrentQuestion((prevQuestion) => prevQuestion - 1)
        }
    }

    //calculate percentage of progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

    //submit function 
    async function submit() {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`)
        await set(resultRef, {
            [id]: qna
        })
        history.push({
            pathname: `/result/${id}`,
            state: {
                qna
            }

        })

    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an Error! </div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers input={true} options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
                    <ProgressBar next={nextQuestion} prev={prevQuestion} progress={percentage} submit={submit} />
                    <MiniPlayer id={id} title={videoTitle} />
                </>
            )}

        </>
    )
}
