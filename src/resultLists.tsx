import React, { useState, createElement } from 'react';
import './App.css';
import { Row, Col, Card, ListGroup, Tab, TabContainer, ListGroupItem } from 'react-bootstrap';
import {results} from "./App"





export function resultList():React.JSX.Element{

    let x = createElement('h1', 'TextHere')


      

    return (
        
        <div>
    <Tab.Container id="list-group-tabs-example" /*defaultActiveKey="#link1"*/>
      <Row>
        <Col sm={4}>
          <ListGroup variant='info'>
            <ListGroup.Item action href="#link1" variant='dark' >
              {results[0][0]}
            </ListGroup.Item>
            <ListGroup.Item action href="#link2" variant='dark'>
            {results[1][0]}
            
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content id='ResultHome'>
            <Tab.Pane eventKey="#link1">
                <h3>{results[0][0]}</h3>
                <p>{results[0][1]}</p>
                {x}

            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
            <h3>{results[1][0]}</h3>
            <p>{results[1][1]}</p>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        </div>

    )
}