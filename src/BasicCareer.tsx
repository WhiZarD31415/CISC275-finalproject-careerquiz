import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form, ProgressBar } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { Slider, BasicQuestionType, BasicQuestionSet } from "./BasicQuestions";
import './BasicCareer.css'
import { Result } from "./App";


export var basicProgress  = 0;

export function BasicCareer({results} : {results: Result[];}): React.JSX.Element {
    //Tracks progress
    const [progress, setProgress] = useState<number>(0);
    basicProgress =progress;
    //Holds all the questions
    const [questionBank, setQuestionBank] = useState<BasicQuestionType[]>(BasicQuestionSet);
    //Pair of questions being shown
    const [question1, setQuestion1] = useState<BasicQuestionType>(questionBank[progress]);
    const [question2, setQuestion2] = useState<BasicQuestionType>(questionBank[progress+1]);
    //Stores career suggestions from ChatGPT
    const [careerSuggestions, setCareerSuggestions] = useState<string[]>([]);
    //Flipping the career suggestion cards
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

    //When progress changes update the visable questions
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
    //Changes to the sliders in the showcased questions
    function updateQuestion1(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders1: Slider[] = question1.sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider);
        setQuestion1({...question1, sliders: new_sliders1}); 
    }
    function updateQuestion2(option: string, event: React.ChangeEvent<HTMLInputElement>) {
        const new_sliders2: Slider[] = question2.sliders.map((slider: Slider): Slider => (slider.option === option) ? {option: slider.option, value: event.target.value} : slider);
        setQuestion2({...question2, sliders: new_sliders2}); 
    }

    //Sends final answers to ChatGPT and shows results
    async function generate_results() {
        const apiKey = localStorage.getItem("MYKEY")?.replace(/"/g, '');
            if(!apiKey) {
                alert("Please provide yout API key");
                return;
            }

        const { getChatGPTResponse } = await import('./ChatgptAPI');

        const scores = questionBank.map((q, i) => {
            const sliders = q.sliders.map(s => `${s.option}: ${s.value}`).join(", ");
            return `Q${i + 1} (${q.description}): ${sliders}`;
        }).join("\n");
        
        const prompt = `
        Based on these scores from the Basic Career quiz, suggest 3 specific career paths and explain why each one is a good match. 
        
        Please format your response exactly like this:
        
        1. [Career Title]
        Description...
        
        2. [Career Title]
        Description...
        
        3. [Career Title]
        Description...
        
        Here is the quiz data:
        ${scores}
        `;

        try {
            const result = await getChatGPTResponse(prompt, apiKey);
            //Line below used for the purpose of testing:
            //const result = "1. [Career 1]\nDescription 1...\n\n2. [Career 2]\nDescription 2...\n\n3. [Career 3]\nDescription 3..."
            //Splits results into 3 card sections
            const parts = result
                .split(/\n(?=\d\.\s)/g)
                .map((p: string) => p.trim())
                .filter((p: string) => p.length > 0);
            
                (parts.slice(0, 3)).map((suggestion:string) => {
                  const [title, ...descLines] = suggestion.split('\n');
                  const description = descLines.join('\n').trim();
    
                  //adding the title, the results, and an index to the results arrary for use on the homepage results display
                  results.push({title: title, text: description, number: results.length+1})
                  return null;
                });

            setCareerSuggestions(parts.slice(0, 3));
            setFlipped([false, false, false]);
            setSubmitted(true);
        } catch (err) {
            console.error("ChatGPT error:", err);
            alert("ChatGPT error occurred.");
        }
    }

    // Handles question submissions
    function submitQuestions() {
        updateQuestionBank();
        //generates results once the last pair of questions are answered
        if(progress +2 >= questionBank.length) {
            generate_results()
        }
        setProgress(progress + 2);
    }

    //To flip the cards
    const toggleFlip = (index: number) => {
        const updated = [...flipped];
        updated[index] = !updated[index];
        setFlipped(updated);
    }

    return (
        <div>
            <div style={{
                backgroundColor:'#4e6fa5', 
                color: 'white', 
                fontFamily:'Garamond, serif',
                textShadow: '2px 2px 2px black',}}>
            <br/>
            <h1>Basic Career Assessment</h1>
            <hr style={{color:'white', marginLeft:450,marginRight:450}}></hr>
            <br/>
            </div>
            
            {!submitted ? ((progress !== questionBank.length) ? (
            <>
            {/* Slider questions */}
            <div style={{display: "flex", padding: "20px", justifyContent: "center"}}>
                {[question1, question2].map((question, i) => (
                    <div key={i} style={{padding: "10px", paddingRight:"100px", color:'white', fontFamily:'Franklin Gothic, sans-serif', textAlign:'left'}}>
                      <h3>{question.description}</h3>
                    <div>
                    {question.sliders.map(slider => (
                  <div key={slider.option}>
                    {slider.option}
                    <Form.Range
                      min="0"
                      max="5"
                      step="1"
                      value={slider.value}
                      onChange={(event) => i === 0 ? updateQuestion1(slider.option, event) : updateQuestion2(slider.option, event)}
                      style={{
                        width: "300px",
                        height: "40px",
                        padding: "20px",
                        margin: "20px",
                        outlineStyle: 'inset',
                        outlineColor: "#054569"
                      }}
                    />
                  </div>
                ))}
                    </div>
                </div>
                ))}
            </div>
            <Button  onClick={()=>{submitQuestions()}} id="submitButton" disabled={progress >= questionBank.length}>Submit Answer</Button>
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
            </>
            ) : (
                <PulseLoader 
                    color="#5591A9"
                    cssOverride={{paddingTop: '10%'}}
                />
            )) : (
                <>
                 {/* Career suggestion results after submission */}
                 <br/>
                  <h2 style={{ color: 'white', marginBottom: '20px', fontFamily: 'Garamond, serif', fontSize: "25px", textAlign: 'center' }}>
                 Your Recommended Careers:
            </h2>
            <div>
             {/* Flip card layout */}
             <div style={{
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'flex-start',
             flexWrap: 'wrap',
             gap: '40px',
             marginBottom: '40px',
          }}>
            {careerSuggestions.map((suggestion, index) => {
              const [title, ...descLines] = suggestion.split('\n');
              const description = descLines.join('\n').trim();

              //adding the title, the results, and an index to the results arrary for use on the homepage results display
              //results.push([title, description, (results.length+1).toString()])
                              

              

              return (
                <div
                  key={index}
                  className={`flip-card ${flipped[index] ? "flipped" : ""}`}
                  onClick={() => toggleFlip(index)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front card-face">
                      <h5 style={{fontSize:"150%", fontFamily:"Century, serif", textShadow: '2px 2px 2px black'}}>{title.substring(2)}</h5>
                    </div>
                    <div className="flip-card-back card-face">
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
          </div>

          </div>
        </>
      )}
    </div>
  );
}
