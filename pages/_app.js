import { css, Global } from '@emotion/react';
import { useState } from 'react';
import Layout from '../components/Layout.js';
import { getParsedCookie } from '../util/cookieHandler.js';

export default function ECommerce({ Component, pageProps }) {
  console.log('_app pageProps is: ', pageProps);

  // for reasons unknown to me, this needs to be in a ternary, otherwise the upcoming .length call targets undefined and throws an error
  const cartCookie = getParsedCookie('cart') ? getParsedCookie('cart') : [];

  console.log('cart cookie from _app.js', cartCookie);
  console.log('cart length in _app.js', cartCookie.length);

  const [cartCounter, setCartCounter] = useState(cartCookie.length);

  pageProps.cartCounter = cartCounter;
  pageProps.setCartCounter = setCartCounter;
  console.log('cartCounter is: ', cartCounter);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI,
              Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
          }
          * {
            box-sizing: border-box;
            font-family: 'Play', sans-serif;
          }

          div.heroStage h1 {
            font-family: 'Orbitron', sans-serif;
          }

          a {
            text-decoration: none;
            color: #3c3c3c;
          }

          a:hover {
            text-decoration: underline;
            color: #6f6f6f;
          }
        `}
      />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
