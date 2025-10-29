import Image from "next/image";
import React from "react";

const NoData = () => {
  return (
    <div className="flex justify-center items-center">
      <Image src={"/no-data.png"} height={300} width={300} alt="no-data" />
    </div>
  );
};

export default NoData;
