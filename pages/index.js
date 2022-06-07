import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const featuredSectionStyles = css`
  display: flex;
  justify-content: space-evenly;
`;

const heroHeadlineWrapperStyles = css`
  display: flex;
  justify-content: space-around;
`;

const heroHeadlineStyles = css`
  position: relative;
  z-index: 10;
  font-size: 60px;
  padding-top: 60px;
`;

const heroIntroTextWrapperStyles = css`
  display: flex;
  justify-content: space-around;
`;

const heroIntroTextStyles = css`
  font-size: 25px;
  font-weight: 400;
  color: #6b6b6b;
  padding-bottom: 50px;
`;

const centerFlexWrapperStyles = css`
  display: flex;
  justify-content: space-around;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ecommerce Store</title>
        <meta
          name="description"
          content="Generated by some guy in a bootcamp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mainWrapper">
        <main>
          <div
            className="heroStage"
            css={css`
              position: relative;
            `}
          >
            <div css={heroHeadlineWrapperStyles}>
              <h1 css={heroHeadlineStyles}>Delivering the future</h1>
            </div>
            <div css={heroIntroTextWrapperStyles}>
              <h2 css={heroIntroTextStyles}>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia.
              </h2>
            </div>

            <div>Keyfigure 1</div>
            <div>Keyfigure 2</div>
          </div>
          <div className="featured">
            <section>
              <div css={centerFlexWrapperStyles}>
                <h2>Next generation assistive technologies</h2>
              </div>

              <div className="featuredSection" css={featuredSectionStyles}>
                <div>Card 1</div>
                <div>Card 2</div>
                <div>Card 3</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  // workaround because of getInitialProps https://github.com/vercel/next.js/discussions/18235
  return { props: { dummie: '' } };
}
