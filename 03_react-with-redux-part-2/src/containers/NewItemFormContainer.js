import { connect } from "react-redux";

import { NewItemForm } from "../components/NewItemForm";
import { addNewItem } from "../store/items/actions";

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (name, price) => dispatch(addNewItem(name, price))
  };
};

// If you're using simple dispatch functions, you don't even need to pass dispatch to it.
// You can just use an object
//
// const mapDispatchToProps = {
//     onSubmit: (name, price) => dispatch(addNewItem(name, price));
// };

export const NewItemFormContainer = connect(
  null,
  mapDispatchToProps
)(NewItemForm);
