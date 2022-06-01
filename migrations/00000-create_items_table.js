// Create table items
exports.up = async (sql) => {
  await sql`
	CREATE TABLE items (
  item_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_type varchar(30) NOT NULL,
  item_name varchar(50) NOT NULL,
  item_price integer NOT NULL,
  item_stock_quantity integer NOT NULL,
  item_description varchar(1000)
);`;
};

// Drop table items
exports.down = async (sql) => {
  await sql`
	DROP TABLE items;`;
};
