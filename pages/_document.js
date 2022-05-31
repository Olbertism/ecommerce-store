import Cookies from 'js-cookie';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument(props) {
  // what is this and do I need this???
  /* async function getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  console.log(props)
 */
  // not working, investigate how to do...
  /* const cookieValue = Cookies.get("cart");
  console.log(cookieValue) */


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