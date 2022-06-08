export default function ThankYouPage() {
  return (
    <div className="mainWrapper small">
      <h1>Imprint</h1>
      <p>
        This is a fictional, non-commercial student project webpage. This is not
        a company website in any legal sense.
      </p>
      <p>
        All product images &copy; by Dan Clifton (
        <a href="https://www.behance.net/dan_clifton">
          https://www.behance.net/dan_clifton
        </a>
        ) . Images are used under CC BY-NC-ND 4.0 licence (
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en">
          https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en
        </a>
        )
      </p>
      <p>
        "Black Mesa" logo taken from
        https://commons.wikimedia.org/wiki/File:Black_Mesa_logo.svg, listed as
        public domain.
      </p>
    </div>
  );
}

export function getServerSideProps() {
  // workaround because of getInitialProps https://github.com/vercel/next.js/discussions/18235
  return { props: { dummie: '' } };
}
