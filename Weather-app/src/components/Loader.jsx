import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center mt-10">
      <PuffLoader color="#bac2ce" size={80} />
    </div>
  );
};

export default Loader;
