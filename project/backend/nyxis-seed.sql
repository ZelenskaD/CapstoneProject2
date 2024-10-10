
INSERT INTO users (first_name, last_name, username, email, preferences, password, delivery_address)
VALUES
    ('testuser',
    '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
    'Test',
    'User',
    'testuser@example.com',
    '{"preferred_brand": "Maybelline", "preferred_type": "Lipstick"}',
    '123 Test Street, City'),

    ('testadmin',
    '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
    'Test',
    'Admin',
    'testadmin@example.com',
    '{"preferred_brand": "L\'Oréal", "preferred_type": "Foundation"}',
    '456 Admin Lane, City');