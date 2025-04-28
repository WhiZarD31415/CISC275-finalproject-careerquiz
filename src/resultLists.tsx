import React, { useState, createElement } from 'react';
import './App.css';
import { Row, Col, ListGroup, Tab } from 'react-bootstrap';
import {results} from "./App"





export function resultList():React.JSX.Element{

    let testResults = [["Career 1", "Text of Career 1","1"], ["Career 2", "Text of Career 2","2"],["Career 3", "Text of Career 3","3"]]

    function createListStuff(titleStuff: string, textStuff:string, num:string):React.JSX.Element{
      return(

        <ListGroup.Item action href={"#link"+num} variant='light' style={{borderStyle:'inset', borderWidth:"5px"}}>
            <h4>{titleStuff}</h4> 
            </ListGroup.Item>

      )
    }

    function createPaneStuff(titleStuff: string, textStuff:string, num:string):React.JSX.Element{
      return(
            <Tab.Pane eventKey={"#link"+num}>
            <h3>{titleStuff}</h3> 
            <hr></hr>
            <p>{textStuff}</p>
            </Tab.Pane>
      )
    }

    return (
        
        <div hidden={!results.length}>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>

        <Col sm={4}>
          <ListGroup variant='info'>
            {testResults.map((r:string[])=>createListStuff(r[0],r[1],r[2]))}
            
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