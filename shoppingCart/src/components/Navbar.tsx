import { Badge, Button, Container, Nav, Navbar as NavbarRS, NavItem, NavLink } from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useShoppingCart } from "../context/ShoppingCartContext";
export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NavbarRS className="bg-white shadow-sm mb-3">
      <Container style={{ display: "flex" }}>
        <Nav className="me-auto">
          <NavItem>
            <NavLink tag={ReactLink} to="/">
              Store
            </NavLink>
          </NavItem>
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            color="outline-primary"
            className="rounded-circle"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <Badge
              color="danger"
              pill
              className=" position-absolute top-100 start-100 badge translate-middle p-2 bg-danger border border-light rounded-circle"
            >
              {cartQuantity}
            </Badge>
          </Button>
        )}
      </Container>
    </NavbarRS>
  );
}
