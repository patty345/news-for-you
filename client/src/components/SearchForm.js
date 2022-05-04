import React from "react";
import { useLocation } from "react-router";

const location = useLocation();

const Form = () => (
  <form>
    <input type="text" />
    <button>Search</button>
  </form>
);

export default Form;
