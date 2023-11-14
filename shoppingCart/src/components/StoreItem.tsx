import { Button, Card, CardBody, CardTitle } from "reactstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { currencyFormatter } from "../utilities/currencyFormatter";

interface IProps {
  item: IItem;
}

export function StoreItem({ item }: IProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(item.id);
  return (
    <Card className="h-100">
      <img src={item.image} height="300px" style={{ objectFit: "cover" }} />
      <CardBody className="d-flex flex-column"></CardBody>
      <CardTitle className="d-flex flex-column justify-content-between align-items-baseline mb-4 mx-3">
        <span className="fs-2">{item.title}</span>
        <span className=" fs-3 ms-2">{currencyFormatter(item.price)}</span>
      </CardTitle>
      <div className="mt-auto mx-3 mb-3">
        {quantity === 0 ? (
          <Button color="primary" className="w-100" onClick={() => increaseCartQuantity(item.id)}>
            + Add to cart
          </Button>
        ) : (
          <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
              <Button color="primary" onClick={() => decreaseCartQuantity(item.id)}>
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button color="primary" onClick={() => increaseCartQuantity(item.id)}>
                +
              </Button>
            </div>
            <Button color="danger" size="sm" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
