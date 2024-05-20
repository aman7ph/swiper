import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductForm({ product }) {
  return (
    <div className="w-full h-full bg-white select-none p-5 rounded-2xl">
      <div className="bg-gray-200 h-3/6 flex justify-center items-center mb-[30px] rounded-2xl">
        <FontAwesomeIcon
          className="text-[120px] text-gray-400"
          icon={product?.image}
        />
      </div>
      <div className="flex justify-center items-center flex-col gap-[30px]">
        <div className="text-[31px] font-[bold]">{product?.name}</div>
        <div className="text-[21px]">{product?.price} U.S.D</div>
        <div className="text-xl bg-red-500 text-white w-3/5 text-center cursor-pointer transition-[0.3s] duration-[all] p-5 rounded-lg hover:bg-red-700">
          Add To Card
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
