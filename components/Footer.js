import { css } from '@emotion/react';

const footerStyles = css`
  background-color: lightslategrey;
  margin-top: 50px;
`;

export default function Footer() {
  return <footer css={footerStyles}>THIS IS THE FOOTER</footer>;
}
