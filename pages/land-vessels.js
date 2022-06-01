import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { getItems } from '../util/database';
import { itemCardStyles, itemWrapperStyles } from './spaceships';

export default function LandVessels(props) {
  return (
    <div className='mainWrapper'>
      <h1>Here you can find all available planetary vessels</h1>
      <div css={itemWrapperStyles}>
        {props.planetaries.map((item) => {
          return (
            <div
              key={`items-planetaries-${item.itemId}`}
              className="itemCard"
              css={itemCardStyles}
            >
              <Image
                src={`/${item.itemId}.jpg`}
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
              <div>Price: {item.itemPrice} ₹</div>
              <Link href={`/ships/${item.itemId}`}>Product Page</Link>
            </div>
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
    return item.itemType === 'planetary' ? true : false;
  });

  return { props: { planetaries: filteredItems } };
}
