import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { getItems } from '../util/database';

// import { items } from '../util/fakeDB';

export const itemWrapperStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

export const itemCardStyles = css`
  padding: 20px;
  border: 2px solid gray;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
`;

export default function Spaceships(props) {
  return (
    <div>
      <h1>Here you can find all available Space ships</h1>
      <div css={itemWrapperStyles}>
        {props.spaceShips.map((item) => {
          return (
            <div
              key={`items-spaceships-${item.itemId}`}
              className="itemCard"
              css={itemCardStyles}
            >
              <Image src={`/${item.itemId}.jpg`} alt="" width="300" height="200"/>
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
  const itemArray = await getItems()
  console.log(itemArray)
  /* const spaceShipArray = items.filter((item) => {
    return item.itemType === 'spaceShip' ? true : false;
  }); */
  const filteredItems = itemArray.filter((item) => {
    return item.itemType === 'space' ? true : false;
  });

  return { props: { spaceShips: filteredItems } };
}
