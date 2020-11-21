import React from 'react';
import Table from 'react-bootstrap/Table';

function Products({ order = {} }) {

    const items = order.items;

    const itemsToShow = items.map( item => {
        return (
            <tr key={item.id}>
                <td>
                    {item.id}
                </td>
                <td>
                    {item.name}
                </td>
                <td>
                    {item.sku}
                </td>
                <td>
                    {item.quantity}
                </td>
                <td>
                    {item.price}
                </td>
            </tr>
        )
    });

    return (
        <div>
            <Table id="cart" striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsToShow}
                </tbody>
            </Table>
        </div>
    )
}

export default Products
