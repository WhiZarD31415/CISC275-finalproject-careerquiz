import React, {useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap'

const DetailedCareer =() => {
    const[detailedComplete, changeDetailedComplete] = useState<number[]>([0,0,0,0,0,0,0,0])
    let detailedProgress = [0,0,0,0,0,0,0,0]

    function getProgress(progress:number[]){
        return(progress.reduce((total:number, num:number)=>total+num,0)/8)
    }

    const[questionD1, changeD1] = useState<string>('')
    function updateD1(event:React.ChangeEvent<HTMLInputElement>) {
        changeD1(event.target.value)
        if(questionD1 !== ''){
            detailedProgress[0] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD2, changeD2] = useState<string>('')
    function updateD2(event:React.ChangeEvent<HTMLInputElement>) {
        changeD2(event.target.value)
        if(questionD2 !== ''){
            detailedProgress[1] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD3, changeD3] = useState<string>('')
    function updateD3(event:React.ChangeEvent<HTMLInputElement>) {
        changeD3(event.target.value)
        if(questionD3 !== ''){
            detailedProgress[2] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD4, changeD4] = useState<string>('')
    function updateD4(event:React.ChangeEvent<HTMLInputElement>) {
        changeD4(event.target.value)
        if(questionD4 !== ''){
            detailedProgress[3] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD5, changeD5] = useState<string>('')
    function updateD5(event:React.ChangeEvent<HTMLInputElement>) {
        changeD5(event.target.value)
        if(questionD5 !== ''){
            detailedProgress[4] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD6, changeD6] = useState<string>('')
    function updateD6(event:React.ChangeEvent<HTMLInputElement>) {
        changeD6(event.target.value)
        if(questionD6 !== ''){
            detailedProgress[5] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD7, changeD7] = useState<string>('')
    function updateD7(event:React.ChangeEvent<HTMLInputElement>) {
        changeD7(event.target.value)
        if(questionD7 !== ''){
            detailedProgress[6] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    const[questionD8, changeD8] = useState<string>('')
    function updateD8(event:React.ChangeEvent<HTMLInputElement>) {
        changeD8(event.target.value)
        if(questionD8 !== ''){
            detailedProgress[7] = 1
            changeDetailedComplete(detailedProgress)
        }
    }

    return (
        <div>
            <h1>Detailed Career Assessment</h1>
            <p>Please answer each of these questions by typing your response in the box located under each question.</p>
            <Form.Group controlID="formDQuestions12" as={Row} >
            
                <Row>
                    <Col>Question 1
                    <Form.Control 
                        value = {questionD1}
                        onChange={updateD1}
                    >

                    </Form.Control>
                    {/* Answer: {questionD1} */}
                    </Col>
                    <Col>Question 2
                    <Form.Control 
                        value = {questionD2}
                        onChange={updateD2}
                    >
                    </Form.Control>
                    {/* Answer: {questionD2} */}
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                </Row>
                
                <Row>
                    <Col>Question 3
                    <Form.Control 
                        value = {questionD3}
                        onChange={updateD3}
                    >

                    </Form.Control>
                    </Col>
                    <Col>Question 4
                    <Form.Control 
                        value = {questionD4}
                        onChange={updateD4}
                    >
                    </Form.Control>
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                </Row>

                <Row>
                    <Col>Question 5
                    <Form.Control 
                        value = {questionD5}
                        onChange={updateD5}
                    >

                    </Form.Control>
                    </Col>
                    <Col>Question 6
                    <Form.Control 
                        value = {questionD6}
                        onChange={updateD6}
                    >
                    </Form.Control>
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                    </Row>

                    <Row>
                    <Col>Question 7
                    <Form.Control 
                        value = {questionD7}
                        onChange={updateD7}
                    >
                        
                    </Form.Control>
                    </Col>
                    <Col>Question 8
                    <Form.Control 
                        value = {questionD8}
                        onChange={updateD8}
                    >
                    </Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <div>
            <br></br>
            <br></br>
            <br></br>
            {'    '}
                {questionD1}<br></br>
                {questionD2}<br></br>
                {questionD3}<br></br>
                {questionD4}<br></br>
                {questionD5}<br></br>
                {questionD6}<br></br>
                {questionD7}<br></br>
                {questionD8}<br></br>
                <br></br>
                <Form.Text>{detailedComplete}</Form.Text>
            </div>
        </div>
    );
};

export default DetailedCareer;