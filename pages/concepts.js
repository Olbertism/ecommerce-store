import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { getItems } from '../util/database';
import { introTextStyles, itemCardStyles, itemWrapperStyles } from './products';

export default function Concepts(props) {
  return (
    <div className="mainWrapper">
      <h1>Current concept studies</h1>
      <p css={introTextStyles}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div css={itemWrapperStyles}>
        {props.products.map((item) => {
          return (
            <Link
              href={`/products/${item.itemId}`}
              key={`items-concepts-${item.itemId}`}
            >
              <div className="itemCard" css={itemCardStyles}>
                <Image
                  src={`/${item.itemId}-${item.itemShortName}.jpg`}
                  alt=""
                  width="300"
                  height="200"
                />
                <div
                  css={css`
                    font-weight: 600;
                  `}
                >
                  {item.itemName}
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
  console.log(itemArray);

  const filteredItems = itemArray.filter((item) => {
    return item.itemFlag === 'concept' ? true : false;
  });

  return { props: { products: filteredItems } };
}
