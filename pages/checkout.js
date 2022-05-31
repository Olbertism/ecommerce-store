export default function Checkout() {
  return (
    <div>
      <h1>THIS IS THE CHECKOUT PAGE</h1>
      <main>
        <div>
          <form>
            <div>
              <label>
                First name
                <input data-test-id="checkout-first-name" />
              </label>
              <label>
                Last name
                <input data-test-id="checkout-last-name" />
              </label>
              <label>
                E-Mail address
                <input data-test-id="checkout-email" />
              </label>
            </div>
            <div>
              <label>
                Address
                <input data-test-id="checkout-address" />
              </label>
              <label>
                City
                <input data-test-id="checkout-city" />
              </label>
              <label>
                Postal code
                <input data-test-id="checkout-postal-code" />
              </label>
              <label>
                Country
                <input data-test-id="checkout-country" />
              </label>
            </div>
            <div>
              <label>
                Credit card number
                <input data-test-id="checkout-credit-card" />
              </label>
              <label>
                Expiration date
                <input data-test-id="checkout-expiration-date" />
              </label>
              <label>
                Security code
                <input data-test-id="checkout-security-code" />
              </label>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
