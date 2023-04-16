import React from 'react'
import styled from 'styled-components'
import { HomeFilled,ClearOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography, Input } from 'antd';
import MyButton from '../components/Button';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import constants from '../constants';


const { Text, Title } = Typography;
const { Search } = Input;
const Wrapper = styled.div`
  height : calc(100vh - 140px);
  width : 100%;
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

const Body = styled.div`
  height: calc(100vh - 250px);
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BottomRow = styled.div`
  height: 60px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
`

const TitleWrapper = styled.div`
  background-color: #F30909;
  font-size:1rem;
  padding: 8px 16px;
  border-radius: 10px;
`


const BodySection = styled.div`
    width:  100%;
    height: calc((100vh - 250px)/3.2);
    background-color: #B8C0EC;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`

const QuizCard = styled.div`
    width: 250px;
    height: 80%;
    border-radius: 12px;
    background-color: #33C20F;
    align-items: center;
    display: flex;
    flex-direction: column;
`

const Dashboard = () => {
  const history = useHistory();
  const [quizes, setQuizes] = useState([])
  const [constQuizes, setConstQuizes] = useState([])
  const [query,setQuery] = useState("")
  const onSearch = (e) => {
    setQuery(e.target.value);
    
    let q = constQuizes.filter((quiz) => {
      return quiz["student_grade"]===query || (quiz["module_code"].includes(query));
    })
    setQuizes(q)
  }


  useEffect(() => {
    fetch(`${constants.baseUrl}quizzes`)
      .then(response => response.json())
      .then(data => { setQuizes(data); setConstQuizes(data); })
      .catch(error => console.log(error));

  }, [])

  return (
    <Wrapper>
      <Header>
        <div style={{ flex: 1 }}>
          <Tooltip title="home" >
            <Button type="primary" shape="circle" icon={<HomeFilled />} />
          </Tooltip>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <TitleWrapper >
            <Text>
              Quiz Dashboard
            </Text>
          </TitleWrapper>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "end" }}>
          <Search placeholder="input search text" value={query} onChange={(event) => { onSearch(event) }} style={{ width: 200 }} />
          <Tooltip title="clear" >
            <Button 
              onClick={()=>{setQuizes(constQuizes);setQuery("")}}
            type="primary" shape="circle" icon={<ClearOutlined />} />
          </Tooltip>
        </div>
      </Header>
      <Body>
        <BodySection>
          {
            quizes.map((quiz) => {
              return <QuizCard key={quiz["_id"]}>
                <Title level={3}>
                  {`${quiz["module_code"]} GRADE ${quiz["student_grade"]}`}
                </Title>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                  <Button type="primary" onClick={() => { }}>
                    Update
                  </Button>
                 
                    <Button type="primary" danger onClick={(e)=>{}}>
                      Delete
                    </Button>
             
                </div>
              </QuizCard>
            })
          }
        </BodySection>

      </Body>
      <BottomRow>
        <MyButton onClick={() => { }} text={"Analyze Result"} color={"#121111"} />
        <MyButton onClick={() => {
          history.push("/add-quiz")

         }} text={"Add New Quiz"} color={"#F60707"} />
        <MyButton onClick={() => { }} text={"View Students Profile"} color={"#121111"} />
      </BottomRow>
    </Wrapper>
  )
}

export default Dashboard