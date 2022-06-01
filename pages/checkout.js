import { css } from '@emotion/react';

const formStyles = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 600px;

  div {
    margin-bottom: 25px;
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
`;

export default function Checkout() {
  return (
    <div className="mainWrapper">
      <h1>THIS IS THE CHECKOUT PAGE</h1>
      <main>
        <div>
          <form onSubmit={(event) => {
          event.preventDefault();}} css={formStyles}>
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
              <label>
                <span>E-Mail address</span>
                <input data-test-id="checkout-email" required />
              </label>
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
                  <input data-test-id="checkout-credit-card" required  />
                </label>
              </div>
              <div css={entryFieldWrapperStyles}>
                <label>
                  <span>Expiration date</span>
                  <input data-test-id="checkout-expiration-date" required  />
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
      </main>
    </div>
  );
}

export function getServerSideProps() {
  // workaround because of getInitialProps https://github.com/vercel/next.js/discussions/18235
  return { props: { dummie: '' } };
}
