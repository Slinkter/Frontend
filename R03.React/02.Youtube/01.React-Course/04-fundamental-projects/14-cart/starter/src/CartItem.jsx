import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useGlovalContext } from "./context";
const CartItem = ({ id, img, title, price, amount }) => {
  const { remove, increase, decrease } = useGlovalContext();

  return (
    <article className="cart-item" style={{ border: "1px solid red" }}>
      <img src={img} alt={title} />
      <div>
        <h5>{title}</h5>
        <span className="item-price">${price}</span>
        {/* remove button */}
        <button className="remove-btn" onClick={() => remove(id)}>
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button className="amount-btn" onClick={() => increase(id)}>
          <FaChevronUp className="amount-icon" />
        </button>
        {/* amount */}
        <span className="amount">{amount}</span>
        {/* decrease amount */}
        <button className="amount-btn" onClick={() => decrease(id)}>
          <FaChevronDown className="amount-icon" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
