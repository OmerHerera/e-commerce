import { useState } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { login, optIn, optOut } from "./../../utils/dy-utils"

const DYUserActions = () => {
  const [loginType, setLoginType] = useState('email');
  const [userId, setUserId] = useState('');
  const [emailOptIn, setEmailOptIn] = useState('');
  const [emailOptOut, setEmailOptOut] = useState('');
  return (
      <Card style={{ backgroundColor: "#f2f2f2" }}>
        <Form>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintext">
            <Form.Label column sm="3">
              Login
            </Form.Label>
            <Col sm="10" style={{ marginBottom: "10px" }}>
              <Form.Select aria-label="Login" size="sm"
                onChange={e => {
                  setLoginType(e.target.value);
                }}
              >
                <option value="email">Email</option>
                <option value="he">Hashed Email</option>
                <option value="id">ID</option>
              </Form.Select>
            </Col>
            <Col sm="10">
              <Form.Control
                size="sm" type="text"
                placeholder="Email/Hashed Mail/ ID"
                style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
                onChange={(e) => {
                  setUserId(e?.target?.value);
                }} />
            </Col>
            <Col sm="10">
              <Button variant="secondary"
                onClick={() => {
                  const ret = login(userId, loginType);
                  ret ? toast.success(loginType) : toast.error(loginType);
                }}
                size="sm">Login
              </Button>
            </Col>
            <Form.Label column sm="3">
              Opt In
            </Form.Label>
            <Col sm="10">
              <Form.Control size="sm" type="text" placeholder="Email" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
                onChange={(e) => {
                  setEmailOptIn(e?.target?.value);
                }}
              />
            </Col>
            <Col sm="10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const ret = optIn(emailOptIn, loginType);
                ret ? toast.success(loginType) : toast.error(loginType);
              }}>Opt In
            </Button>
            </Col>
            <Form.Label column sm="3">
              Opt Out
            </Form.Label>
            <Col sm="10">
              <Form.Control size="sm" type="text" placeholder="Email" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
                onChange={(e) => {
                  setEmailOptOut(e?.target?.value);
                }} />
            </Col>
            <Col sm="10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const ret = optOut(emailOptOut, loginType);
                ret ? toast.success(loginType) : toast.error(loginType);
              }}
            >Opt Out</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card>
  )
}

export default DYUserActions;