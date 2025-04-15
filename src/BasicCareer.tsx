import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form, Card, ProgressBar } from "react-bootstrap";
import { Slider, BasicQuestionType, BasicQuestionSet } from "./BasicQuestions";



export function BasicCareer(): React.JSX.Element {
    const [progress, setProgress] = useState<number>(0);
    const [questionBank, setQuestionBank] = useState<BasicQuestionType[]>(BasicQuestionSet);
    const [question1, setQuestion1] = useState<BasicQuestionType>(questionBank[progress]);
    const [question2, setQuestion2] = useState<BasicQuestionType>(questionBank[progress+1]);

    useEffect(() => {
        if (progress <= questionBank.length-1) {
            setQuestion1(questionBank[progress]);
            setQuestion2(questionBank[progress+1]);
        }
    },[questionBank, progress])

    function updateQuestionBank() {
        const newQuestionSet: BasicQuestionType[] = questionBank.map((question) =>
            (question === questionBank[progress]) ? {...question1} : 
            (question === questionBank[progress+1]) ? {...question2} : question
    );
        setQuestionBank(newQuestionSet);
    }

    function updateQuestion1(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders1: Slider[] = question1.sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider);
        setQuestion1({...question1, sliders: new_sliders1}); 
    }
    function updateQuestion2(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders2: Slider[] = question2.sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider);
        setQuestion2({...question2, sliders: new_sliders2}); 
    }

    function submitQuestions() {
        updateQuestionBank();
        setProgress(progress+2);
    }

    return (
        <div>
            <div style={{
                backgroundColor:'#054569', 
                color: 'white', 
                fontFamily:'Garamond, serif',
                textShadow: '2px 2px 2px black',}}>
            <br></br>
            <h1>Basic Career Assessment</h1>
            <hr style={{color:'white', marginLeft:450,marginRight:450}}></hr>
            <br></br>
            </div>
            <div style={{display: "flex", padding: "20px", justifyContent: "center"}}>
                <div id="question" style={{padding: "10px", paddingRight:"100px", color:'white', fontFamily:'Franklin Gothic, sans-serif', textAlign:'left'}}>
                    <h3>{question1.description}</h3>
                    <div>
                        {question1.sliders.map((slider: Slider) => (
                            <div> {slider.option}
                                <Form.Range
                                id={slider.option}
                                min="0"
                                max="5"
                                step="1"
                                onChange={(event) => updateQuestion1(slider.option, event)}
                                value={slider.value}
                                style={{
                                    width: "300px",
                                    height:"40px",
                                    padding:"20px",
                                    margin:'20px',
                                    verticalAlign:'middle',
                                    paddingRight:"20px",
                                    outlineStyle:'inset',
                                    outlineColor:"#054569"}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div id="question" style={{padding: "10px", paddingLeft:"100px", color:"white",fontFamily:'Franklin Gothic, sans-serif', textAlign:'left'}}>
                    <h3>{question2.description}</h3>
                    <div>
                        {question2.sliders.map((slider: Slider) => (
                            <div> {slider.option}
                                <Form.Range
                                id={slider.option}
                                min="0"
                                max="5"
                                step="1"
                                onChange={(event) => updateQuestion2(slider.option, event)}
                                value={slider.value}
                                style={{
                                    width: "300px",
                                    height:"40px",
                                    padding:"20px",
                                    margin:'20px',
                                    verticalAlign:'middle',
                                    paddingLeft:"20px",
                                    outlineStyle:'inset',
                                    outlineColor:'#054569',
                                    
                                }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button  onClick={()=>{submitQuestions()}} variant="success" disabled={progress===questionBank.length}>Submit Answer</Button>
            <br></br>
            <br></br>
            <ProgressBar
                now={progress/questionBank.length*100}
                label={`${Math.round(progress/questionBank.length*100)}%`}
                variant="info"
                animated
                style={{ marginTop: '30px', marginBottom: '20px', height: '20px' }}
            />
            <br></br>
            <div hidden={false}>
                    <Card id="Results" style={{marginLeft:"250px", marginRight:"250px"}}>
                        <br></br>
                        <h3 style={{fontWeight:'bold', fontFamily:'Garamond, serif'}}>Results</h3>
                        <hr style={{color:'black', marginLeft:450,marginRight:450}}></hr>
                        <p>Some results here. </p>
                    </Card>
                    <br></br>
                    <br></br>
                    <br></br>
            </div>
        </div>
    );
};