import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie } from '../util/cookieHandler';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  vertical-align: middle;
  margin-top: 10px;
  margin-bottom: 10px;
  position: static;
`;

const leftMenuWrapperStyles = css`
  width: 50%;
`;

const rightMenuWrapperStyles = css`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
`;

export default function Header(props) {
  console.log('this is props of header: ', props);

  /* console.log(props.cartCookie);
  const [cartCounter, setCartCounter] = useState(0); */

  /* useEffect(() => {
    console.log('use effect in header triggered');
    setCartCounter(props.cartCookie.length);


  }, [props.cartCookie.length]); */

  return (
    <header css={headerStyles}>
      <div css={leftMenuWrapperStyles}>
        <Link href="/">Home</Link>
      </div>
      <div css={rightMenuWrapperStyles}>
        <Link href="/spaceships">Space Ships</Link>
        <Link href="/land-vessels">Planetary Vessels</Link>
        <Link href="/cart">Shopping Cart</Link>
        <div className="cartCounterWrapper">{props.cartCounter}</div>
      </div>
    </header>
  );
}
