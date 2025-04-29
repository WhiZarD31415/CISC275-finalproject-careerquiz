import React, { useState } from 'react';
import './App.css';
import { Row, Col, ListGroup, Tab } from 'react-bootstrap';
import {results} from "./App"





export function resultLists():React.JSX.Element{

    let testResults = [["Career 1", "Text of Career 1","1"], ["Career 2", "Text of Career 2","2"],["Career 3", "Text of Career 3","3"],["Career 4", "Text of Career 4","4"]]

    

    function createListStuff(titleStuff: string, textStuff:string, num:string):React.JSX.Element{
      
      return(
        <>
        <ListGroup.Item action href={"#link"+num}> 
            <h4>{titleStuff}</h4> 
            </ListGroup.Item>

            </>

      )
    }

    function createPaneStuff(titleStuff: string, textStuff:string, num:string):React.JSX.Element{
      return(
            <Tab.Pane eventKey={"#link"+num}>
            <h3 style={{fontWeight:"bold"}}>{titleStuff}</h3> 
            <hr></hr>
            <p style={{fontFamily:'Franklin Gothic, sans-serif', fontSize:'120%'}}>
                {textStuff}
              </p>
            </Tab.Pane>
      )
    }

    return (
        
        <div hidden={!results.length}>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>

        <Col sm={4}>
          <ListGroup >
            {testResults.map((r:string[])=>createListStuff(r[0],r[1],r[2])) }
            
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content id='ResultHome'>
          {testResults.map((r:string[])=>createPaneStuff(r[0],r[1],r[2]))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        </div>

    )
}