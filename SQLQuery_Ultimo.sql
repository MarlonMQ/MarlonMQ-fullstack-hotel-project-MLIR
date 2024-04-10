CREATE DATABASE hotel_db;

USE hotel_db;

CREATE TABLE t_user(
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(255),
    phone_number VARCHAR(15),
    birth_date DATE,
    nationality VARCHAR(100),
    marketing_consent BIT DEFAULT 0 --0 FALSE 1 TRUE
);

CREATE TABLE role(
    id_role INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    role_name VARCHAR(100),
    id_user VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES t_user(email),
)

CREATE TABLE room(
    id_room INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    room_type VARCHAR(100),
    price_per_night DECIMAL(10,2),
    availability BIT,
    capacity INT,
    description TEXT
)

CREATE TABLE reserve(
    id_reserve INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    arrival_date DATE,
    departure_date DATE,
    reserve_status VARCHAR(100),
    id_user VARCHAR(255),
    id_service INT,
    FOREIGN KEY (id_user) REFERENCES t_user(email),
    FOREIGN KEY (id_service) REFERENCES service(id_service),
)

CREATE TABLE invoice(
    id_invoice INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    issue_date DATE,
    total_amount DECIMAL(10,2),
    payment_status VARCHAR(100),
    id_user VARCHAR(255),
    id_reserve INT,
    FOREIGN KEY (id_user) REFERENCES t_user(email),
    FOREIGN KEY (id_reserve) REFERENCES reserve(id_reserve),
)

CREATE TABLE service(
    id_service INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    description TEXT,
    service_price DECIMAL(10,2),
    availability BIT
)

CREATE TABLE payment_method(
    id_payment_method INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    payment_method_name VARCHAR(100),
    id_user VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES t_user(email)
)

CREATE TABLE transference(
    id_transference INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    transference_name VARCHAR(100),
    transference_date DATE,
    bank_name VARCHAR(100),
    account_number VARCHAR(20),
    account_holder VARCHAR(100),
    id_payment_method INT, 
    FOREIGN KEY (id_payment_method) REFERENCES payment_method(id_payment_method)
)

CREATE TABLE credit_card(
    id_credit_card INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    credit_card_number VARCHAR(16),
    expiration_date DATE,
    cvv INT,
    credit_card_holder VARCHAR(100),
    id_payment_method INT,
    FOREIGN KEY (id_payment_method) REFERENCES payment_method(id_payment_method)
)

CREATE TABLE reserveXroom(
    id_reserve_room INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    id_reserve INT,
    id_room INT,
    FOREIGN KEY (id_reserve) REFERENCES reserve(id_reserve),
    FOREIGN KEY (id_room) REFERENCES room(id_room)
)

CREATE TABLE reserveXservice(
    id_reserve_service INT PRIMARY KEY NOT NULL IDENTITY(1,1),
    id_reserve INT,
    id_service INT,
    FOREIGN KEY (id_reserve) REFERENCES reserve(id_reserve),
    FOREIGN KEY (id_service) REFERENCES service(id_service)
)

-- Insertar 3 registros aleatorios en la tabla t_user
INSERT INTO t_user (email, name, last_name, password, phone_number, birth_date, nationality, marketing_consent)
VALUES 
    ('user1@example.com', 'John', 'Doe', 'password1', '123456789', '1990-05-15', 'American', 1),
    ('user2@example.com', 'Jane', 'Smith', 'password2', '987654321', '1985-10-20', 'British', 0),
    ('user3@example.com', 'Alice', 'Johnson', 'password3', '555555555', '2000-03-08', 'Canadian', 1);

-- Insertar registros en la tabla role
INSERT INTO role (role_name, id_user)
VALUES 
    ('Admin', 'user1@example.com'),
    ('User', 'user2@example.com'),
    ('User', 'user3@example.com');

-- Insertar registros aleatorios en la tabla room
INSERT INTO room (room_type, price_per_night, availability, capacity, description)
VALUES 
    ('Single', 50.00, 1, 1, 'A cozy single room with a comfortable bed and basic amenities.'),
    ('Double', 80.00, 1, 2, 'A spacious double room with a queen-sized bed, suitable for couples.'),
    ('Suite', 150.00, 1, 4, 'An extravagant suite with luxurious amenities, perfect for a family or special occasions.');

-- Insertar 3 registros aleatorios en la tabla service
INSERT INTO service (description, service_price, availability)
VALUES 
    ('WiFi', 10.00, 1),
    ('Breakfast', 15.00, 1),
    ('Gym Access', 20.00, 1);

-- Insertar registros aleatorios en la tabla payment_method
INSERT INTO payment_method (payment_method_name, id_user)
VALUES 
    ('Credit Card', 'user1@example.com'),
    ('Credit Card', 'user2@example.com'),
    ('Bank Transfer', 'user3@example.com');

-- Insertar registros aleatorios en la tabla transference
INSERT INTO transference (transference_name, transference_date, bank_name, account_number, account_holder, id_payment_method)
VALUES 
    ('Rent Payment', '2024-04-09', 'Bank A', '1234567890', 'John Doe', 1),
    ('Utilities', '2024-04-10', 'Bank B', '0987654321', 'Jane Smith', 2),
    ('Membership Fee', '2024-04-11', 'Bank C', '1357924680', 'Alice Johnson', 3);

-- Insertar registros aleatorios en la tabla credit_card
INSERT INTO credit_card (credit_card_number, expiration_date, cvv, credit_card_holder, id_payment_method)
VALUES 
    ('1234567890123456', '2025-12-31', 123, 'John Doe', 1),
    ('9876543210987654', '2026-11-30', 456, 'Jane Smith', 2),
    ('5678901234567890', '2024-09-30', 789, 'Alice Johnson', 3);

INSERT INTO reserve (arrival_date, departure_date, reserve_status, id_user, id_service)
VALUES 
    ('2024-05-01', '2024-05-05', 'Confirmed', 'user1@example.com', 1),
    ('2024-06-10', '2024-06-15', 'Pending', 'user2@example.com', 2),
    ('2024-07-20', '2024-07-25', 'Confirmed', 'user3@example.com', 3);

INSERT INTO invoice (issue_date, total_amount, payment_status, id_user, id_reserve)
VALUES 
    ('2024-04-09', 100.00, 'Paid', 'user1@example.com', 1),
    ('2024-04-10', 150.00, 'Pending', 'user2@example.com', 2),
    ('2024-04-11', 200.00, 'Paid', 'user3@example.com', 3);

INSERT INTO reserveXroom (id_reserve, id_room)
VALUES 
    (1, 1),
    (2, 2),
    (3, 3);

INSERT INTO reserveXservice (id_reserve, id_service)
VALUES 
    (1, 1),
    (2, 2),
    (3, 3);

SELECT *
FROM t_user AS u
LEFT JOIN payment_method AS pm ON u.email = pm.id_user
LEFT JOIN reserve AS r ON u.email = r.id_user
LEFT JOIN invoice AS inv ON u.email = inv.id_user
WHERE u.email = 'user1@example.com';


