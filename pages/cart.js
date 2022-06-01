import { css } from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setStringifiedCookie } from '../util/cookieHandler';
import { getItems } from '../util/database';

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

export default function Cart(props) {
  // console.log('props of cart: ', props);
  const [cartState, setCartState] = useState(props.cart);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    function calculateTotalSum() {
      let total = 0;
      cartState.map((cartItem) => {
        return (total +=
          props.items.find((item) => {
            return cartItem.itemId === item.itemId;
          }).itemPrice * cartItem.itemQuantity);
      });
      setSum(total);
    }
    calculateTotalSum();
  }, [cartState, props.items]);

  return (
    <div className="mainWrapper">
      <h1>THIS IS THE CART PAGE</h1>
      <main>
        <div className="cartItemWrapper" css={cartItemWrapperStyles}>
          {cartState.map((cartItem) => {
            return (
              <div key={`cart-${cartItem.itemId}`}>
                <h2>
                  {
                    props.items.find((item) => {
                      return cartItem.itemId === item.itemId;
                    }).itemName
                  }
                </h2>
                <label css={css`
                      margin-right: 5px;
                    `}>
                  <span
                    css={css`
                      margin-right: 5px;
                    `}
                  >
                    Amount:
                  </span>
                  <input
                    type="number"
                    css={inputAmountStyles}
                    min="1"
                    max={
                      props.items.find((item) => {
                        return cartItem.itemId === item.itemId;
                      }).itemStockQuantity
                    }
                    defaultValue={cartItem.itemQuantity}
                    onChange={(event) => {
                      const updatedCart = cartState.slice();
                      updatedCart.find((item) => {
                        return item.itemId === cartItem.itemId;
                      }).itemQuantity = Number(event.currentTarget.value);
                      console.log('updated cart state: ', updatedCart);
                      setStringifiedCookie('cart', updatedCart);
                      setCartState(updatedCart);
                    }}
                  />
                </label>
                <button
                  onClick={() => {
                    const updatedCart = cartState.filter((item) => {
                      return item.itemId !== cartItem.itemId;
                    });
                    console.log('after filter: ', updatedCart);
                    setStringifiedCookie('cart', updatedCart);
                    setCartState(updatedCart);
                    props.setCartCounter(props.cartCounter - 1);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div css={sumContainerStyles}>
          <p>Total sum: {sum} ₹</p>
        </div>
        <div>
          <Link href="/checkout">
            <button data-test-id="cart-checkout">Checkout</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // database items
  const databaseItems = await getItems();

  // cart cookie
  const cart = JSON.parse(context.req.cookies.cart || '[]');
  console.log('cart from cart serverside: ', cart);

  return { props: { cart: cart, items: databaseItems } };
}
