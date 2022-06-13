import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout.js';
import { getParsedCookie } from '../util/cookieHandler.ts';

export default function ECommerce({ Component, pageProps }) {
  /* console.log('_app pageProps is: ', pageProps);
  console.log('_app props is: ', props); */

  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const cookie = getParsedCookie('cart');
    let totalCartItems = 0;
    for (let i = 0; i < cookie.length; i++) {
      totalCartItems += Number(cookie[i].itemQuantity);
    }
    console.log('totalItems: ', totalCartItems);
    setCartCounter(totalCartItems);
  }, []);

  // I keep this here just in case...
  if (!pageProps) {
    pageProps = {};
  }

  pageProps.cartCounter = cartCounter;
  pageProps.setCartCounter = setCartCounter;
  console.log('cartCounter is: ', cartCounter);

  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700&amp;family=Play:wght@400;700&amp;display=swap');

          @font-face {
            font-family: 'Play';
            src: url('/fonts/Play-Regular.ttf');
            font-weight: normal;
            font-style: sans-serif;
          }
          @font-face {
            font-family: 'Orbitron';
            src: url('/fonts/Orbitron-Regular.ttf');
            font-weight: normal;
            font-style: sans-serif;
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }
          * {
            box-sizing: border-box;
            font-family: 'Play', sans-serif;
          }

          div.mainWrapper.small {
            max-width: 900px;
          }

          div.mainWrapper {
            min-height: calc(100vh - 132px);
            max-width: 1200px;
            margin: 60px auto;
            margin-top: 0px;
            position: relative;
            top: 100px;
            padding-bottom: 2.5rem;
          }

          div.mainWrapper h1 {
            margin-top: 0px;
            margin-left: 20px;

            @media only screen and (max-width: 380px) {
              font-size: 28px;
            }
          }

          div.mainWrapper main {
            margin-left: 20px;
          }

          div.heroStage h1 {
            font-family: 'Orbitron', sans-serif;
          }

          button {
            background-color: #fc2b2b;
            color: #121212;
            border: none;
            padding: 3px;
            border-radius: 5px;
          }

          button:hover {
            background-color: #ff6666;
          }
          button:disabled {
            background-color: lightgrey;
          }

          a {
            text-decoration: none;
            color: #3c3c3c;
          }

          a:hover {
            text-decoration: underline;
            color: #6f6f6f;
          }

          p a {
            color: #fc2b2b;
          }
        `}
      />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
