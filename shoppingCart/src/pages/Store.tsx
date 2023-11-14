import { Col, Row, Container } from "reactstrap";
import { StoreItem } from "../components/StoreItem";
import items from "../data/Items.json";

export function Store() {
  return (
    <>
      <Container>
        {items.length > 0 && (
          <Row md={2} xs={1} lg={3} className="g-3">
            {items.map((item) => {
              return (
                <Col key={`${item.title}${item.id}`}>
                  <StoreItem item={item} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}
