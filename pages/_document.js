import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400;500;600&family=Orbitron:wght@500;600;700&family=Play:wght@400;700&family=Poller+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/* export function getServerSideProps(context) {
  // cart cookie
  console.log(context.req)
  const cart = JSON.parse(context.req.cookies.cart || '[]');
  console.log("im a cart: ", cart);
  console.log("----------")
  console.log(cart.length);

  return { props: { cartCounter: cart.length } };
} */
