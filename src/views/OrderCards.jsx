import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function OrderCards({ order = {} }) {

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                    <Card.Title>Order number</Card.Title>
                        <Card.Text>{order?.number}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                    <Card.Title>Total of items</Card.Title>
                        <Card.Text>{order?.items?.length}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                    <Card.Title>Total</Card.Title>
                        <Card.Text>{order?.totals?.total}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                    <Card.Title>Status</Card.Title>
                        <Card.Text>
                            {order.status.ecartapi === 'paid' ? <Badge variant="success">{order.status.ecartapi}</Badge> : <Badge variant="danger">{order.status.ecartapi}</Badge> } 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default OrderCards