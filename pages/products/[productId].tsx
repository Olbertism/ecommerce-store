import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  getParsedCookie,
  setStringifiedCookie,
} from '../../util/cookieHandler';
import { getItem } from '../../util/database';
import { getAvailableImages } from '../../util/imageDetector';
import { DatabaseItemsType } from '../../util/types';
import { introTextStyles } from '../products';

const itemProfileStyle = css`
  display: flex;
  font-size: 18px;

  img {
    border-radius: 10px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const itemDataStyles = css`
  padding: 25px;
  max-width: 40%;
  div {
    margin-bottom: 10px;
  }
  input {
    width: 60px;
    margin-left: 5px;
    margin-right: 5px;
  }
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const inputAmountStyles = css`
  label,
  button {
    padding-right: 5px;
  }
`;

const backToLinkStyles = css`
  font-size: 16px;
  color: #6b6b6b;
  margin-top: 10px;

  a::before {
    content: '< ';
  }
`;

const galleryStyles = css`
  padding-top: 10px;
  padding-bottom: 50px;
  line-height: 0;

  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-basis: 20%;
  align-items: flex-start;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const galleryImageWrapperStyles = css`
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 5px;
  background-color: #333;
`;

const galleryImageStyles = css`
  cursor: pointer;
`;

const darkboxStyles = css`
  width: 1180px;
  height: 620px;
  transition: all ease-in 0.4s;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #333;
  overflow: hidden;
  text-align: center;
  animation: fadeIn 0.2s;
  @keyframes fadeIn {
    from {
      opacity: 0%;
    }

    to {
      opacity: 100%;
    }
  }
`;

const darkboxImgStyles = css`
  padding: 5%;
  max-width: 1116px;
  max-height: 584px;
  cursor: pointer;
