import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { getItems } from '../util/database';

export const introTextStyles = css`
  font-size: 20px;
  color: #6b6b6b;
  margin-left: 20px;
  margin-bottom: 25px;
  width: 75%;
`;

export const itemWrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
`;

export const itemCardStyles = css`
  padding: 20px;
  border: 1px solid #121212;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  transition: background-color 0.2s;

  :hover {
    background-color: #121212;
    color: #fff;
    cursor: pointer;
  }

  > * {
    margin-bottom: 3px;
  }
`;

export const itemCardLinkStyles = css`
  :hover {
    background-color: #7de5ff;
  }
`;

export const itemImageStyles = css`
  border-radius: 4px;
`;

export const itemCardSubheadlineStyles = css`
  width: 300px;
`;

export default function Products(props) {
  return (
    <div className="mainWrapper">
      <h1>Browse our available products</h1>
      <p css={introTextStyles}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div css={itemWrapperStyles}>
        {props.products.map((item) => {
          return (
            <Link
              key={`items-products-${item.itemId}`}
              href={`/products/${item.itemId}`}
              css={itemCardLinkStyles}
            >
              <div className="itemCard" css={itemCardStyles}>
                <Image
                  src={`/${item.itemId}-${item.itemShortName}-product.jpg`}
                  alt=""
                  width="300"
                  height="200"
                  css={itemImageStyles}
                />
                <div
                  css={css`
                    font-weight: 600;
                  `}
                >
                  {item.itemName}
                </div>
                <div css={itemCardSubheadlineStyles}>
                  {item.itemSubheadline}
                </div>
                <div>Price: {item.itemPrice / 100} €</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const itemArray = await getItems();
  // console.log(itemArray)
  /* const spaceShipArray = items.filter((item) => {
    return item.itemType === 'spaceShip' ? true : false;
  }); */
  const filteredItems = itemArray.filter((item) => {
    return item.itemType === 'product' ? true : false;
  });

  return { props: { products: filteredItems } };
}