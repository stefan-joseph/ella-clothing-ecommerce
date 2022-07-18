import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { categories } from "../utils/categories";
import { IoOptionsSharp } from "react-icons/io5";
import { FormRowSelect } from ".";

const ShopToolbar = ({ onRefineMenu, category }) => {
  const {
    handleQueryChange,
    clearQueryParams,
    sortQuery,
    colorQuery,
    sizeQuery,
    collectionQuery,
    transitionRouter,
    loading,
  } = useAppContext();

  return (
    <Wrapper>
      <div className="category-bar">
        <select
          className="form-select"
          value={category}
          onChange={(e) => {
            transitionRouter(`/shop/${e.target.value}`);
          }}
        >
          <option value="" className="option-placeholder" disabled>
            Category
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              shop | {c}
            </option>
          ))}
        </select>
        <div className="bar-extend"></div>
      </div>
      <div className="secondary-bar">
        <div className="refine">
          {(colorQuery || sizeQuery || collectionQuery) && (
            <button className="reg-btn clear-btn" onClick={clearQueryParams}>
              clear all
            </button>
          )}
          <button
            className="reg-btn refine-btn highlight"
            onClick={onRefineMenu}
          >
            refine by
            <IoOptionsSharp className="adjust-icon" />
          </button>
        </div>
        <FormRowSelect
          type="text"
          name="sortQuery"
          labelText="Sort By"
          value={sortQuery}
          handleChange={(e) => {
            handleQueryChange({ name: e.target.name, value: e.target.value });
          }}
          list={[
            "Recently Added",
            "Price - High to Low",
            "Price - Low to High",
          ]}
          disabled={loading}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-transform: capitalize;
  margin-top: 2rem;

  .category-bar {
    display: flex;

    width: 100%;
    text-transform: uppercase;

    label {
      font-size: 0.7rem;
    }

    .form-select {
      text-transform: uppercase;
      flex: 1;
      width: fit-content;
      word-spacing: 0.5rem;
      height: var(--navbarHeight);
      font-size: 1rem;
      border-top: var(--borderWidth) solid var(--tertiaryColor);
      border-bottom: var(--borderWidth) solid var(--secondaryColor);
      :hover {
        border-bottom: var(--borderWidth) solid var(--mainColor);
      }
      :focus {
        border-bottom: var(--borderWidth) solid var(--mainColor);
      }
      @media (min-width: 500px) {
        flex: none;
      }
    }

    .bar-extend {
      flex: 0;
      height: var(--navbarHeight);
      border-top: var(--borderWidth) solid var(--tertiaryColor);
      border-bottom: var(--borderWidth) solid var(--tertiaryColor);
      @media (min-width: 500px) {
        flex: 1;
      }
    }
  }

  .secondary-bar {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    justify-content: left;
    white-space: nowrap;
    z-index: 2;
    width: 100%;

    @media (min-width: 600px) {
      flex-direction: unset;
      justify-content: right;
      gap: 2rem;
    }

    .refine {
      display: flex;
      width: fit-content;
      gap: 1rem;
      .refine-btn {
        display: flex;
        font-size: 0rem;
        border-color: var(--secondaryColor);
        margin-bottom: 1rem;
        color: inherit;

        .adjust-icon {
          font-size: 1.5rem;
          margin-right: 0.3rem;
        }

        @media (min-width: 300px) {
          font-size: initial;
          .adjust-icon {
            margin-left: 0.8rem;
            font-size: 1.2rem;
            margin-right: 0;
          }
        }
      }
      .clear-btn {
        margin-bottom: 1.3rem;
        color: var(--dangerColor);
        font-size: 0.8rem;
        padding: 0.3rem;
      }
    }

    label {
      font-size: 0.7rem;
    }
    .form-select {
      width: fit-content;
      align-self: center;
      font-size: 1rem;
      :hover {
        border-bottom: var(--borderWidth) solid var(--secondaryColor);
      }
      :focus {
        border-bottom: var(--borderWidth) solid var(--secondaryColor);
      }
    }
  }
`;

export default ShopToolbar;