`;

type Props = {
  product: DatabaseItemsType;
  gallery: string[];
  cartCounter: number;
  setCartCounter?: any;
  status?: number;
};

export default function Product(props: Props) {
  console.log('productId props are: ', props);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [darkboxVisible, setDarkboxVisible] = useState({
    status: false,
    image: '',
    x: 0,
    y: 0,
  });

  // refs
  const amountInputField = useRef<null | HTMLInputElement>(null);

  if (props.status === 404) {
    console.log('404');
    return (
      <div className="mainWrapper">
        <Head>
          <title>Page not found</title>
          <meta name="" content="not found" />
        </Head>
        <h1>Not Found</h1>
        <h2>This is not the product you are looking for...</h2>
      </div>
    );
  }

  return (
    <div className="mainWrapper">
      <Head>
        <title>{props.product.itemName}</title>
        <meta name="description" content={props.product.itemName} />
      </Head>
      {/* This h1 needs to stay for drone I think */}
      <h1>{props.product.itemName}</h1>
      <p css={introTextStyles}>{props.product.itemSubheadline}</p>

      <div css={itemProfileStyle}>
        <img
          data-test-id="product-image"
          src={`/${props.product.itemId}-${props.product.itemShortName}.jpg`}
          alt="Depiction of the selected product"
          width="600"
          height="400"
        />

        {/* <Image
          data-test-id="product-image"
          src={`/${props.product.itemId}-${props.product.itemShortName}.jpg`}
          alt="Picture of the selected product"
          width="600"
          height="400"
        /> */}
        <div css={itemDataStyles}>
          <div>{props.product.itemDescription}</div>
          <div>
            Price:{' '}
            <span data-test-id="product-price">
              {props.product.itemPrice / 100}
            </span>{' '}
            €
          </div>
          <div>
            in Stock:{' '}
            <span data-test-id="product-quantity">
              {props.product.itemStockQuantity}
            </span>
          </div>

          <div css={inputAmountStyles}>
            <label
              css={css`
                color: ${props.product.itemStockQuantity === 0
                  ? 'grey'
                  : 'black'};
              `}
            >
              Amount
              <input
                disabled={props.product.itemStockQuantity === 0 ? true : false}
                type="number"
                ref={amountInputField}
                name="quantity"
                data-test-id="amount-input"
                min="1"
                max={props.product.itemStockQuantity}
                defaultValue="1"
                onChange={(event) => {
                  setSelectedQuantity(Number(event.currentTarget.value));
                }}
              />
            </label>
            <button
              data-test-id="product-add-to-cart"
              disabled={props.product.itemStockQuantity === 0 ? true : false}
              onClick={() => {
                // ternary here removed because TS
                const currentCart = getParsedCookie('cart');
                console.log('The cart is: ', currentCart);
                console.log(currentCart.length);

                const selectedItem = currentCart.find(
                  (item) => item.itemId === props.product.itemId,
                );

                if (selectedItem) {
                  selectedItem.itemQuantity =
                    Number(selectedItem.itemQuantity) +
                    Number(selectedQuantity);
                  console.log(
                    'The item is already in the cart, updating quantity',
                  );
                  console.log(
                    'CartCounter to investigate: ',
                    props.cartCounter,
                  );
                  props.setCartCounter(
                    props.cartCounter + Number(selectedQuantity),
                  );
                  console.log(
                    'selectedItem.itemQuantity: ',
                    selectedItem.itemQuantity,
                  );
                  console.log('carts now: ', currentCart);
                  setStringifiedCookie('cart', currentCart);
                } else {
                  const updatedCart = [
                    ...currentCart,
                    {
                      itemId: props.product.itemId,
                      itemQuantity: selectedQuantity,
                    },
                  ];
                  setStringifiedCookie('cart', updatedCart);

                  props.setCartCounter(
                    props.cartCounter + Number(amountInputField.current?.value),
                  );
                  console.log('The cart is: ', updatedCart);
                }
              }}
            >
              Add to cart
            </button>
          </div>
          <div css={backToLinkStyles}>
            <Link href="/products">back to products</Link>
          </div>
        </div>
      </div>
      {props.gallery.length > 0 ? <h3>Gallery</h3> : false}
      <div className="galleryWrapper">
        {darkboxVisible.status ? (
          <div
            css={[
              darkboxStyles,
              css`
                padding: 10px;
                left: ${darkboxVisible.x}px;
                top: ${darkboxVisible.y}px;
              `,
            ]}
          >
            <div>
              <Image
                src={darkboxVisible.image}
                layout="fill"
                objectFit="contain"
                css={darkboxImgStyles}
                onClick={() => {
                  setDarkboxVisible({ status: false, image: '', x: 0, y: 0 });
                }}
              />
            </div>
          </div>
        ) : (
          <div />
        )}

        <div className="gallery" css={galleryStyles}>
          {props.gallery.map((image) => {
            return (
              <div key={image} css={galleryImageWrapperStyles}>
                <Image
                  onClick={() => {
                    if (!darkboxVisible.status && window.innerWidth > 1200) {
                      console.log(window.innerWidth);

                      // this... needs some tinkering...
                      // const x = (window.innerWidth - window.innerWidth) / 2;
                      const x = 10;
                      const y = window.scrollY - 25;

                      setDarkboxVisible({
                        status: true,
                        image: `/${image.slice(5, -4)}.jpg`,
                        x: x,
                        y: y,
                      });
                    } else {
                      // remove box
                      setDarkboxVisible({
                        status: false,
                        image: '',
                        x: 0,
                        y: 0,
                      });
                    }
                  }}
                  src={`/${image.slice(5, -4)}.jpg`}
                  layout="fill"
                  objectFit="contain"
                  css={galleryImageStyles}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (isNaN(Number(context.query.productId))) {
    console.log('THIS IS IN THE FIRST SERVER 404 CLAUSE');
    context.res.statusCode = 404;
    return {
      props: {
        product: [],
        gallery: [],
        status: 404,
      },
    };
  }
  const selectedProduct = await getItem(Number(context.query.productId));

  console.log(selectedProduct);

  if (!selectedProduct) {
    context.res.statusCode = 404;
    return {
      props: {
        product: [],
        gallery: [],
        status: 404,
      },
    };
  }

  console.log(selectedProduct);

  // gallery image grabber
  const galleryImages = getAvailableImages().filter((image) => {
    if (
      image.slice(5, -6) ===
      `${selectedProduct.itemId}-${selectedProduct.itemShortName}-gallery`
    ) {
      return image.slice(5);
    }
    return false;
  });

  return {
    props: {
      product: selectedProduct,
      gallery: galleryImages,
    },
  };
}
