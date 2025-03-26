
import { useState } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { changeQueryStringValue } from "./../../utils/tools";
import { setRecommendationContext } from "./../../utils/dy-utils"

const DYScriptData = () => {
  const [sectionId, setSectionId] = useState('');
  const [env, setEnv] = useState('');
  const [reqContext, setReqContext] = useState('');
  const [data, setData] = useState('');
  const [branchId, setBranchId] = useState('');
  const [lang, setLang] = useState('');
  const [integrity, setIntegrity] = useState('');

  return (
    <Card style={{ backgroundColor: "#f2f2f2" }}>
      <Form>
        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPlaintext">
          <Row style={{ display: "inline", margin: "10px 0px 0px 22px"}}>
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            SectionId
            </Form.Label>
          </Row>
          <Col sm="10">
            <Form.Control
              size="sm"
              type="text"
              placeholder="SectionId"
              style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
              onChange={(e) => {
                setSectionId(e?.target?.value);
              }}
            />
            <Button variant="secondary" size="sm"
              onClick={() => {
                changeQueryStringValue("sectionId", sectionId, true);
              }}>Change SectionId
            </Button>
          </Col>
          <Row style={{ display: "inline", margin: "10px 0px 0px 22px"}}>
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            Environment
            </Form.Label>
          </Row>
          <Col sm="10">
            <Form.Control size="sm" type="text" placeholder="Production" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
              onChange={(e) => {
                setEnv(e?.target?.value);
              }}
            />
            <Button variant="secondary" size="sm"
              onClick={() => {
                changeQueryStringValue("env", env, true);
              }}>Change Environment
            </Button>
          </Col>
          <Row style={{ display: "inline", margin: "10px 0px 0px 22px"}}>
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            Context
            </Form.Label>
          </Row>
          <Col sm="10">
            <Form.Select size="sm" style={{ marginBottom: "10px" }}
              onChange={e => {
                setReqContext(e.target.value)
              }}
            >
              <option value="HOMEPAGE">HOMEPAGE</option>
              <option value="CATEGORY">CATEGORY</option>
              <option value="PRODUCT">PRODUCT</option>
              <option value="CART">CART</option>
              <option value="OTHER">OTHER</option>
            </Form.Select>
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            Data
            </Form.Label>
            <Form.Control size="sm" type="text" placeholder="SKU" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
              onChange={(e) => {
                setData(e?.target?.value);
              }}
            />
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            Language Context
            </Form.Label>
            <Form.Control size="sm" type="text" placeholder="en_GB" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
              onChange={(e) => {
                setLang(e?.target?.value);
              }} />
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            BranchID
            </Form.Label>
            <Form.Control size="sm" type="text" placeholder="branchId" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
              onChange={(e) => {
                setBranchId(e?.target?.value);
              }}
            />
            <Button variant="secondary" size="sm"
              onClick={() => {
                setRecommendationContext({ type: reqContext, data, lang, branchId });
              }}>Change Context
            </Button>
          </Col>
          <Row style={{ display: "inline", margin: "10px 0px 0px 22px"}}>
            <Form.Label column sm="3" style={{ display: "inline",margin: "0px 0px 0px 22px" }}>
            SRI
            </Form.Label>
          </Row>
          <Col sm="10">
            <Form.Control size="sm" type="text" placeholder="sha384-R4/ztc4ZlRqWjqIuvf6RX5yb" style={{ backgroundColor: "#FFFFFF", marginBottom: "10px" }}
              onChange={(e) => {
                setIntegrity(encodeURIComponent(e?.target?.value));
              }} />
          </Col>
          <Col sm="10">
            <Button variant="secondary" size="sm"
              onClick={() => {
                changeQueryStringValue("integrity", integrity, true);
              }}
            >
              Change SRI
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  )
}

export default DYScriptData;