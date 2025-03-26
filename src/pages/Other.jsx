import { Fragment } from "react";
import Section from "../components/Section";
import { products } from "../utils/products";

import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Other = () => {  
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <Section title="Other - Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Other;
