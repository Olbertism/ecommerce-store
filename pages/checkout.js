import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { setStringifiedCookie } from '../util/cookieHandler';
import { getItems } from '../util/database';

const itemNameStyles = css`
  font-weight: 600;
  margin-right: 15px;
`;

const itemInfoStyles = css`
  margin-right: 10px;
`;

const formWrapperStyles = css`
  max-width: 700px;
  margin-right: auto;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-bottom: 30px;
  border: 1px solid #121212;
  border-radius: 10px;
  padding: 8px;
  padding-top: 25px;

  div {
    margin-bottom: 15px;
  }

  div label {
    margin-right: 5px;
  }

  div label span {
    white-space: nowrap;
    margin-right: 3px;
  }
`;

const entryFieldWrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  label {
    display: flex;
    flex-basis: 49%;
    justify-content: space-between;
    @media (max-width: 740px) {
      flex-direction: column;
    }
  }

  @media (max-width: 740px) {
    flex-direction: column;
  }
`;

const preventDefault = (f) => (e) => {
  e.preventDefault();
  f(e);
};

export default function Checkout(props, { action = '/thankyou' }) {
  const router = useRouter();

  // ey yo lets replace this with an import from the cart, aye?
  function calculateTotalSum() {
    let total = 0;
    props.cart.map((cartItem) => {
      return (total +=
        props.items.find((item) => {
          return cartItem.itemId === item.itemId;
        }).itemPrice * cartItem.itemQuantity);
    });
    return total;
  }

  const handleSubmit = preventDefault(() => {
    console.log('FORM SUBMITTED');
    setStringifiedCookie('cart', []);
    props.setCartCounter(0);
    router
      .push({
        pathname: action
      })
      .catch(() => {
        console.log('Error while doing router.push()');
      });
  });

  return (
    <div className="mainWrapper">
      <h1>Checkout</h1>
      <main>
        <div>
          <div>
            Selected Items:
            {props.cart.map((cartItem) => {
              return (
                <div key={`item-${cartItem.itemId}`}>
                  <span css={itemNameStyles}>
                    {
                      props.items.find((item) => {
                        return cartItem.itemId === item.itemId;
                      }).itemName
                    }
                  </span>
                  <span css={itemInfoStyles}>
                    Price:&nbsp;
                    {(
                      Math.round(
                        props.items.find((item) => {
                          return cartItem.itemId === item.itemId;
                        }).itemPrice,
                      ) / 100
                    ).toFixed(2)}
                    €,
                  </span>
                  Amount:&nbsp;
                  <span>{cartItem.itemQuantity}</span>
                </div>
              );
            })}
            <div>
              Total: {(Math.round(calculateTotalSum()) / 100).toFixed(2)}€
            </div>
          </div>
          <h2>Customer Information</h2>
          <div css={formWrapperStyles}>
            <form
              /* action="/thankyou"
              method="get" */
              onSubmit={handleSubmit}
              /* onSubmit={(event) => {
                event.preventDefault();
              }} */
              css={formStyles}
            >
              <div>
                <div css={entryFieldWrapperStyles}>
                  <label>
                    <span>First name</span>
                    <input data-test-id="checkout-first-name" required />
                  </label>

                  <label>
                    <span>Last name</span>
                    <input data-test-id="checkout-last-name" required />
                  </label>
                </div>
                <div css={entryFieldWrapperStyles}>
                  <label>
                    <span>E-Mail address</span>
                    <input data-test-id="checkout-email" required />
                  </label>
                </div>
              </div>
              <div>
                <div css={entryFieldWrapperStyles}>
                  <label>
                    <span>Address</span>
                    <input data-test-id="checkout-address" required />
                  </label>
                  <label>
                    <span>City</span>
                    <input data-test-id="checkout-city" required />
                  </label>
                </div>
                <div css={entryFieldWrapperStyles}>
                  <label>
                    <span>Postal code</span>
                    <input data-test-id="checkout-postal-code" required />
                  </label>
                  <label>
                    <span>Country</span>
                    <input data-test-id="checkout-country" required />
                  </label>
                </div>
              </div>
              <div>
                <div css={entryFieldWrapperStyles}>
                  <label>
                    <span>Credit card number</span>
                    <input data-test-id="checkout-credit-card" required />
                  </label>
                </div>
                <div css={entryFieldWrapperStyles}>
                  <label>
                    <span>Expiration date</span>
                    <input data-test-id="checkout-expiration-date" required />
                  </label>
                  <label>
                    <span>Security code</span>
                    <input data-test-id="checkout-security-code" required />
                  </label>
                </div>
              </div>
              <div>
                <button data-test-id="checkout-confirm-order">
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // workaround because of getInitialProps https://github.com/vercel/next.js/discussions/18235

  // database items
  const databaseItems = await getItems();

  // cart cookie
  const cart = JSON.parse(context.req.cookies.cart || '[]');
  console.log('cart from cart serverside: ', cart);

  return { props: { cart: cart, items: databaseItems } };
}
