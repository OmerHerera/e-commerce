import { useState } from "react";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { triggerDYEvent } from "./../../utils/dy-utils"

const DYStandardEvents = () => {
  const mapButtonTexts = {
    'add-to-cart': 'Add to Cart',
    'sync-cart-v1': 'Sync Cart',
  };
  const [sku, setSKU] = useState('');
  const [price, setPrice] = useState('');
  const [cartList, setCartList] = useState([]);
  const [buttonText, setButtonText] = useState("Add To Cart");
  const [eventSelected, setEventSelected] = useState('')
  return (
    <Col style={{ display: "flex" }}>
      <Card style={{ backgroundColor: "#f2f2f2", margin: "0px 10px 0px 0px" }}>
        <Form>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintext">
            <Col sm="10">
              <Form.Label column sm="3">SKU</Form.Label>
              <Form.Control
                size="sm" type="text"
                placeholder="SKU"
                style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
                onChange={(e) => {
                  setSKU(e?.target?.value);
                }} />
            </Col>
            <Col sm="10">
              <Form.Label column sm="3">Price</Form.Label>
              <Form.Control
                size="sm" type="text"
                placeholder="45"
                style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
                onChange={(e) => {
                  setPrice(e?.target?.value);
                }} />
            </Col>
            <Col sm="10">
              <Form.Select size="sm"
                onChange={e => {
                  const text = mapButtonTexts[e.target.value];
                  setButtonText(text);
                  setEventSelected(e.target.value);
                }}
              >
                <option value="add-to-cart" text="Add To Cart">Add To Cart</option>
                <option value="sync-cart-v1" text="Sync Cart">Sync Cart</option>
              </Form.Select>
            </Col>
            <Col sm="10">
              <Button variant="secondary" style={{ margin: "10px 0px 10px" }}
                onClick={() => {
                  setCartList(prevCartList => {
                    // Check if the item already exists in the cart
                    const itemIndex = prevCartList.findIndex(item => item.productId === sku);

                    if (itemIndex > -1) {
                      // Item exists, so we increment the quantity
                      const updatedCartList = [...prevCartList];
                      updatedCartList[itemIndex] = {
                        ...updatedCartList[itemIndex],
                        qty: updatedCartList[itemIndex].qty + 1
                      };

                      // Call triggerDYEvent with the updated cartList
                      triggerDYEvent(eventSelected, { productId: sku, price: price }, updatedCartList);

                      return updatedCartList; // Return updated list with incremented qty
                    } else {
                      // Item doesn't exist, so add it with qty = 1
                      const updatedCartList = [
                        ...prevCartList,
                        { productId: sku, price: price, qty: 1 }
                      ];

                      // Call triggerDYEvent with the updated cartList
                      triggerDYEvent(eventSelected, { productId: sku, price: price }, updatedCartList);

                      return updatedCartList; // Return updated list with new item
                    }
                  });
                }}
                size="sm">
                {buttonText}
              </Button>
              
              <Button variant="secondary" style={{ margin: "10px 0px 10px 10px" }}
                onClick={() => {
                  setCartList([]);
                }}
                size="sm">Reset
              </Button>
            </Col>
          
          </Form.Group>
        </Form>
      </Card>
      {cartList.length ?
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Price</th>
              <th>qty</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(item => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
              </tr>))
            }
          </tbody>
        </Table> : null
      }
      
  
    </Col>
    
  );
}

export default DYStandardEvents;
