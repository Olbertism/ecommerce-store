export default function ThankYouPage() {
  return (
    <div className="mainWrapper">
      <h1>THIS IS THE IMPRINT</h1>
    </div>
  );
}

export function getServerSideProps() {
  // workaround because of getInitialProps https://github.com/vercel/next.js/discussions/18235
  return { props: { dummie: '' } };
}
