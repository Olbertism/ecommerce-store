// New default start DB

const dbItems = [
  {
    item_short_name: 'alta',
    item_type: 'product',
    item_name: 'Alta Fitness Tracker',
    item_subheadline: 'A wearable for all situations',
    item_price: 19900,
    item_stock_quantity: 2,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    item_flag: '',
  },
  {
    item_short_name: 'ara',
    item_type: 'product',
    item_name: 'Project Ara Modular Smartphone',
    item_subheadline: 'The phone for the builders',
    item_price: 69900,
    item_stock_quantity: 5,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    item_flag: 'concept',
  },
  {
    item_short_name: 'cane',
    item_type: 'product',
    item_name: 'Smart Walking Cane',
    item_subheadline: 'Assistance for every step you take',
    item_price: 49900,
    item_stock_quantity: 0,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    item_flag: '',
  },
  {
    item_short_name: 'circadia',
    item_type: 'product',
    item_name: 'Circadia Sleep Monitor',
    item_subheadline: 'The smart way to sleep',
    item_price: 9900,
    item_stock_quantity: 7,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    item_flag: '',
  },
  {
    item_short_name: 'cube',
    item_name: 'The Cubes',
    item_subheadline: 'All style, no substance',
    item_type: 'product',
    item_price: 2000,
    item_stock_quantity: 12,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.',
    item_flag: '',
  },
  {
    item_short_name: 'electric',
    item_name: 'Zola Infinity',
    item_subheadline: 'Reliability, exactly where you need it',
    item_type: 'product',
    item_price: 299900,
    item_stock_quantity: 5,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    item_flag: '',
  },
  {
    item_short_name: 'orphidia',
    item_name: 'Orphidia Portable Lab Analyzer',
    item_subheadline: 'Advanced analyses, right in the field',
    item_type: 'product',
    item_price: 45900,
    item_stock_quantity: 4,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    item_flag: '',
  },
  {
    item_short_name: 'pillsy',
    item_name: 'Pillsy',
    item_subheadline: 'Never forget about your medications no more',
    item_type: 'product',
    item_price: 9900,
    item_stock_quantity: 9,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    item_flag: '',
  },
  {
    item_short_name: 'robot',
    item_name: 'Alfred',
    item_subheadline: 'E.T. meets A.I.',
    item_type: 'product',
    item_price: 1900000,
    item_stock_quantity: 2,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    item_flag: '',
  },
  {
    item_short_name: 'yogurt',
    item_name: 'Yomee',
    item_subheadline: 'It makes yogurt!',
    item_type: 'product',
    item_price: 7900,
    item_stock_quantity: 40,
    item_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
    item_flag: '',
  },
  {
    item_short_name: 'mug',
    item_name: 'Mug',
    item_subheadline: 'A stylish mug. Who knows what it is capable of?',
    item_type: 'product',
    item_price: 999,
    item_stock_quantity: 999,
    item_description:
      "You never know what this mug could do for you, if you don't buy it.",
    item_flag: '',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO items ${sql(
      dbItems,
      'item_short_name',
      'item_type',
      'item_name',
      'item_subheadline',
      'item_price',
      'item_stock_quantity',
      'item_description',
      'item_flag',
    )}
  `;
};

//maybe chain more AND here... not sure if needed...

exports.down = async (sql) => {
  for (const dbItem of dbItems) {
    await sql`
      DELETE FROM
      items
      WHERE
        item_name = ${dbItem.item_name} AND
        item_short_name = ${dbItem.item_short_name}
    `;
  }
};
