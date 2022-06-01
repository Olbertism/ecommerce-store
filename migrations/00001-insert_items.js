// I probably should put in here the set of default db entries as array...


// Populate items table with couple of default values
exports.up = async (sql) => {
	await sql`INSERT INTO items
  (item_type, item_name, item_price, item_stock_quantity)
VALUES
  ('planetary', 'Snow Speeder', 10000, 2),
  ('space', 'Tie Fighter', 20000, 5),
  ('space', 'X-Wing', 30000, 2),
  ('space', 'A-Wing', 25000, 0),
  ('planetary', 'Land Speeder', 5000, 6),
  ('planetary', 'Cloud Car', 7500, 5);`
};


// Remove entries from table items
exports.down = async (sql) => {
	// just in case...
};
