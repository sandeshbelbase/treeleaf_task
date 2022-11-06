import React, { useState } from "react";
import ListTable from "../components/ListTable";

const Profiles = () => {
  const [submitted, setSubmitted] = useState(true);
  return (
    <>
      <ListTable submitted={submitted} setSubmitted={setSubmitted} />
    </>
  );
};

export default Profiles;
