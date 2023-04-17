import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../css/Question.css"
import { useParams } from 'react-router-dom'
import constants from '../constants';

import styled from "styled-components";
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';

const Body = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`


const QuizParticipant = () => {

    const [quizName, setQuizName] = useState()
    const [questions, setQuestions] = useState([])

    const params = useParams();
    const _id = params.id;


    const fetchQuizDetails = async () => {
        axios.get(`${constants.baseUrl}quizzes/${_id}`).then((data) => {
            setQuizName(`${data.data["module_code"]} Grade ${data.data["student_grade"]}`)
        }).catch(err => {
            console.log("get quiz details failed " + err)
        })
    }


    const fetchQuestions = async () => {
        await axios.get(`${constants.baseUrl}questions`).then((data) => {
            let qs = data.data
            qs = qs.filter((data) => {
                return data.quiz_id == _id;
            })
            setQuestions(qs)
        }).catch(err => {
            console.log("get questions failed " + err)
        })
    }


    useEffect(() => {
        fetchQuizDetails().then(() => fetchQuestions());
    }, [_id])
    return (
        <Body>
            <Title level={3}>{quizName}</Title>
            <Divider />
            {questions.map(question => (
                <div key={question.id}>
                    <h2>{question.question}</h2>
                    <ul>
                        <li key={question.answer_1}>
                            <label>
                                <input type="radio" name={`question-${question.question}`} value={0} />
                                {question.answer_1}
                            </label>
                        </li>
                        <li key={question.answer_2}>
                            <label>
                                <input type="radio" name={`question-${question.question}`} value={2} />
                                {question.answer_2}
                            </label>
                        </li>
                        <li key={question.answer_3}>
                            <label>
                                <input type="radio" name={`question-${question.question}`} value={3} />
                                {question.answer_3}
                            </label>
                        </li>
                        <li key={question.answer_4}>
                            <label>
                                <input type="radio" name={`question-${question.question}`} value={4} />
                                {question.answer_4}
                            </label>
                        </li>
                    </ul>
                </div>
            ))}
        </Body>
    )
}

export default QuizParticipant