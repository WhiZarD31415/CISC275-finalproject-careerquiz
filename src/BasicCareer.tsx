import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form, Card } from "react-bootstrap";

interface Slider {
    option: string,
    value: string
}

interface BasicQuestionType {
    description: string,
    sliders: Slider[]
};

export function BasicCareer(): React.JSX.Element {
    const init_sliders: Slider[] = [
        { option: 'a', value: "0" },
        { option: 'b', value: "0" },
        { option: 'c', value: "0" },
        { option: 'd', value: "0" }
    ]
    const init_question: BasicQuestionType = {description: "A, B, C, or D?", sliders: init_sliders};
    const [question1, setQuestion1] = useState<BasicQuestionType>(init_question);
    const [question2, setQuestion2] = useState<BasicQuestionType>(init_question);

    function updateQuestion1(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders1: Slider[] = question1.sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider);
        setQuestion1({...question1, sliders: new_sliders1}); 
    }
    function updateQuestion2(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders2: Slider[] = question2.sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider);
        setQuestion2({...question1, sliders: new_sliders2}); 
    }

    function newQuestions() {
        const new_sliders: Slider[] = [
            { option: 'e', value: "0" },
            { option: 'f', value: "0" },
            { option: 'g', value: "0" },
            { option: 'h', value: "0" }
        ];
        const new_question: BasicQuestionType = {description: "E, F, G, or H?", sliders: new_sliders};
        setQuestion1(new_question);
        setQuestion2(new_question);
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
                <div id="question" style={{padding: "10px", paddingRight:"200px", color:'white', fontFamily:'Franklin Gothic, sans-serif'}}>
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
                
                <div id="question" style={{padding: "10px", paddingLeft:"200px", color:"white",fontFamily:'Franklin Gothic, sans-serif'}}>
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
                                    outlineColor:'#054569'
                                    
                                    

                                }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button  onClick={()=>{newQuestions()}} variant="success">Submit Answer</Button>
            <br></br>
            <br></br>
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