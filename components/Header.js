import { css } from '@emotion/react';
import Link from 'next/link';

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

export default function Header() {
  return (
    <header css={headerStyles}>
      <div css={leftMenuWrapperStyles}>
        <Link href="/">Home</Link>
      </div>
      <div css={rightMenuWrapperStyles}>
        <Link href="/spaceships">Space Ships</Link>
        <Link href="/land-vessels">Planetary Vessels</Link>
        <Link href="/cart">Shopping Cart</Link>
      </div>
    </header>
  );
}
