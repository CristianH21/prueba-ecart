import React from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderCards from './OrderCards'
import Products from './Products'
import Button from 'react-bootstrap/Button';

function Order({ orders = [], payOrder }) {

    const { id } = useParams();

    const order = orders.filter( order => order.id === id);

    const displayPayButton = order[0].status.ecartapi !== 'paid' && <Button variant="success" onClick={e => payOrder(id, order[0].number)}>Pay</Button> 

    return (
        <div>
            <OrderCards order={order[0]} />
            <Products order={order[0]} />
            <div className="inline-buttons">
                <Link to={`/order/${id}/product/add`}>
                    <Button>Add Product</Button>
                </Link>   
                {displayPayButton}
            </div>
        </div>
    )
}

export default Order