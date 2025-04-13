import React, {useState} from 'react';
import {Button, Form, Card, ProgressBar} from 'react-bootstrap'

const DetailedCareer =() => {
    //detailedQuestions is the list of answers to the detailed questions, of which there are 8
    const [detailedQuestions, setDetailedQuestions] = useState<string[]>(['','','','','','','',''])
    //Tracks the current question index
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    const questionText = [
        "Describe a task or activity you enjoy and find deeply engaging or satisfying.",
        "What would you consider to be your three greatest strengths and three biggest growth areas?",
        "What is your definition of a healthy work-life balance?",
        "If money weren't a concern, what kind of job would you pursue? What draws you to it?",
        "What impact do you intend your career to have on society or the people around you?",
        "Would you thrive more in stability or in new challenges? What makes that environment feel right for you?",
        "Describe a time you faced a tough challenge. What made it difficult, and how did you work through it?",
        "When you experience failure or setbacks, how do you typically respond?"
    ];
        
    const updateAnswer = (index: number, value: string) => {
        const updated = [...detailedQuestions];
        updated[index] = value;
        setDetailedQuestions(updated);
    };
        
    const goToNext = () => {
        if (currentIndex < detailedQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };
        
    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
        
    const allAnswered = detailedQuestions.every(answer => answer.trim() !== '');
        
    const handleSubmit = () => {
        console.log("Submitted responses:", detailedQuestions);
            // Add actual submit logic here (e.g., API call)
    };


    const progress = (detailedQuestions.filter(ans => ans.trim() !== '').length / detailedQuestions.length) * 100;


    return (
        <div>
        <div style={{
            backgroundColor:'#054569', 
            color: 'white', 
            verticalAlign:'center', 
            fontFamily:'Garamond, serif',
            textShadow: '2px 2px 2px black',}}>
            <br></br>
            <h1>Detailed Career Assessment</h1>
            <hr style={{color:'white', marginLeft:450,marginRight:450}}></hr>
            <br></br> 
        </div>
        <div style={{color:'white'}}>
        <br></br>
        <h6 style={{color:'white'}}>Instructions: Please answer each of these questions by typing your response in the box located under each question.</h6>
        <br></br>
        <br></br>
        </div>
        <div style={{ padding: '15px', textAlign: 'center'}}>
          <div style={{ textAlign: 'center', 
                        backgroundColor: '#5591A9', 
                        marginTop: '40px', 
                        marginBottom: '20px', 
                        marginLeft:'300px',
                        marginRight:'300px',
                        padding: '30px', 
                        outlineColor:"#054569",
                        outlineWidth:'1vh', 
                        outlineStyle:'inset'
                         }}>
            <h5 style={{fontFamily:'Franklin Gothic, sans-serif',
                        fontSize:'24px'}}>Question {currentIndex + 1}</h5>
          </div>
    
          <p style={{ textAlign: 'center', color: 'white', fontSize: '16px', marginBottom: '20px', fontFamily:'Helvetica, sans-serif' }}>
            {questionText[currentIndex]}
          </p>
    
          <Form.Control
            as="textarea"
            rows={4}
            value={detailedQuestions[currentIndex]}
            onChange={(e) => updateAnswer(currentIndex, e.target.value)}
            style={{ width: '100%', maxWidth: '600px', marginBottom: '30px', margin: '0 auto'}}
          />

    
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
            {currentIndex > 0 && (
              <Button variant="secondary" onClick={goToPrev} 
              style={{
                fontFamily:'Franklin Gothic, sans-serif',
                outlineWidth: '0.5vh',
                outlineStyle:'outset'
        }}>
                ← Back
              </Button>
            )}
    
            {currentIndex < detailedQuestions.length - 1 ? (
              <Button
                variant="primary"
                onClick={goToNext}
                disabled={detailedQuestions[currentIndex].trim() === ''}
                style={{backgroundColor: '#5591A9',
                        fontFamily:'Franklin Gothic, sans-serif',
                        outlineColor: '#61dafb',
                        outlineWidth: '0.5vh',
                        outlineStyle:'outset'
                }}
                
              >
                Next →
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmit}
                disabled={!allAnswered}
              >
                Submit
              </Button>
            )}
          </div>

        <ProgressBar
            now={progress}
            label={`${Math.round(progress)}%`}
            variant="info"
            animated
            style={{ marginTop: '30px', marginBottom: '20px', height: '20px' }}
        />

        </div>
        <br></br>
                    <br></br>
                    <br></br>
                    <div hidden={false}>
                            <Card id="Results" style={{marginLeft:"250px",marginRight:"250px" }}>
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
    
export default DetailedCareer;