import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Banner from "../components/Banner";
import { shopBanners } from "../utils/BannerData";
import {
  ProductContainer,
  Loading,
  ShopToolbar,
  RefineMenu,
  Alert,
} from "../components";

const Shop = () => {
  const {
    getAllProducts,
    productsResponse,
    colorQuery,
    sizeQuery,
    collectionQuery,
    sortQuery,
    pageQuery,
    handleStateChange,
    loading,
    darkMode,
    showAlert,
  } = useAppContext();

  let { category } = useParams();

  const [refineMenu, setRefineMenu] = useState(false);

  useEffect(() => {
    getAllProducts({
      category,
      page: pageQuery,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, colorQuery, sizeQuery, collectionQuery, sortQuery, pageQuery]);

  return (
    <Wrapper darkMode={darkMode}>
      <RefineMenu
        open={refineMenu}
        onCloseRefine={() => setRefineMenu(false)}
        category={category}
      />
      <section className="main-banner">
        <Banner
          main={false}
          height="65vh"
          bannerData={shopBanners[`${category}`]}
          position="absolute"
        />
      </section>
      <section className="store">
        <ShopToolbar
          onRefineMenu={() => setRefineMenu(true)}
          category={category}
        />
        {loading === "products" ? (
          <div className="loading-container">
            <Loading text="Loading the goods" />
          </div>
        ) : showAlert === "products" ? (
          <Alert />
        ) : productsResponse.products ? (
          <div className="store-display">
            <div className="product-count">
              <p>
                {productsResponse.totalProducts} product
                {productsResponse.totalProducts !== 1 && "s"} found — Page{" "}
                {pageQuery} of {productsResponse.numOfPages}
              </p>
            </div>
            {productsResponse.products.length < 1 ? (
              <h3 className="no-products">
                Sorry, there are no products that match this query...
              </h3>
            ) : (
              <div className="products-container">
                {productsResponse.products.map((item) => {
                  return <ProductContainer key={item._id} product={item} />;
                })}
              </div>
            )}
            <div className="pagination">
              <button
                className="prev back-btn"
                onClick={() =>
                  handleStateChange({ name: "pageQuery", value: pageQuery - 1 })
                }
                disabled={pageQuery === 1}
              >
                prev
              </button>
              <p>
                Page {pageQuery} of {productsResponse.numOfPages}
              </p>
              <button
                className="next submit-btn"
                onClick={() =>
                  handleStateChange({ name: "pageQuery", value: pageQuery + 1 })
                }
                disabled={pageQuery >= productsResponse.numOfPages}
              >
                next
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </Wrapper>
  );
};

export default Shop;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 5rem;
  .store {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--appWidth);
    flex-grow: 1;

    .store-display {
      margin-top: 2rem;
      width: 100%;
      height: 100%;

      .product-count {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 3rem;
        padding: 0.5rem 0;
        border-bottom: var(--borderWidth) solid var(--tertiaryColor);
      }
      .products-container {
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem 3rem;
        @media (max-width: 1100px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 800px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 550px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
      .no-products {
        display: flex;
        font-size: 1.5rem;
        justify-content: center;
        align-items: center;
        height: 15rem;
        text-transform: none;
      }
      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 1rem 0;
        padding: 0.5rem 0;
        border-bottom: var(--borderWidth) solid var(--tertiaryColor);
      }
    }
  }

  .loading-container {
    height: 50vh;
    margin-top: 2rem;
  }
`;
