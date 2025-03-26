import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DYUserActions from "./../components/DYUserActions/DYUserActions"
import DYScriptData from "./../components/DYScriptData/DYScriptData"
import DYStandardEvents from "./../components/DYStandardEvents/DYStandardEvents"
import { Col, Container } from "react-bootstrap";
import { Fragment } from "react";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const DYConfiguration = () => {
  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="dy" />
      <section className="filter-bar">
        <Container className="">
          <Tabs
            defaultActiveKey="sectionData"
            id="SectionData"
            className="mb-3"
          >
            <Tab eventKey="sectionData" title="Section Data">
              <Col md={5}>
                <DYScriptData />
              </Col>
            </Tab>
            <Tab eventKey="userData" title="User Actions">
              <Col md={5}>
                <DYUserActions />
              </Col>
            </Tab>
            <Tab eventKey="standardEvents" title="Standard Events">
              <Col md={5}>
                <DYStandardEvents />
              </Col>
            </Tab>
          </Tabs>
        </Container>
      </section>
    </Fragment>
  );
};

export default DYConfiguration;
