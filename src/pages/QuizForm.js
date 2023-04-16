import styled from "styled-components";
import React, { useState } from 'react';
import { HomeFilled } from '@ant-design/icons';
import { Button, Tooltip, Typography, Input, Row, Col, Form, Select, DatePicker, TimePicker, Card, Alert } from 'antd';
import SpacerBoxHorizontal from "../components/SpacerBoxHorizontal";
import CustomFormItem from "../components/CustomFormItem";
import CustomButton from "../components/Button"
import { useEffect } from "react";
import constants from "../constants";
import Question from "../models/question_model";
import axios from "axios";
import moment from 'moment';
const { Text, Title } = Typography;

const { Option } = Select;

const Wrapper = styled.div`
  background-color: #d4d6d9;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display:flex;
  width : 100%;
  align-items:center;
  height : 50px;
  background-color:white;
  padding: 0 32px;
`
const TitleWrapper = styled.div`
  background-color: #F30909;
  font-size:1rem;
  padding: 8px 16px;
  border-radius: 10px;
`


const Container = styled.div`
  width : 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

function QuizForm() {
  const [grades, setGrades] = useState([])
  const [moduleCodes, setModuleCodes] = useState([])
  const [teacherIds, setTeachersIds] = useState([])
  const [moduleCode, setModuleCode] = useState('');
  const [studentGrade, setStudentGrade] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [quizDate, setQuizDate] = useState('');
  const [quizStartTime, setQuizStartTime] = useState('');
  const [quizEndTime, setQuizEndTime] = useState('');
  const [numberOfMCQs, setNumberOfMCQs] = useState('');
  const [questions, setQuestions] = useState([]);
  const [generateClicked, setGenaerateClicked] = useState(false)
  const [question, setQuestion] = useState();
  const [correctAnsweIndex, setCorrectAnswerIndex] = useState()
  const [answer, setAnswer] = useState()
  const [answers, setAnswers] = useState([])

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };


  useEffect(() => {
    setModuleCodes(constants.moduleCodes)
    setTeachersIds(constants.teacherIds)
    setGrades(constants.grades)
  }, [])


  const submit = async () => {
    await createQuiz();
  }

  const createQuestion = async () => {

  }

  const createQuiz = async () => {
    const data = {
      "module_code": moduleCode,
      "student_grade": studentGrade,
      "teacher_id": teacherId,
      "date_of_quiz": quizDate,
      "start_time_of_quiz": quizStartTime.format("HH:mm:ss"),
      "end_time_of_quiz": quizEndTime.format("HH:mm:ss"),
      "number_of_mcqs": numberOfMCQs
    }
    console.log(data)
    axios.post(`${constants.baseUrl}quizes`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error))

  }



  return (
    <Wrapper>
      <Header>
        <div style={{ flex: 1 }}>
          <Tooltip title="search" >
            <Button type="primary" shape="circle" icon={<HomeFilled />} />
          </Tooltip>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <TitleWrapper >
            <Text>
              Upload Quiz
            </Text>
          </TitleWrapper>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>

        </div>
      </Header>
      <Container>
        <Form
          style={{ width: "80vw", margin: 0, padding: 0 }}
        >
          <>
            <Row>
              <Col span={11}>
                <Form.Item

                  name="module-code"
                  label="Module Code"
                  rules={[{ required: true, message: 'Please select module code!' }]}
                >
                  <Select placeholder="select module code"
                    onChange={(e) => { setModuleCode(e) }}
                  >
                    {
                      moduleCodes.map((code, index) => {
                        return <Option value={code} key={index}>{code}</Option>
                      })
                    }
                  </Select>
                </Form.Item>

              </Col>
              <SpacerBoxHorizontal />
              <Col span={11}>
                <Form.Item
                  name="grade"
                  label="Select Grade"
                  rules={[{ required: true, message: 'Please select grade!' }]}
                >
                  <Select placeholder="select  grade"
                    onChange={(e) => { setStudentGrade(e) }}
                  >
                    {
                      grades.map((code, index) => {
                        return <Option value={code} key={index}>{code}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item
                  name="teacher_id"
                  label="Select Teacher Id"
                  rules={[{ required: true, message: 'Please select teacher s id!' }]}
                >
                  <Select placeholder="select  teacher id"
                    onChange={(e) => { setTeacherId(e) }}
                  >
                    {
                      teacherIds.map((code, index) => {
                        return <Option value={code} key={index}>{code}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              <SpacerBoxHorizontal />
              <Col span={11}>
                <Form.Item name="quiz-date" label="Quiz Date" {...config}>
                  <DatePicker onChange={(e) => { setQuizDate(e) }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item name="start-time" label="Quiz Start Time" {...config}>
                  <TimePicker onChange={(e) => { setQuizStartTime(e) }} />
                </Form.Item>
              </Col>
              <SpacerBoxHorizontal />
              <Col span={6}>
                <Form.Item name="end-time" label="Quiz End Time" {...config}>
                  <TimePicker onChange={(e) => { setQuizEndTime(e) }} />
                </Form.Item>
              </Col>
              <SpacerBoxHorizontal />

              <CustomFormItem
                onChange={(e) => { setNumberOfMCQs(e) }}
                required={true}
                label={"Number of MCQ's"}
                colspan={6}
                message={"Number of mcqs are required!"}
              />

            </Row>
            <Title level={3}>Questions</Title>
            <Card style={{ marginBottom: 16 }}>
              <ol>{
                questions && questions.map((question, index) => {
                  return <li key={index}>{
                    <p>
                      Question :   {question.getQuestion()}
                      <br />
                      Answers <br />
                      {
                        question.getAnswers().map((answer, index) => {
                          return answer ?? <span key={index}> {`${index} : ${answer}`}</span>
                        })
                      }
                    </p>
                  }</li>
                })
              }</ol>

            </Card>
            <Title level={3}>Add Question</Title>

            <CustomFormItem
              value={question}
              label={"Enter Question"}
              required={true}
              message={"Please enter an question"}
              onChange={(e) => { setQuestion(e.target.value) }}
              colspan={24}
            />

            <ol>{answers.map((item, index) => (
              <li key={index}>{item}</li>
            ))}</ol>;

            {answers.length <= 3 && <Row>
              <CustomFormItem
                label={"Add Answer"}
                required={true}
                value={answer}
                message={"Please enter an question"}
                onChange={(e) => { setAnswer(e.target.value) }}
                colspan={16}
              />
              <SpacerBoxHorizontal />
              <Button
                type="primary"
                onClick={() => {
                  let a = answers;
                  a.push(answer)
                  setAnswers([...a])
                  setAnswer("")

                }}
              >
                Add Answer
              </Button>
            </Row>}
            <CustomFormItem
              label={"Correct Answer Index"}
              required={true}
              message={"Correct Answer Index"}
              colspan={8}
              onChange={(e) => { setCorrectAnswerIndex(e.target.value) }}
              value={correctAnsweIndex}
            />

            <Row>
              <Col span={24} >
                <CustomButton
                  onClick={() => {

                    if (question !== "" && answers.length > 0 && correctAnsweIndex !== "") {
                      const q = new Question(
                        question,
                        answers[0] ?? "",
                        answers[1] ?? "",
                        answers[2] ?? "",
                        answers[3] ?? "",
                        parseInt(correctAnsweIndex)
                      );
                      const qs = questions;
                      qs.push(q)
                      setQuestions(qs)
                      setQuestion("")
                      setAnswers([])
                      setAnswer("")
                      setCorrectAnswerIndex("")
                      console.log(questions.length)
                    } else {

                    }

                  }}
                  text={"Add Question"}
                  color={"#13A43B"}
                  width={"100%"}
                  height={"35px"}
                />
              </Col>
            </Row>
            <div style={{ height: 16 }} />
            <Row>
              <Col span={24} >
                <CustomButton
                  onClick={() => {
                    submit();

                  }}
                  text={"Submit"}
                  color={"#13A43B"}
                  width={"100%"}
                  height={"35px"}
                />
              </Col>
            </Row>

          </>
        </Form>
      </Container>
      {

      }
    </Wrapper>
  );
}

export default QuizForm;
