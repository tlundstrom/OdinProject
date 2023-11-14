import { Offcanvas, OffcanvasHeader, OffcanvasBody, ListGroup, ListGroupItem } from "reactstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import items from "../data/Items.json";
import { currencyFormatter } from "../utilities/currencyFormatter";
import { useEffect } from "react";

interface IProps {
  isOpen: boolean;
}

export function ShoppingCart({ isOpen }: IProps) {
  const { closeCart, cartItems } = useShoppingCart();
  useEffect(() => {
    if (cartItems.length === 0) {
      closeCart();
    }
  }, [cartItems]);
  return (
    <Offcanvas direction="end" isOpen={isOpen} toggle={closeCart}>
      <OffcanvasHeader toggle={closeCart}>Cart</OffcanvasHeader>
      <OffcanvasBody>
        <ListGroup gap={3}>
          {cartItems.map((item) => {
            return (
              <ListGroupItem>
                <CartItem key={item.id} {...item} />
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <ListGroupItem style={{ textAlign: "end" }} className=" fw-bold fs-5">
          Total{" "}
          {currencyFormatter(
            cartItems.reduce((total, cartItem) => {
              const item = items.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </ListGroupItem>
      </OffcanvasBody>
    </Offcanvas>
  );
}
