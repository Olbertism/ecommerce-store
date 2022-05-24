import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { items } from '../util/fakeDB';
import { itemCardStyles, itemWrapperStyles } from './spaceships';

export default function LandVessels(props) {
  return (
    <div>
      <h1>Here you can find all available planetary vessels</h1>
      <div css={itemWrapperStyles}>
        {props.landVessels.map((item) => {
          return (
            <div
              key={`items-landvessels-${item.itemId}`}
              className="itemCard"
              css={itemCardStyles}
            >
              <Image
                src={`/${item.itemId}.jpg`}
                alt=""
                width="300"
                height="200"
              />
              <div
                css={css`
                  font-weight: 600;
                `}
              >
                {item.itemName}
              </div>
              <div>Price: {item.itemPrice} ₹</div>
              <Link href={`/ships/${item.itemId}`}>Product Page</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function getServerSideProps() {
  const landVesselArray = items.filter((item) => {
    return item.itemType === 'landVessel' ? true : false;
  });

  return { props: { landVessels: landVesselArray } };
}
