import { css } from '@emotion/react';
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
    width: 30%;
  }
  @media only screen and (max-width: 620px) {
    font-size: 14px;
    width: 15%;
  }
`;

const rightMenuWrapperStyles = css`
  display: flex;
  width: 30%;
  justify-content: space-evenly;
  padding-top: 10px;

  @media only screen and (max-width: 960px) {
    width: 75%;
  }
  @media only screen and (max-width: 620px) {
    font-size: 16px;
    width: 100%;
    padding-top: 13px;
  }
`;

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
  cursor: pointer;
  min-width: 32px;
  max-height: 32px;
  border: 1px solid #121212;
  background-color: #121212;
  color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  position: relative;
  top: -3px;

  @media only screen and (max-width: 620px) {
    max-height: 26px;
    min-width: 26px;
  }
`;

const cartCounterInnerStyles = css`
  position: relative;
  top: 2px;
`;

export default function Header(props) {
  // console.log('this is props of header: ', props);

  return (
    <header css={headerWrapperStyles}>
      <div css={headerStyles}>
        <div css={leftMenuWrapperStyles}>
          <Link href="/">
            <img src="/logo.svg" alt="logo" css={logoStyles} />
          </Link>
        </div>
        <div css={rightMenuWrapperStyles}>
          <Link href="/products">
            <a data-test-id="products-link">Products</a>
          </Link>

          <div css={cartWrapperStyles}>
            <Link href="/cart" passHref>
              <a data-test-id="cart-link">Shopping Cart</a>
            </Link>
            <Link href="/cart">
              <div css={cartCounterStyles} className="cartCounterWrapper">
                <span css={cartCounterInnerStyles} data-test-id="cart-count">
                  {props.cartCounter}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
