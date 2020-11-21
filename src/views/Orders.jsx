import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

function Orders({ orders = [] }) {

    const [savedOrders, setSavedOrders] = useState(orders);

    const ordersToShow = savedOrders.map( order => {
        return (
            <tr key={order.id}>
                <td>
                    {order.id}
                </td>
                <td>
                    {order.number}
                </td>
                <td>
                    {order.dates.createdAt}
                </td>
                <td>
                    {order.status.ecartapi === 'paid' ? <Badge variant="success">{order.status.ecartapi}</Badge> : <Badge variant="danger">{order.status.ecartapi}</Badge> } 
                </td>
                <td>
                    <Link to={`/order/${order.id}`}>View order</Link>
                </td>
            </tr>
        )
    });

    const searchForm = e => {
        const value = e.target.value;
        const filteredOrders = orders.filter(order => {
            return order.number.indexOf(value) !== -1;
        });
        setSavedOrders(filteredOrders);
    }

    return (
        <div>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Search by order number</Form.Label>
                <Form.Control 
                    type="search" 
                    placeholder="0123"
                    autoComplete="off"
                    onChange={e => searchForm(e)} />
            </Form.Group> 
            <Table id="cart" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order number</th>
                        <th>Date created</th>
                        <th>Status</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersToShow}
                </tbody>
            </Table>
        </div>
    )
}

export default Orders
