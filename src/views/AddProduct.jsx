import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddProduct({ addProduct }) {

    let { id } = useParams();

    const history = useHistory();

    const [product, setProduct] = useState({
        id: '',
        name: '',
        sku: '',
        quantity: '',
        price: '',
        errors: {
            name: '',
            sku: '',
            quantity: '',
            price: ''
        }
    });

    const [validated, setValidated] = useState(false);

    const [loading, setLoading] = useState(false);

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach( val => {
            val.length > 0 && (valid = false)
        });
        return valid;
    };

    const checkInputs = () => {
        let errors = product.errors;
        let form = document.querySelector('form');
        for (const property in errors) {
            const element = form.querySelector(`[name='${property}']`);
            const { name, value } = element;
            switch (name) {
                case 'name':
                    errors.name = value.length < 1 ? 'Invalid product name.' : '';
                    break;
                case 'sku':
                    errors.sku = value.length < 1 ? 'Invalid sku.' : '';
                    break;
                case 'quantity':
                    errors.quantity = (value.length < 1 || parseFloat(value) < 1 )? 'Invalid quantity.' : '';
                    break;
                case 'price':
                    errors.price = (value.length < 1 || parseFloat(value) < 1 ) ? 'Invalid price.' : '';
                    break;
                default:
                    break;
            }
        }
        setProduct({...product, errors})
    };

    const changeHandler = e => {
        const { name, value } = e.target;
        setProduct({...product, [name]: value});
    }

    const submitForm = e => {
        e.preventDefault();
        checkInputs();
        if (validateForm(product.errors)) {
            setLoading(true);
            product.id = Date.now().toString();
            product.discount = parseFloat(product.discount).toFixed(2).toString();
            product.price = parseFloat(product.price).toFixed(2).toString();
            addProduct(product, id);
            setTimeout(() => {
                history.push(`/order/${id}`);
            }, 5000);
        } else {
            setValidated(true);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={e => submitForm(e)}>
            <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter product name"
                    name="name"
                    value={product.name}
                    onChange={ e => changeHandler(e)} 
                    required />
                <Form.Control.Feedback type="invalid">
                    {product.errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSKU">
                <Form.Label>SKU</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="SKU"
                    name="sku"
                    value={product.sku}
                    onChange={ e => changeHandler(e)} 
                    required/>
                    <Form.Control.Feedback type="invalid">
                        {product.errors.sku}
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="0"
                    name="quantity"
                    value={product.quantity}
                    onChange={ e => changeHandler(e)} 
                    required
                    pattern="^[1-9]+[0-9]*$"/>
                    <Form.Control.Feedback type="invalid">
                        {product.errors.quantity}
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formTotal">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    type="text"
                    placeholder="0.00"
                    name="price"
                    value={product.price}
                    onChange={ e => changeHandler(e)} 
                    required
                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$" />
                    <Form.Control.Feedback type="invalid">
                        {product.errors.price}
                    </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
                { !loading ? 'Add Product' : <FontAwesomeIcon icon="spinner" className="fa-icon" spin/>}
            </Button>
        </Form>
    )
}

export default AddProduct
