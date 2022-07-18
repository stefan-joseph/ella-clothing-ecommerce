import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { categories } from "../utils/categories";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";

const RefineMenu = ({ open, onCloseRefine, category }) => {
  const {
    productsResponse,
    colorQuery,
    sizeQuery,
    collectionQuery,
    handleQueryChange,
    darkMode,
    clearQueryParams,
  } = useAppContext();

  const [colorOpen, setColorOpen] = useState("open");
  const [sizeOpen, setSizeOpen] = useState("open");
  const [collectionOpen, setCollectionOpen] = useState("open");

  const getHeight = (id) => {
    return document.getElementById(id).scrollHeight;
  };

  useEffect(() => {
    setColorOpen(colorOpen ? `${getHeight("color-list-id")}` : "");
    setSizeOpen(sizeOpen ? `${getHeight("size-list-id")}` : "");
    setCollectionOpen(
      collectionOpen ? `${getHeight("collection-list-id")}` : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsResponse]);

  return (
    <Wrapper
      open={open}
      darkMode={darkMode}
      color={colorOpen}
      size={sizeOpen}
      collection={collectionOpen}
    >
      {open && <div className="overlay" onClick={onCloseRefine}></div>}
      <div className="refine-menu-container">
        <nav className="refine-menu">
          <button className="close" onClick={onCloseRefine}>
            ＋
          </button>
          <h3 className="heading">Category</h3>
          <div className="category-list">
            {categories.map((c) => {
              return (
                <Link
                  key={c}
                  className={
                    c === category
                      ? "category-label selected"
                      : "category-label highlight"
                  }
                  to={`/shop/${c}`}
                >
                  {c}
                </Link>
              );
            })}
          </div>
          {(colorQuery || sizeQuery || collectionQuery) && (
            <>
              <div className="heading">
                <h3>Refine By</h3>
                <button
                  className="reg-btn clear-btn highlight"
                  onClick={clearQueryParams}
                >
                  Clear all
                </button>
              </div>
              <div className="list refine-list">
                {colorQuery && (
                  <button
                    className="remove-btn highlight"
                    onClick={() =>
                      handleQueryChange({ name: "colorQuery", value: "" })
                    }
                  >
                    {colorQuery}
                    <span>＋</span>
                  </button>
                )}
                {sizeQuery && (
                  <button
                    className="remove-btn highlight"
                    onClick={() =>
                      handleQueryChange({ name: "sizeQuery", value: "" })
                    }
                  >
                    {sizeQuery} <span>＋</span>
                  </button>
                )}
                {collectionQuery && (
                  <button
                    className="remove-btn highlight"
                    onClick={() =>
                      handleQueryChange({ name: "collectionQuery", value: "" })
                    }
                  >
                    {collectionQuery} <span>＋</span>
                  </button>
                )}
              </div>
            </>
          )}
          <button
            className="heading"
            onClick={() =>
              setColorOpen(colorOpen ? "" : `${getHeight("color-list-id")}`)
            }
          >
            <h3>Color</h3>
            <RiArrowDownSLine className="color-arrow arrow" />
          </button>
          <div className="color-list list">
            <div id="color-list-id">
              {productsResponse.colors &&
                productsResponse.colors.map((color) => {
                  return (
                    <label
                      key={color}
                      className={
                        colorQuery === color
                          ? "color-selected color-label"
                          : "color-label"
                      }
                    >
                      <div
                        style={{ backgroundColor: color }}
                        className="color-container"
                      >
                        <input
                          className="color-radio"
                          type="radio"
                          name="colorQuery"
                          value={color}
                          onChange={(e) => {
                            colorQuery === color
                              ? handleQueryChange({
                                  name: e.target.name,
                                  value: "",
                                })
                              : handleQueryChange({
                                  name: e.target.name,
                                  value: e.target.value,
                                });
                          }}
                        ></input>
                      </div>
                    </label>
                  );
                })}
            </div>
          </div>
          <button
            className="heading"
            onClick={() =>
              setSizeOpen(sizeOpen ? "" : `${getHeight("size-list-id")}`)
            }
          >
            <h3>Size</h3>
            <RiArrowDownSLine className="size-arrow arrow" />
          </button>
          <div className="size-list list">
            <div id="size-list-id">
              {productsResponse.sizes &&
                productsResponse.sizes.map((array, index) => {
                  return (
                    <div key={index} className="size-sub-list">
                      {array.map((size) => {
                        return (
                          <label
                            key={size}
                            className={
                              size === sizeQuery
                                ? "size-label selected"
                                : "size-label highlight"
                            }
                          >
                            {size}
                            <input
                              className="size-radio"
                              type="radio"
                              name="sizeQuery"
                              value={size}
                              onChange={(e) =>
                                sizeQuery === size
                                  ? handleQueryChange({
                                      name: e.target.name,
                                      value: "",
                                    })
                                  : handleQueryChange({
                                      name: e.target.name,
                                      value: e.target.value,
                                    })
                              }
                            ></input>
                          </label>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
          <button
            className="heading"
            onClick={() =>
              setCollectionOpen(
                collectionOpen ? "" : `${getHeight("collection-list-id")}`
              )
            }
          >
            <h3>Collection</h3>
            <RiArrowDownSLine className="collection-arrow arrow" />
          </button>
          <div className="collection-list list">
            <div id="collection-list-id">
              {productsResponse.collections &&
                productsResponse.collections.map((c) => {
                  return (
                    <label
                      key={c}
                      className={
                        c === collectionQuery
                          ? "collection-label selected"
                          : "collection-label highlight"
                      }
                    >
                      {c}
                      <input
                        className="collection-radio"
                        type="radio"
                        name="collectionQuery"
                        value={c}
                        onChange={(e) =>
                          collectionQuery === c
                            ? handleQueryChange({
                                name: e.target.name,
                                value: "",
                              })
                            : handleQueryChange({
                                name: e.target.name,
                                value: e.target.value,
                              })
                        }
                      ></input>
                    </label>
                  );
                })}
            </div>
          </div>
          {/* <button
            className="heading"
            onClick={() =>
              setCollectionOpen(
                collectionOpen ? "" : `${getHeight("collection-list-id")}`
              )
            }
          >
            <h3>Price</h3>
            <RiArrowDownSLine className="collection-arrow arrow" />
          </button>
          <div>
            <label>
              <input type="range" min={0} max={100}></input>
            </label>
            <div className="number-inputs">
              <label>
                <input type="number" />
              </label>
              <label>
                <input type="number" />
              </label>
            </div>
          </div> */}
        </nav>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 98;
    visibility: visible;
  }

  .refine-menu-container {
    position: fixed;
    left: 100vw;
    height: 100vh;
    width: 18rem;
    background-color: var(--backgroundColor);
    z-index: 99;
    transform: ${({ open }) =>
      open ? "translateX(-18rem)" : "translateX(1rem)"};
    transition: transform 1.2s var(--transitionTiming);
    text-transform: capitalize;
    box-shadow: 0 0 15px black;
    overflow: scroll;
  }

  .refine-menu {
    position: relative;
    margin: 2rem 6%;
  }

  // universals

  h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    border-bottom: var(--borderWidth) solid var(--secondaryColor);
  }

  .arrow {
    transition: transform linear 0.3s;
  }

  .list {
    transition: height linear 0.3s;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .selected {
    background-color: var(--mainColor);
    color: var(--backgroundColor);
    font-weight: 400;
  }

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  .color-label,
  .size-label,
  .category-label,
  .collection-label {
    position: relative;
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
    cursor: pointer;
  }

  // category

  .category-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    border-bottom: var(--borderWidth) solid var(--secondaryColor);
  }

  .category-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
    margin-bottom: 2rem;
  }

  .category-label {
    padding: 0.3rem;
    width: fit-content;
  }

  // refine by

  .clear-btn {
    font-size: 0.8rem;
    color: var(--dangerColor);
    :hover {
      background-color: inherit;
    }
  }

  .refine-list {
    display: flex;
    gap: 1rem;
  }

  .remove-btn {
    font-size: 0.7rem;
    position: relative;
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
    padding: 0.3rem 0.8rem 0.3rem 0.3rem;
    text-transform: uppercase;
    span {
      font-size: 0.8rem;
      position: absolute;
      right: 0;
      top: 0;
      /* color: tomato; */
      transform: rotate(45deg);
    }
  }

  // color

  .color-arrow {
    transform: ${({ color }) => (color ? null : "rotate(180deg)")};
  }

  .color-list {
    height: ${({ color }) => (color ? `${color}px` : "0")};
  }

  #color-list-id {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }
  .color-label {
    border: none;
    width: 1.8rem;
    height: 1.8rem;
    padding: ${({ darkMode }) => (darkMode ? "0.15rem" : "0.1rem")};
  }

  .color-selected {
    border: 1px solid;
  }

  .color-container {
    width: 100%;
    height: 100%;
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
  }

  .color-radio {
  }

  // size

  .size-arrow {
    transform: ${({ size }) => (size ? null : "rotate(180deg)")};
  }

  .size-list {
    height: ${({ size }) => (size ? `${size}px` : "0")};
  }

  .size-sub-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  .size-sub-list ~ .size-sub-list {
    margin-top: 1rem;
  }

  .size-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    text-transform: uppercase;
  }

  // collection

  .collection-arrow {
    transform: ${({ collection }) => (collection ? null : "rotate(180deg)")};
  }

  .collection-list {
    height: ${({ collection }) => (collection ? `${collection}px` : "0")};
  }

  #collection-list-id {
    display: flex;
    gap: 1rem;
  }

  .collection-label {
    padding: 0.3rem;
    margin-bottom: 1rem;
  }

  .close {
    position: absolute;
    right: -1rem;
    top: -1.8rem;
    font-weight: 100;
    transform: rotate(45deg);
    font-size: 2.4rem;
  }
`;
export default RefineMenu;
