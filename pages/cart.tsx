import { css } from '@emotion/react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next/types';
import { createRef, useEffect, useRef, useState } from 'react';
import { setStringifiedCookie } from '../util/cookieHandler';
import { getItems } from '../util/database';
import { CookieCartType, DatabaseItemsType } from '../util/types';

const cartItemWrapperStyles = css`
  margin-bottom: 30px;
`;

const inputAmountStyles = css`
  width: 60px;
`;

const sumContainerStyles = css`
  border-top: 1px solid #121212;
  width: 25%;
`;

type Props = {
  cart: CookieCartType[] | any;
  items: DatabaseItemsType[] | any;
  cartCounter: number;
  setCartCounter: any;
};

export function calculateTotalSum(
  cartArray: CookieCartType[],
  DBarray: Props['items'],
) {
  let total = 0;
  cartArray.map((cartItem: CookieCartType) => {
    return (total +=
      DBarray.find((item: DatabaseItemsType) => {
        return cartItem.itemId === item.itemId;
      }).itemPrice * cartItem.itemQuantity);
  });
  return total;
}

export default function Cart(props: Props) {
  // console.log('props of cart: ', props);
  const [cartState, setCartState] = useState(props.cart);
  const [sum, setSum] = useState(0);

  /*  if (!props) {
    return <div>Something went terribly wrong</div>
  } */

  useEffect(() => {
    /* function calculateTotalSum() {
      let total = 0;
      cartState.map((cartItem: CookieCartType) => {
        return (total +=
          props.items.find((item: DatabaseItemsType) => {
            return cartItem.itemId === item.itemId;
          }).itemPrice * cartItem.itemQuantity);
      });
      setSum(total);
    }
    calculateTotalSum(); */
    setSum(calculateTotalSum(cartState, props.items));
  }, [cartState, props.items]);

  // refs
  // somehow it works like this... https://stackoverflow.com/questions/54940399/how-target-dom-with-react-useref-in-map/55105849
  const refs = useRef([createRef<HTMLInputElement>(), createRef<HTMLInputElement>()]);

  return (
    <div className="mainWrapper">
      <h1>Selected products</h1>
      <main>
        <div className="cartItemWrapper" css={cartItemWrapperStyles}>
          {cartState.map((cartItem: CookieCartType, index: number) => {
            return (
              <div
                key={`cart-${cartItem.itemId}`}
                data-test-id={`cart-product-${cartItem.itemId}`}
              >
                <h2>
                  {
                    props.items.find((item: DatabaseItemsType) => {
                      return cartItem.itemId === item.itemId;
                    }).itemName
                  }
                </h2>
                <p>
                  {(
                    Math.round(
                      props.items.find((item: DatabaseItemsType) => {
                        return cartItem.itemId === item.itemId;
                      }).itemPrice,
                    ) / 100
                  ).toFixed(2)}
                  €
                </p>
                <label
                  css={css`
                    margin-right: 5px;
                  `}
                >
                  <span
                    css={css`
                      margin-right: 5px;
                    `}
                  >
                    Amount:
                  </span>
                  <input
                    data-test-id={`cart-product-quantity-${cartItem.itemId}`}
                    type="number"
                    ref={refs.current[index]}
                    css={inputAmountStyles}
                    min="1"
                    max={
                      props.items.find((item: DatabaseItemsType) => {
                        return cartItem.itemId === item.itemId;
                      }).itemStockQuantity
                    }
                    defaultValue={cartItem.itemQuantity}
                    onChange={(event) => {
                      console.log(event);
                      const updatedCart = cartState.slice();
                      updatedCart.find((item: CookieCartType) => {
                        return item.itemId === cartItem.itemId;
                      }).itemQuantity = Number(event.currentTarget.value);
                      let newTotalNumberOfItems = 0;
                      for (let i = 0; i < updatedCart.length; i++) {
                        newTotalNumberOfItems += updatedCart[i].itemQuantity;
                      }
                      console.log(newTotalNumberOfItems);
                      props.setCartCounter(newTotalNumberOfItems);
                      console.log('updated cart state: ', updatedCart);
                      setStringifiedCookie('cart', updatedCart);
                      setCartState(updatedCart);
                    }}
                  />
                </label>
                <button
                  data-test-id={`cart-product-remove-${cartItem.itemId}`}
                  onClick={() => {
                    const updatedCart = cartState.filter((item: CookieCartType) => {
                      return item.itemId !== cartItem.itemId;
                    });
                    console.log('after remove filter: ', updatedCart);
                    setStringifiedCookie('cart', updatedCart);
                    setCartState(updatedCart);

                    props.setCartCounter(
                      props.cartCounter -
                        Number(refs.current[index].current?.value),
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div css={sumContainerStyles}>
          <p>
            Total sum:{' '}
            <span data-test-id="cart-total">
              {(Math.round(sum) / 100).toFixed(2)}
            </span>{' '}
            €
          </p>
        </div>
        <div>
          <Link href="/checkout">
            <button
              disabled={cartState.length === 0 ? true : false}
              data-test-id="cart-checkout"
            >
              Checkout
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // database items
  const databaseItems = await getItems();
  console.log(databaseItems);

  // cart cookie
  const cart = JSON.parse(context.req.cookies.cart || '[]') as CookieCartType[];
  console.log('cart from cart serverside: ', cart);

  /*  if (!databaseItems) {
    console.log("APPARENTLY DB ITEMS ARE FALSY?...")
    console.log(databaseItems);
    return "What?"
  } */

  return { props: { cart: cart, items: databaseItems } };
}
