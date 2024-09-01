import React, {useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Buy() {
  
  const location = useLocation()

  const {data} = location.state || {}
  

  console.log(data)

  return (
    <div>
      book will be displayed here
    </div>
  );
}

export default Buy;
