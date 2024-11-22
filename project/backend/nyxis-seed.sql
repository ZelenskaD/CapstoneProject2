INSERT INTO users (first_name, last_name, username, email, preferences, password, delivery_address)
VALUES
    ('Test', 'User', 'testuser', 'testuser@example.com',
     '{"preferred_brand": "Maybelline", "preferred_type": "Lipstick"}',
     '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
     '123 Test Street, City'),

    ('Test', 'Admin', 'testadmin', 'testadmin@example.com',
     '{"preferred_brand": "L''Oréal", "preferred_type": "Foundation"}',  -- Fixed escaping
     '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
     '456 Admin Lane, City');
