import { wrap } from 'node:module';
import React, {useState} from 'react';
import {Button, Form, Row, Col} from 'react-bootstrap'

const DetailedCareer =() => {
    //detailedQuestions is the list of answers to the detailed questions, of which there are 8
    const [detailedQuestions, changeDetailed] = useState<string[]>(['','','','','','','',''])
    //detailedProgress will keep track of how many questions have been answered
        //This is will be used for the progress bar, as well as determining when the user can hit "Submit"
    let detailedProgess = (detailedQuestions.filter((item:string):boolean=>item!=='')).length

    //
    function updateDetailed(index:number, change: string){
        let changedAnswers = [...detailedQuestions]
        changedAnswers[index] = change
        changeDetailed(changedAnswers)
    }



   

    return (
        //After the heading with the title, instructions, and progress, the questions are divided into 4 rows of 2
        //Each question consists of a label, the actual text of the question, and a place for the user to put their answer
        //Changing a text box to something other than an empty string will make detailedProgress increase by 1
            //Similarly, changing the box back to an empty string will make detailedProgress decrease by 1

        //TEMPORARY: All the answers are listed at the bottom for testing purposes
        //TEMPORARY: The 'Get Results' button doesn't do anything yet, but it is disabled if not all questions are answered
        <div>
            <div style={{backgroundColor:'#2038A1', color: 'white'}}>
            <br></br>
            {' '}
            <h1>Detailed Career Assessment</h1>
            <br></br>
            </div>
            <br></br>
            <h6>Instructions: Please answer each of these questions by typing your response in the box located under each question.</h6>
            <br></br>
            <br></br>
                Progress: {detailedProgess}/8
                <br></br>
                <br></br>
                <br></br>
            <Form.Group controlID="formDQuestions12" as={Row} >
            
                <Row>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4', marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 1</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[0]}
                        onChange = {(e)=>updateDetailed(0,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4', marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 2</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[1]}
                        onChange = {(e)=>updateDetailed(1,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                </Row>

                <Row>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4',  marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 3</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[2]}
                        onChange = {(e)=>updateDetailed(2,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4',  marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 4</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[3]}
                        onChange = {(e)=>updateDetailed(3,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                </Row>

                <Row>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4', marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 5</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[4]}
                        onChange = {(e)=>updateDetailed(4,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4', marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 6</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[5]}
                        onChange = {(e)=>updateDetailed(5,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <div>
                        <br></br>
                        <br></br>
                    {'   '}
                    </div>
                </Row>

                <Row>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4', marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 7</h5>
                    </div>
                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[6]}
                        onChange = {(e)=>updateDetailed(6,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
                    </Form.Control>
                    </Col>
                    <Col>
                    <div style={{textAlign:'left', backgroundColor:'#A4C2F4', marginLeft:30, marginRight:120}}>
                    <h5 style={{paddingTop:20, paddingBottom:20, marginLeft:10}}>Question 8</h5>
                    </div>                    <p style={{textAlign:'left', paddingLeft:50}}>Question Text Here</p>
                    <Form.Control 
                        value = {detailedQuestions[7]}
                        onChange = {(e)=>updateDetailed(7,e.target.value)}
                        style={{marginTop:30, marginLeft:50, width:500, height:50}}>
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
                Answers: {detailedQuestions.join(' ')}
            <br></br>
            <br></br>
            <br></br>
            </div>
            <Button 
                disabled = {detailedProgess!==8}
            >Get Results</Button>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
};

export default DetailedCareer;