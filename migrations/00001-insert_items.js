// New default start DB

const dbItems = [
  {

    item_short_name: 'alta',
    item_type: 'product',
    item_name: 'Alta Fitness Tracker',
    item_subheadline: '',
    item_price: 19900,
    item_stock_quantity: 2,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'ara',
    item_type: 'product',
    item_name: 'Project Ara Modular Smartphone',
    item_subheadline: '',
    item_price: 69900,
    item_stock_quantity: 5,
    item_description: '',
    item_flag: 'concept',
  },
  {

    item_short_name: 'cane',
    item_type: 'product',
    item_name: 'Smart Walking Cane',
    item_subheadline: '',
    item_price: 49900,
    item_stock_quantity: 0,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'circadia',
    item_type: 'product',
    item_name: 'Circadia Sleep Monitor',
    item_subheadline: '',
    item_price: 9900,
    item_stock_quantity: 7,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'cube',
    item_name: 'The Cubes',
    item_subheadline: '',
    item_type: 'product',
    item_price: 2000,
    item_stock_quantity: 12,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'electric',
    item_name: 'Zola Infinity',
    item_subheadline: '',
    item_type: 'product',
    item_price: 299900,
    item_stock_quantity: 5,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'orphidia',
    item_name: 'Orphidia Portable Lab Analyzer',
    item_subheadline: '',
    item_type: 'product',
    item_price: 45900,
    item_stock_quantity: 4,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'pillsy',
    item_name: 'Pillsy',
    item_subheadline: '',
    item_type: 'product',
    item_price: 9900,
    item_stock_quantity: 9,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'robot',
    item_name: 'Joseph',
    item_subheadline: '',
    item_type: 'product',
    item_price: 1900000,
    item_stock_quantity: 2,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'yogurt',
    item_name: 'Yomee',
    item_subheadline: '',
    item_type: 'product',
    item_price: 7900,
    item_stock_quantity: 40,
    item_description: '',
    item_flag: '',
  },
  {

    item_short_name: 'mug',
    item_name: 'Mug',
    item_subheadline: 'A stylish mug. Who knows what it is capable of?',
    item_type: 'product',
    item_price: 999,
    item_stock_quantity: 999,
    item_description: '',
    item_flag: '',
  },
];

const test = [{
  item_short_name: 'mug',
  item_type: 'product',
  item_name: 'Mug',
  item_subheadline: 'A stylish mug. Who knows what it is capable of?',
  item_price: 999,
  item_stock_quantity: 999,
  item_description: 'a',
  item_flag: 'a',
}]

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
