import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import ProductForm from "../components/ProductForm";

const ProductTemplate = ({ pageContext }) => {
  console.log(pageContext);
  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {pageContext.product.title}
                </h2>
                {pageContext.product.images &&
                  pageContext.product.images.localFile && (
                    <img
                      src={
                        pageContext.product.images.localFile.childImageSharp
                          .fluid.src
                      }
                      alt={pageContext.product.handle}
                    />
                  )}
                {/* <div
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        /> */}
                <ProductForm product={pageContext.product} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// export const query = graphql`
//   query($handle: String!) {
//     shopifyProduct(handle: { eq: $handle }) {
//       id
//       title
//       handle
//       productType
//       description
//       descriptionHtml
//       shopifyId
//       options {
//         id
//         name
//         values
//       }
//       variants {
//         id
//         title
//         price
//         availableForSale
//         shopifyId
//         selectedOptions {
//           name
//           value
//         }
//       }
//       priceRange {
//         minVariantPrice {
//           amount
//           currencyCode
//         }
//         maxVariantPrice {
//           amount
//           currencyCode
//         }
//       }
//       images {
//         id
//         originalSrc
//       }
//     }
//   }
// `;

export default ProductTemplate;
