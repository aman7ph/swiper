import React from "react";
import "./productform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductForm({ product }) {
  return (
    <div className="productFormRoot">
      <div className="productImageContainer">
        <FontAwesomeIcon className="faIcon" icon={product?.image} />
      </div>
      <div className="productInfoContainer">
        <div className="productTitle">{product?.name}</div>
        <div className="productPrice">{product?.price} U.S.D</div>
        <div className="addToCardBtn">Add To Card</div>
      </div>
    </div>
  );
}

export default ProductForm;
