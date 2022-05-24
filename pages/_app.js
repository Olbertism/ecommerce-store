import Layout from '../components/Layout.js';
import { css, Global } from '@emotion/react';

export default function ECommerce({ Component, pageProps }) {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
