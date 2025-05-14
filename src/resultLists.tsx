// import React, { useState } from 'react';
import './App.css';
import { Row, Col, ListGroup, Tab, Button } from 'react-bootstrap';
import { save_result } from './login';
import { Result } from './App';



export function ResultLists({results} : {results: Result[]}):React.JSX.Element{

  let defaultLink: string = "";
  try {
    defaultLink = "#link"+results[0].title.slice(0,10)
  } catch {
    defaultLink = "";
  }

    //These are sample results to test the functionality of the homepage result display
    //Uncomment the line below and replace instances of 'results' with 'testResults' in this file to use
    //let testResults = [["Career 1", "Text of Career 1","1"], ["Career 2", "Text of Career 2","2"],["Career 3", "Text of Career 3","3"],["Career 4", "Text of Career 4","4"]]

    
    //createListItem creates the clickable listgroup item that appears on the left side of the results section
    //It requires the career name (title) and the index in the results list (num)
    //This allows for dynamic creation of listgroup items
    function createListItem(title: string, num:number):React.JSX.Element{
      
      return(
        <>
        <ListGroup.Item action href={"#link"+title.slice(0,10)}> 
            <h4>{title.substring(2)}</h4> 
            </ListGroup.Item>

            </>

      )
    }

    //createPaneItem creates the box on the right side of the results section that displays past results
    //It contains both the name of the career (title) and the description (text)
    //It also requires the index in the results array to create the unique link that connects it to the corresponding listgroup
    //Only one pane item appears at a time
    function createPaneItem(result: Result):React.JSX.Element{
      return(
            <Tab.Pane eventKey={"#link"+result.title.slice(0,10)}>
            <h3 style={{fontWeight:"bold"}}>{result.title.substring(2)}</h3> 
            <hr></hr>
            <p style={{fontFamily:'Franklin Gothic, sans-serif', fontSize:'120%'}}>
                {result.text}
              </p>
            {(localStorage.getItem("USER")) && <Button onClick={() => save_result(result)}>Save</Button>}
            </Tab.Pane>
      )
    }

    return (
        //This section is hidden if the results array is empty. Placeholder text (seen in App.tsx) 
        // replaces it with instructions for the user
        <div hidden={!results.length}>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey={defaultLink}>
      <Row>

        <Col sm={4}>
          <ListGroup >
            {/*Dynamically create listgroup based on number of results*/}
            {results.map((r:Result)=>createListItem(r.title,r.number)) }
            
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content id='ResultHome'>
            {/*Dynamically create panes based on number of results*/}
          {results.map((r:Result)=>createPaneItem(r))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        </div>

    )
}