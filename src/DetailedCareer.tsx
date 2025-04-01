import React, {useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap'

const DetailedCareer =() => {
    
    const [detailedQuestions, changeDetailed] = useState<string[]>(['','','','','','','',''])

    function updateDetailed(index:number, change: string){
        let changedAnswers = [...detailedQuestions]
        changedAnswers[index] = change
        changeDetailed(changedAnswers)
    }

    return (
        <div>
            <h1>Detailed Career Assessment</h1>
            <p>Please answer each of these questions by typing your response in the box located under each question.</p>
            <Form.Group controlID="formDQuestions12" as={Row} >
            
                <Row>
                    <Col>Question 1
                    <Form.Control 
                        value = {detailedQuestions[0]}
                        onChange = {(e)=>updateDetailed(0,e.target.value)}>
                    </Form.Control>
                    </Col>
                    <Col>Question 2
                    <Form.Control 
                        value = {detailedQuestions[1]}
                        onChange = {(e)=>updateDetailed(1,e.target.value)}>
                    </Form.Control>
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                </Row>
                
               
            </Form.Group>
            <div>
            <br></br>
            <br></br>
            <br></br>
            {'    '}
                {detailedQuestions.join(' ')}
                <br></br>
                
            </div>
        </div>
    );
};

export default DetailedCareer;