import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Slider, BasicQuestionType, BasicQuestionSet } from "./BasicQuestions";



export function BasicCareer(): React.JSX.Element {
    const [questionBank, setQuestionBank] = useState<BasicQuestionType[]>(BasicQuestionSet);
    const [question1, setQuestion1] = useState<BasicQuestionType>(questionBank[0]);
    const [question2, setQuestion2] = useState<BasicQuestionType>(questionBank[1]);

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
            <h1>Basic Career Assessment</h1>
            <div style={{display: "flex", padding: "20px", justifyContent: "center"}}>
                <div id="question" style={{padding: "10px"}}>
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
                                style={{width: "200px"}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div id="question" style={{padding: "10px"}}>
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
                                style={{width: "200px"}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button onClick={()=>{newQuestions()}}>Submit Answer</Button>
        </div>
    );
};