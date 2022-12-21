import React from "react";
import { ImSpinner8 } from "react-icons/im";
import style from "./Spinner.module.css";

export function Spinner() {
  return <ImSpinner8 className={style.rotate} color="yellow" />;
}
