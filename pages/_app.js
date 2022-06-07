import { css, Global } from '@emotion/react';
import { Dispatch, useEffect, useState } from 'react';
import Layout from '../components/Layout.js';
import { getParsedCookie } from '../util/cookieHandler';

export default function ECommerce({ Component, pageProps, props }) {
  console.log('_app pageProps is: ', pageProps);
  console.log('_app props is: ', props);

  useEffect(() => {
    const test = getParsedCookie('cart');
    console.log('TEST COOKIE:', test);
  }, []);

  // this is a stupid workaround, maybe can be removed once i figured out the props issue...
  if (!pageProps) {
    pageProps = {};
  }
  // yet a second stupid workaround...
  if (!props.cookies.cart) {
    props.cookies.cart = '[]';
  }
  const cartCookie = JSON.parse(props.cookies.cart);
  console.log('cartCookie:', cartCookie);

  console.log('cart cookie from _app.js', cartCookie);
  console.log('cart length in _app.js', cartCookie.length);

  let totalCartItems = 0;
  for (let i = 0; i < cartCookie.length; i++) {
    totalCartItems += Number(cartCookie[i].itemQuantity);
  }
  console.log('totalItems: ', totalCartItems);

  const [cartCounter, setCartCounter] = useState(totalCartItems);
  
  console.log('cartCounter:', cartCounter);

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
            color: #fff;
            border: none;
            padding: 3px;
          }

          button:hover {
            background-color: #ff6666;
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

// Works only on pages where getServerSideProps is present... weird thing...
ECommerce.getInitialProps = (context) => {
  console.log('-------------------------------');
  // console.log(context.ctx.req)
  console.log(context.ctx.req.cookies);
  if (!context.ctx.req.cookies) {
    return { props: { cookies: [] } };
  }
  return { props: { cookies: context.ctx.req.cookies } };
};

export function getServerSideProps(context) {
  console.log('-------------------------------');
  console.log(context.req.cookies);

  return { props: { test: 'TEST' } };
}
