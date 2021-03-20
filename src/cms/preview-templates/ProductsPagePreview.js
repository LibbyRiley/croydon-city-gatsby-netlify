import React from "react";
import PropTypes from "prop-types";
import { ProductsPageTemplate } from "../../templates/products-page";

const ProductsPagePreview = ({ entry, getAsset }) => {
  return (
    <ProductsPageTemplate
      image={getAsset(entry.getIn(["data", "image"]))}
      title={entry.getIn(["data", "title"])}
      heading={entry.getIn(["data", "heading"])}
      description={entry.getIn(["data", "description"])}
    />
  );
};

ProductsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default ProductsPagePreview;
