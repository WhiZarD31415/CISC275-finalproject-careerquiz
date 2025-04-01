import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

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

    function newQuestion(): BasicQuestionType {
        const new_sliders: Slider[] = [
            { option: 'e', value: "0" },
            { option: 'f', value: "0" },
            { option: 'g', value: "0" },
            { option: 'h', value: "0" }
        ]
        return {description: "E, F, G, or H?", sliders: new_sliders}
    }
    function updateQuestion1(new_question: BasicQuestionType){
        setQuestion1(new_question);
    }
    function updateQuestion2(new_question: BasicQuestionType){
        setQuestion2(new_question);
    }

    return (
        <div>
            <h1>Basic Career Assessment</h1>
            <BasicQuestion question={question1}></BasicQuestion>
            <Button onClick={()=>{updateQuestion1(newQuestion())}}>Submit Answer</Button>
            <BasicQuestion question={question2}></BasicQuestion>
            <Button onClick={()=>{updateQuestion2(newQuestion())}}>Submit Answer</Button>
        </div>
    );
};

function BasicQuestion({question}: {question: BasicQuestionType}): React.JSX.Element {
    const [sliders, setSliders] = useState<Slider[]>(question.sliders);

    function updateSlider(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders: Slider[] = sliders;
        /* sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider); */
        setSliders(new_sliders);
    }

    return (
        <div>
            <h3>{question.description}</h3>
            <div>
                {sliders.map((slider: Slider) => (
                    <div><Form.Range
                        id={slider.option}
                        min="0"
                        max="5"
                        step="1"
                        onChange={(event) => updateSlider(slider.option, event)}
                        value={slider.value}
                        style={{width: "200px"}}
                    /></div>
                ))}
            </div>
        </div>
    );
};