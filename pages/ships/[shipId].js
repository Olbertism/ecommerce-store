import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import {
  getParsedCookie,
  setStringifiedCookie,
} from '../../util/cookieHandler';
import { getItem } from '../../util/database';

// import { items } from '../../util/fakeDB';

const itemPageStyles = css`
  width: 1200px;
  margin: 0 auto;
`;

export default function Ship(props) {
  // console.log('shipID props are: ', props);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // console.log('selected quantity: ', selectedQuantity);

  if (!props.ship) {
    return (
      <div css={itemPageStyles}>
        <Head>
          <title>Page not found</title>
          <meta name="" content="not found" />
        </Head>
        <h1>Not Found</h1>
        <h2>This is not the ship you are looking for...</h2>
      </div>
    );
  }

  return (
    <div css={itemPageStyles}>
      <Head>
        <title>{props.ship.itemName}</title>
        <meta
          name="description"
          content={`${props.ship.itemName} is a <blank> with a <blank>`}
        />
      </Head>
      {/* This h1 needs to stay for drone I think */}
      <h1>{props.ship.itemName}</h1>

      <div>
        <Image
          src={`/${props.ship.itemId}.jpg`}
          alt="Picture of the selected product"
          width="600"
          height="400"
        />
        <div>
          <div>Price: {props.ship.itemPrice} ₹</div>
          <div>in Stock: {props.ship.itemStockQuantity}</div>
        </div>
        <div>
          <label>
            Amount
            <input
              type="number"
              name="quantity"
              min="1"
              max={props.ship.itemStockQuantity}
              defaultValue="1"
              onChange={(event) => {
                setSelectedQuantity(event.currentTarget.value);
              }}
            />
          </label>
          <button
            onClick={() => {
              const currentCart = getParsedCookie('cart')
                ? getParsedCookie('cart')
                : [];
              console.log('The cart is: ', currentCart);
              console.log(currentCart.length)

              const selectedItem = currentCart.find(
                (item) => item.itemId === props.ship.itemId,
              );

              if (selectedItem) {
                selectedItem.itemQuantity =
                  Number(selectedItem.itemQuantity) + Number(selectedQuantity);
                console.log(
                  'The item is already in the cart, updating quantity',
                );
                console.log('carts now: ', currentCart);
                setStringifiedCookie('cart', currentCart);
              } else {
                const updatedCart = [
                  ...currentCart,
                  {
                    itemId: props.ship.itemId,
                    itemName: props.ship.itemName,
                    itemQuantity: selectedQuantity,
                  },
                ];
                setStringifiedCookie('cart', updatedCart);
                props.setCartCounter(props.cartCounter + 1);
                console.log('The cart is: ', updatedCart);
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  /*
  const selectedShip =
  items.find((ship) => {
    return ship.itemId === context.query.shipId;
  }); */

  const selectedShip = await getItem(context.query.shipId);
  console.log(selectedShip);

  if (!selectedShip) {
    context.res.statusCode = 404;
  }

  console.log(selectedShip);

  return {
    props: {
      ship: selectedShip || null,
    },
  };
}
