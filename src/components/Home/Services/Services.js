import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Services.css';
const Services = (props) => {
    const { _id, name, price, description, imageURL } = props.service;
    const history = useHistory();
    const handleClick = (id) => {
        const url = `serviceBooking/${id}`;
        history.push(url);
    }
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4 h-100" id="service">
            <Card className="w-100 shadow p-4 h-100" id="service-card">
                <div className="service-image">
                    <Card.Img variant="top" id="card-image" className="img-fluid mb-3" src={imageURL} />
                </div>
                <Card.Body className="p-0">
                    <Card.Title className="">{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="service-title brand-color"><b>${price}</b></h3>
                        <Button id="btn-update" onClick={() => handleClick(_id)}>Book Now</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Services;