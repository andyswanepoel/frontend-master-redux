import { connect } from "react-redux";
import { MenuItem } from "../components/MenuItem";
import {
  removeItem,
  updateItemPrice,
  updateItemQuantity
} from "../store/items/actions";
import { bindActionCreators } from "redux";
import { selectItemTotal } from "../store/items/selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    total: selectItemTotal(state, ownProps)
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      remove: () => removeItem(ownProps.uuid),
      updatePrice: price => updateItemPrice(ownProps.uuid, price),
      updateQuantity: quantity => updateItemQuantity(ownProps.uuid, quantity)
    },
    dispatch
  );

export const MenuItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);
