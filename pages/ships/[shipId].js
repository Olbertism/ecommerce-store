import Head from 'next/head';
import { items } from '../../util/fakeDB';

export default function Ship(props) {
  if (!props.ship) {
    return (
      <div>
        <Head>
          <title>Page not found</title>
          <meta name="" content="not found" />
        </Head>
        <h1>Not Found</h1>
        <h2>This is not the ship you are looking for...</h2>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.ship.itemName}</title>
        <meta
          name="description"
          content={`${props.ship.itemName} is a <blank> with a <blank>`}
        />
      </Head>

      <h1>{props.ship.itemName}</h1>

      <div>
        <div>
          <div>Price: {props.ship.itemPrice} ₹</div>
          <div>in Stock: {props.ship.itemStockQuantity}</div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const selectedShip = items.find((ship) => {
    return ship.itemId === context.query.shipId;
  });

  if (!selectedShip) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      ship: selectedShip || null,
    },
  };
}
