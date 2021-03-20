import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

export const ProductsPageTemplate = ({
  image,
  title,
  heading,
  description,
  data,
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
          backgroundColor: "#f40",
          color: "white",
          padding: "1rem",
        }}
      >
        {title}
      </h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
              <p>{description}</p>
            </div>
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h4>Products</h4>
              {data.allShopifyProduct.edges.map(({ node }) => (
                <li key={node.shopifyId}>
                  <h3>
                    <Link to={`/products/${node.handle}`}>
                      {node.title}
                      {node.images && node.images.localFile && (
                        <img
                          src={node.images.localFile.childImageSharp.fluid.src}
                          alt={node.handle}
                        />
                      )}
                    </Link>
                  </h3>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

ProductsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

const ProductsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <ProductsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        data={data}
      />
    </Layout>
  );
};

ProductsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    allShopifyProduct: PropTypes.object,
  }),
};

export default ProductsPage;

export const productsPageQuery = graphql`
  query ProductsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              src
            }
          }
        }
        heading
        description
      }
    }
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          id
          title
          handle
          productType
          description
          descriptionHtml
          shopifyId
          options {
            id
            name
            values
          }
          variants {
            id
            title
            price
            availableForSale
            shopifyId
            selectedOptions {
              name
              value
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            id
            originalSrc
          }
        }
      }
    }
  }
`;
