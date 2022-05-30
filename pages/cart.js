import { useEffect, useState } from 'react';
import { setStringifiedCookie } from '../util/cookieHandler';
import { items as DBItems } from '../util/fakeDB';

export default function Cart(props) {
  const [cartState, setCartState] = useState(props.cart);
  const [sum, setSum] = useState(0)
  console.log(cartState);

  useEffect(()=>{
    console.log("use effect triggered!")
    function calculateTotalSum() {
      let total = 0;
      cartState.map((cartItem) => {
        return (total +=
          DBItems.find((item) => {
            return cartItem.itemId === item.itemId;
          }).itemPrice * cartItem.itemQuantity);
      });
      setSum(total)
      //return total;
    }
    calculateTotalSum()
  }, [cartState])


  return (
    <div>
      <h1>THIS IS THE CART PAGE</h1>
      <main>
        <div className="cartItemWrapper">
          {cartState.map((cartItem) => {
            return (
              <div key={`cart-${cartItem.itemId}`}>
                <h2>
                  {
                    DBItems.find((item) => {
                      return cartItem.itemId === item.itemId;
                    }).itemName
                  }
                </h2>
                <label>
                  Amount:
                  <input
                    type="number"
                    min="1"
                    max={DBItems.find((item) => {
                      return cartItem.itemId === item.itemId;
                    }).itemStockQuantity}
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
                  }}
                >
                  Remove from cart
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <p>Total sum: {sum} ₹</p>
        </div>
      </main>
    </div>
  );
}

export function getServerSideProps(context) {
  const cart = JSON.parse(context.req.cookies.cart || '[]');
  console.log(cart);

  return { props: { cart: cart } };
}
