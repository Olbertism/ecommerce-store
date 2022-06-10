import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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

const featuredSectionStyles = css`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const featuredImgWrapperStyles = css`
  position: relative;
  width: 380px;
  height: 250px;
  border-radius: 10px;
  background-color: #121212;
  margin-bottom: 20px;
  filter: grayscale(100%);

  :hover {
    transition: filter 0.7s;
    filter: none;
  }

  img {
    border-radius: 10px;
  }

  img:hover {
    z-index: 0;
    transition: transform 2s;
    transform: scale(1.15);
  }
`;

/* const featuredImgOverlayStyles = css`
  position: relative;
  z-index: 90;
  width: 380px;
  height: 250px;
  // box-shadow: 0 0 0 13px #333;
  // border-radius: 10px;
`; */

const featuredImgTextStyles = css`
  color: #fff;
  font-size: 20px;
  background-color: rgba(61, 61, 61, 0.4);
  position: relative;
  top: 200px;
  padding-bottom: 27px;
  padding-left: 12px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const buttonSectionStyles = css`
  display: flex;
  justify-content: space-around;

  margin: 40px auto;

  button {
    padding: 8px;
    font-size: 18px;
  }

  button::after {
    content: ' >';
  }
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
          </div>
          <div className="featured">
            <section>
              <div css={centerFlexWrapperStyles}>
                <h2>Next generation assistive technologies</h2>
              </div>

              <div className="featuredSection" css={featuredSectionStyles}>
                <Link href="/products">
                  <div css={featuredImgWrapperStyles}>
                    <Image
                      src="/9-robot-lp.jpg"
                      alt="A cute robot that looks like E.T. from Steven Spielbergs cult movie from the 80ies."
                      layout="fill"
                      objectFit="contain"
                    />

                    <div css={featuredImgTextStyles}>Robotics</div>
                  </div>
                </Link>
                <Link href="/products">
                  <div css={featuredImgWrapperStyles}>
                    <Image
                      src="/4-circadia-lp.jpg"
                      alt="A weird satellite dish like appliance that might microwave your brain while you are asleep."
                      layout="fill"
                      objectFit="contain"
                    />
                    <div css={featuredImgTextStyles}>Appliances</div>
                  </div>
                </Link>
                <Link href="/products">
                  <div css={featuredImgWrapperStyles}>
                    <Image
                      src="/8-pillsy-lp.jpg"
                      alt="An overexpensive gadget next to a smartphone mockup."
                      layout="fill"
                      objectFit="contain"
                    />
                    <div css={featuredImgTextStyles}>Gadgets</div>
                  </div>
                </Link>
              </div>
              <div css={buttonSectionStyles}>
                <Link href="/products">
                  <button>Discover our products</button>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
