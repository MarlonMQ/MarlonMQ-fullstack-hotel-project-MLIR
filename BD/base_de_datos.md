# Base De Datos

* [Diagramas ER](#diagramas-er)
* [Restricciones de Entidades y Relaciones](#restricciones-de-entidades-y-relaciones)
* [Creación](#creación-base-de-datos)
* [Ingreso de datos](#ejemplo-de-ingreso-de-datos)
* [Búsquedas básicas](#consultas-básicas)

## Diagramas ER

![Diagrama ER](BD_images/Flujo.drawio.svg)

![Diagrama ER](BD_images/Atributos.drawio.svg)

## Restricciones de Entidades y Relaciones

1.**t_user**:

* La columna email debe ser única ya que es la clave primaria o un identificador único para cada usuario.
  
2.**payment_method**:

* La columna `id_payment_method` debe ser única ya que es la clave primaria.
* La columna `id_user` debe ser una clave externa que hace referencia a la columna email en la tabla `t_user`, lo que indica que cada método de pago está asociado a un usuario específico.
  
3.**role:**

* La columna `id_role` debe ser única ya que es la clave primaria.
* La columna `id_user` debe ser una clave externa que hace referencia a la columna email en la tabla `t_user`, lo que indica que cada rol está asociado a un usuario específico.
  
4.**room:**

* La columna `id_room` debe ser única ya que es la clave primaria.

5.**service:**

* La columna `id_service` debe ser única ya que es la clave primaria.

6.**payment_method:**

* La columna `id_payment` debe ser única ya que es la clave primaria.
* La columna `id_user` debe ser una clave externa que hace referencia a la columna email en la tabla `t_user`, lo que indica que cada método de pago está asociado a un usuario específico.

7.**transference:**

* La columna `id_transference` debe ser única ya que es la clave primaria.
* La columna `id_payment_method` debe ser una clave externa que hace referencia a la columna `id_payment_method` en la tabla `payment_method`, lo que indica que cada transferencia está asociada a un método de pago específico.

8.**credit_card:**

* La columna `id_credit_card` debe ser única ya que es la clave primaria.
* La columna `id_payment_method` debe ser una clave externa que hace referencia a la columna `id_payment_method` en la tabla `payment_method`, lo que indica que cada tarjeta de crédito está asociada a un método de pago específico.

9.**reserve:**

* La columna `id_reserve` debe ser única ya que es la clave primaria.
* La columna `id_user` debe ser una clave externa que hace referencia a la columna email en la tabla `t_user`, lo que indica que cada reserva está asociada a un usuario específico.
* La columna `id_service` debe ser una clave externa que hace referencia a la columna `id_service` en la tabla service, lo que indica que una reserva puede estar asociada a un servicio específico.

10.**invoice:**

* La columna `id_invoice` debe ser única ya que es la clave primaria.
* La columna `id_user` debe ser una clave externa que hace referencia a la columna email en la tabla `t_user`, lo que indica que cada factura está asociada a un usuario específico.
* La columna `id_reserve` debe ser una clave externa que hace referencia a la columna `id_reserve` en la tabla reserve, lo que indica que una factura puede estar asociada a una reserva específica.

11.**relacion reserve y room**

* La columna `id_reserve` en la tabla `reservexroom` debe ser una clave externa que hace referencia a la columna `id_reserve` en la tabla `reserve`, indicando la asociación de cada reserva con una habitación específica.
* La columna `id_room` en la tabla `reservexroom` debe ser una clave externa que hace referencia a la columna `id_room` en la tabla `room`, indicando la habitación reservada para cada reserva.

12.**relacion reserve y service**

* La columna `id_reserve` en la tabla `reservexservice` debe ser una clave externa que hace referencia a la columna `id_reserve` en la tabla `reserve`, indicando la asociación de cada reserva con un servicio específico.
* La columna `id_service` en la tabla `reservexservice` debe ser una clave externa que hace referencia a la columna `id_service` en la tabla `service`, indicando el servicio reservado para cada reserva.

## Creación base de datos

### Crear la tabla usuario

```sql
CREATE TABLE `t_user`(
  email VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  last_name VARCHAR(100),
  password VARCHAR(255),
  phone_number VARCHAR(15),
  birth_date DATE,
  nationality VARCHAR(100),
  marketing_consent BIT DEFAULT 0 --0 FALSE 1 TRUE
);
```

### Crear la tabla rol

```sql
CREATE TABLE role(
  `id_role` INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  role_name VARCHAR(100),
  `id_user` VARCHAR(255),
  FOREIGN KEY (`id_user`) REFERENCES `t_user`(email),
)
```

### Crear la tabla cuarto

```sql
CREATE TABLE room(
  `id_room` INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  room_type VARCHAR(100),
  price_per_night DECIMAL(10,2),
  availability BIT,
  capacity INT,
  description TEXT
)
```

### Crear la tabla reserva

```sql
CREATE TABLE reserve(
  id_reserve INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  arrival_date DATE,
  departure_date DATE,
  reserve_status VARCHAR(100),
  `id_user` VARCHAR(255),
  `id_service` INT,
  FOREIGN KEY (`id_user`) REFERENCES `t_user`(email),
)
```

### Crear la tabla factura

```sql
CREATE TABLE invoice(
  id_invoice INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  issue_date DATE,
  total_amount DECIMAL(10,2),
  payment_status VARCHAR(100),
  `id_user` VARCHAR(255),
  id_reserve INT,
  FOREIGN KEY (`id_user`) REFERENCES `t_user`(email),
  FOREIGN KEY (id_reserve) REFERENCES reserve(id_reserve),
)
```

### Crear la tabla servicio

```sql
CREATE TABLE service(
  `id_service` INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  description TEXT,
  service_price DECIMAL(10,2),
  availability BIT
)
```

### Crear la tabla metodo de pago

```sql
CREATE TABLE payment_method(
  `id_payment_method` INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  payment_method_name VARCHAR(100),
  `id_user` VARCHAR(255),
  FOREIGN KEY (`id_user`) REFERENCES `t_user`(email)
)
```

### Crear la tabla transferencia

```sql
CREATE TABLE transference(
  id_transference INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  transference_name VARCHAR(100),
  transference_date DATE,
  bank_name VARCHAR(100),
  account_number VARCHAR(20),
  account_holder VARCHAR(100),
  `id_payment_method` INT, 
  FOREIGN KEY (`id_payment_method`) REFERENCES payment_method(`id_payment_method`)
)
```

### Crear la tabla tarjeta de credito/debito

```sql
CREATE TABLE credit_card(
  id_credit_card INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  credit_card_number VARCHAR(16),
  expiration_date DATE,
  cvv INT,
  credit_card_holder VARCHAR(100),
  `id_payment_method` INT,
  FOREIGN KEY (`id_payment_method`) REFERENCES payment_method(`id_payment_method`)
)
```

### Crear la tabla de relacion reserva y cuarto

```sql
CREATE TABLE reserveXroom(
  id_reserve_room INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  id_reserve INT,
  `id_room` INT,
  FOREIGN KEY (id_reserve) REFERENCES reserve(id_reserve),
  FOREIGN KEY (`id_room`) REFERENCES room(`id_room`)
)
```

### Crear la tabla de relacion reserva y servicio

```sql
CREATE TABLE reserveXservice(
  id_reserve_service INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  id_reserve INT,
  `id_service` INT,
  FOREIGN KEY (id_reserve) REFERENCES reserve(id_reserve),
  FOREIGN KEY (`id_service`) REFERENCES service(`id_service`)
)
```

## Ejemplo de Ingreso de Datos

### Ingreso de datos a usuario

```sql
INSERT INTO `t_user` (email, name, last_name, password, phone_number, birth_date, nationality, marketing_consent)
VALUES 
  ('user1@example.com', 'John', 'Doe', 'password1', '123456789', '1990-05-15', 'American', 1),
  ('user2@example.com', 'Jane', 'Smith', 'password2', '987654321', '1985-10-20', 'British', 0),
  ('user3@example.com', 'Alice', 'Johnson', 'password3', '555555555', '2000-03-08', 'Canadian', 1);
```

### Ingreso de datos a rol

```sql
INSERT INTO role (role_name, `id_user`)
VALUES 
  ('Admin', 'user1@example.com'),
  ('User', 'user2@example.com'),
  ('User', 'user3@example.com');
```

### Ingreso de datos a cuarto

```sql
INSERT INTO room (room_type, price_per_night, availability, capacity, description)
VALUES 
  ('Single', 50.00, 1, 1, 'A cozy single room with a comfortable bed and basic amenities.'),
  ('Double', 80.00, 1, 2, 'A spacious double room with a queen-sized bed, suitable for couples.'),
  ('Suite', 150.00, 1, 4, 'An extravagant suite with luxurious amenities, perfect for a family or special occasions.');

```

### Ingreso de datos a servicio

```sql
INSERT INTO service (description, service_price, availability)
VALUES 
  ('WiFi', 10.00, 1),
  ('Breakfast', 15.00, 1),
  ('Gym Access', 20.00, 1);
```

### Ingreso de datos a metodo de pago

```sql
INSERT INTO payment_method (payment_method_name, `id_user`)
VALUES 
  ('Credit Card', 'user1@example.com'),
  ('Credit Card', 'user2@example.com'),
  ('Bank Transfer', 'user3@example.com');
```

### Ingreso de datos a transferencia

```sql
INSERT INTO transference (transference_name, transference_date, bank_name, account_number, account_holder, `id_payment_method`)
VALUES 
  ('Rent Payment', '2024-04-09', 'Bank A', '1234567890', 'John Doe', 1),
  ('Utilities', '2024-04-10', 'Bank B', '0987654321', 'Jane Smith', 2),
  ('Membership Fee', '2024-04-11', 'Bank C', '1357924680', 'Alice Johnson', 3);
```

### Ingreso de datos a tarjeta de pago

```sql
INSERT INTO credit_card (credit_card_number, expiration_date, cvv, credit_card_holder, `id_payment_method`)
VALUES 
  ('1234567890123456', '2025-12-31', 123, 'John Doe', 1),
  ('9876543210987654', '2026-11-30', 456, 'Jane Smith', 2),
  ('5678901234567890', '2024-09-30', 789, 'Alice Johnson', 3);
```

### Ingreso de datos a reserva

```sql
INSERT INTO reserve (arrival_date, departure_date, reserve_status, `id_user`)
VALUES 
  ('2024-05-01', '2024-05-05', 'Confirmed', 'user1@example.com'),
  ('2024-06-10', '2024-06-15', 'Pending', 'user2@example.com'),
  ('2024-07-20', '2024-07-25', 'Confirmed', 'user3@example.com');
```

### Ingreso de datos a factura

```sql
INSERT INTO invoice (issue_date, total_amount, payment_status, `id_user`, id_reserve)
VALUES 
  ('2024-04-09', 100.00, 'Paid', 'user1@example.com', 1),
  ('2024-04-10', 150.00, 'Pending', 'user2@example.com', 2),
  ('2024-04-11', 200.00, 'Paid', 'user3@example.com', 3);
```

### Ingreso de datos a reserva y cuarto

```sql
INSERT INTO reserveXroom (id_reserve, `id_room`)
VALUES 
  (1, 1),
  (2, 2),
  (3, 3);
```

### Ingreso de datos a reserva y servicio

```sql
INSERT INTO reserveXservice (id_reserve, `id_service`)
VALUES 
  (1, 1),
  (2, 2),
  (3, 3);
```

## Consultas Básicas

### Obtener los datos relacionados con un usuario

```sql
SELECT *
FROM `t_user` AS u
LEFT JOIN payment_method AS pm ON u.email = pm.`id_user`
LEFT JOIN reserve AS r ON u.email = r.`id_user`
LEFT JOIN invoice AS inv ON u.email = inv.`id_user`
WHERE u.email = 'user1@example.com';
```

### Obtener todas las reservas confirmadas

```sql
SELECT * FROM reserve WHERE reserve_status = 'Confirmed';
```

### Obtener todas las facturas pendientes de pago

```sql
SELECT * FROM invoice WHERE payment_status = 'Pending';
```

### Obtener todas las reservas de un tipo específico de habitación

```sql
SELECT * FROM reserve AS r
JOIN room AS rm ON r.`id_room` = rm.`id_room`
WHERE rm.room_type = 'Double';
```

### Obtener todas las facturas de un rango de fechas específico

```sql
SELECT * FROM invoice WHERE issue_date BETWEEN '2024-01-01' AND '2024-12-31';
```

### Obtener todas las transferencias realizadas en un banco específico

```sql
SELECT * FROM transference WHERE bank_name = 'Bank A';
```

### Obtener todas las tarjetas de crédito próximas a vencerse

```sql
SELECT * FROM credit_card WHERE expiration_date < DATEADD(month, 1, GETDATE());
```

### Obtener todos los usuarios que dieron su consentimiento para recibir marketing

```sql
SELECT * FROM `t_user` WHERE marketing_consent = 1;
```
