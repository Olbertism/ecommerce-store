import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerWrapperStyles = css`
  width: 100%;
  background-color: #fff;
  position: fixed;
  z-index: 9000;
  border-bottom: 1px solid #121212;

`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  vertical-align: middle;
  margin-top: 5px;
  margin-bottom: 5px;

  padding: 5px;
`;

const leftMenuWrapperStyles = css`
  width: 50%;
  margin-left: 15px;

  //max-height: 30px;
  @media only screen and (max-width: 960px) {
    width: 25%;
  }
  @media only screen and (max-width: 620px) {
    font-size: 14px;
    width: 15%;
  }
`;

const rightMenuWrapperStyles = css`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  padding-top: 10px;

  @media only screen and (max-width: 960px) {
    width: 75%;
  }
  @media only screen and (max-width: 620px) {
    font-size: 14px;
    width: 85%;
  }
`;

const logoWrapperStyles = css`
max-height: 30px;
`

const logoStyles = css`
  display: inline-block;
  width: 45px;
  margin-top: 0;
  margin-right: 80px;
  margin-left: auto;
  cursor: pointer;
  border: 0;
  max-width: 100%;
  vertical-align: middle;

`;

const cartWrapperStyles = css`
  display: flex;
  gap: 5px;
`;

const cartCounterStyles = css`
  min-width: 25px;
  border: 1px solid #121212;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

export default function Header(props) {
  // console.log('this is props of header: ', props);

  return (
    <header css={headerWrapperStyles}>
      <div css={headerStyles}>
        <div css={leftMenuWrapperStyles}><Link href="/">
            <img src="/logo.svg" alt="logo" css={logoStyles} />
          </Link>

        </div>
        <div css={rightMenuWrapperStyles}>
          <Link href="/spaceships">Space Ships</Link>
          <Link href="/land-vessels">Planetary Vessels</Link>
          <div css={cartWrapperStyles}>
            <Link href="/cart">Shopping Cart</Link>
            <div
              css={cartCounterStyles}
              className="cartCounterWrapper"
              data-test-id="cart-count"
            >
              {props.cartCounter}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
