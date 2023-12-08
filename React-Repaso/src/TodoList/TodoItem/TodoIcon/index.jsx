import { ReactComponent as CheckSVG } from "./TodoIcon/svg/check.svg";
import { ReactComponent as DeleteSVG } from "./TodoIcon/svg/delete.svg";

const TodoIcon = ({ type, color = "gray", onClick }) => {
  /*  */
  const style = `Icon-container Icon-container--${type}`;
  const checkStyle = "Icon-svg Icon-svg--check";
  const deleteStyle = "Icon-svg Icon-svg--delete";
  /*  */
  const iconTypes = {
    check: (color) => <CheckSVG className={checkStyle} fill={color} />,
    delete: (color) => <DeleteSVG className={deleteStyle} fill={color} />,
  };

  return (
    <span className={style} onClick={onClick}>
      {iconTypes[type](color)}
    </span>
  );
};

export default TodoIcon;
