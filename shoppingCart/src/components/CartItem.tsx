import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import items from "../data/Items.json";
import { currencyFormatter } from "../utilities/currencyFormatter";

interface IProps {
  id: number;
  quantity: number;
}
export function CartItem({ id, quantity }: IProps) {
  const { removeFromCart } = useShoppingCart();
  const item = items.find((item) => item.id === id);
  if (item === null) return null;

  return (
    <ListGroup horizontal gap={2} className="d-flex align-items-center cart-list">
      <ListGroupItem>
        <img src={item?.image} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
      </ListGroupItem>
      <ListGroupItem className="me-auto">
        <div className="d-flex flex-column">
          <span>{item?.title} </span>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".85rem" }}>
              {quantity} x {currencyFormatter(item?.price!)}
            </span>
          )}
        </div>
      </ListGroupItem>
      <ListGroupItem className="d-flex flex-column align-items-center justify-content-center">
        {currencyFormatter(item?.price! * quantity)}
        <Button color="outline-danger" size="sm" onClick={() => removeFromCart(item?.id!)}>
          &times;
        </Button>
      </ListGroupItem>
    </ListGroup>
  );
}
