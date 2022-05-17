import React from "react";
import { BiRupee } from "react-icons/bi";

/**
 * @author
 * @function Price
 **/

export const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      <BiRupee />
      {props.value}
    </div>
  );
};