import { ListGroup } from "react-bootstrap";

const DYUserData = ({ sectionId, env, scriptVer, dyId, recommendationContext  }) => {
  return (
    <ListGroup key="1" horizontal="sm" className="my-2">
      <ListGroup.Item className="py-1 px-2 small" variant="secondary">SectionId: { sectionId }</ListGroup.Item>
      <ListGroup.Item className="py-1 px-2 small" variant="secondary">Env: { env }</ListGroup.Item>
      <ListGroup.Item className="py-1 px-2 small" variant="secondary">Script: { scriptVer }</ListGroup.Item>
      <ListGroup.Item className="py-1 px-2 small" variant="secondary">dyId: { dyId }</ListGroup.Item>
      <ListGroup.Item className="py-1 px-2 small" variant="secondary">Context: { recommendationContext }</ListGroup.Item>
    </ListGroup>
  )
}

export default DYUserData;