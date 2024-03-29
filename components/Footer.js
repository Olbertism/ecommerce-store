import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = css`
  background-color: #121212;

  width: 100%;
  height: 4.5rem;
  margin-top: 50px;
`;

const footerLinkStyles = css`
  color: #fff;
  display: flex;
  font-size: 18px;
  padding-right: 20px;
  padding-top: 24px;
  justify-content: flex-end;

  a {
    color: #fff;
  }
  a:hover {
    color: #b5b5b5;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <div css={footerLinkStyles}>
        <Link href="/imprint">Imprint</Link>
      </div>
    </footer>
  );
}
