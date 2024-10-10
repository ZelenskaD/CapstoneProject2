

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) UNIQUE NOT NULL,
  last_name VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),  delivery_address VARCHAR(255) NOT NULL
  preferences JSONB  -- To store user preferences for personalized picks
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE TABLE favorites (
  user_id INTEGER REFERENCES users(user_id),
  product_id INTEGER REFERENCES products(product_id),
  PRIMARY KEY (user_id, product_id)
);


CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(user_id)  -- Each user can have only one cart
);


CREATE TABLE cart_items (
  cart_item_id SERIAL PRIMARY KEY,
  cart_id INTEGER REFERENCES cart(cart_id),
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL  -- Price at the time of adding to cart
);


CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),  -- Foreign key to Users table
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_price DECIMAL(10, 2) NOT NULL
);


CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(order_id),
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL  -- Price at the time of order
);


CREATE TABLE personalized_picks (
  pick_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  product_id INTEGER REFERENCES products(product_id)
);


CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  brand VARCHAR(255),
  name VARCHAR(255),
  price DECIMAL(10, 2),
  category_id INTEGER REFERENCES categories(category_id),  -- Foreign Key to categories table
  description TEXT,
  image_link VARCHAR(255),
  api_product_id INTEGER UNIQUE,  -- This field to store the product ID from the Makeup API
  UNIQUE (brand, name)
);


CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE tags (
  tag_id SERIAL PRIMARY KEY,
  tag_name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE products_tags (
  product_id INTEGER REFERENCES products(product_id),
  tag_id INTEGER REFERENCES tags(tag_id),
  PRIMARY KEY (product_id, tag_id)
);



