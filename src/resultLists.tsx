// import React, { useState } from 'react';
import './App.css';
import { Row, Col, ListGroup, Tab } from 'react-bootstrap';
import {results} from "./App"




export function resultLists():React.JSX.Element{

    //These are sample results to test the functionality of the homepage result display
    //Uncomment the line below and replace instances of 'results' with 'testResults' in this file to use
    //let testResults = [["Career 1", "Text of Career 1","1"], ["Career 2", "Text of Career 2","2"],["Career 3", "Text of Career 3","3"],["Career 4", "Text of Career 4","4"]]

    
    //createListItem creates the clickable listgroup item that appears on the left side of the results section
    //It requires the career name (title) and the index in the results list (num)
    //This allows for dynamic creation of listgroup items
    function createListItem(title: string, num:string):React.JSX.Element{
      
      return(
        <>
        <ListGroup.Item action href={"#link"+num}> 
            <h4>{title.substring(2)}</h4> 
            </ListGroup.Item>

            </>

      )
    }

    //createPaneItem creates the box on the right side of the results section that displays past results
    //It contains both the name of the career (title) and the description (text)
    //It also requires the index in the results array to create the unique link that connects it to the corresponding listgroup
    //Only one pane item appears at a time
    function createPaneItem(title: string, text:string, num:string):React.JSX.Element{
      return(
            <Tab.Pane eventKey={"#link"+num}>
            <h3 style={{fontWeight:"bold"}}>{title.substring(2)}</h3> 
            <hr></hr>
            <p style={{fontFamily:'Franklin Gothic, sans-serif', fontSize:'120%'}}>
                {text}
              </p>
            </Tab.Pane>
      )
    }

    return (
        //This section is hidden if the results array is empty. Placeholder text (seen in App.tsx) 
        // replaces it with instructions for the user
        <div hidden={!results.length}>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>

        <Col sm={4}>
          <ListGroup >
            {/*Dynamically create listgroup based on number of results*/}
            {results.map((r:string[])=>createListItem(r[0],r[2])) }
            
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content id='ResultHome'>
            {/*Dynamically create panes based on number of results*/}
          {results.map((r:string[])=>createPaneItem(r[0],r[1],r[2]))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        </div>

    )
}