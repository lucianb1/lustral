CREATE TABLE IF NOT EXISTS colectii (
     id SMALLINT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(20) NOT NULL,
     price float NOT NULL,
     old_price float,
     for_exterior BIT NOT NULL,
     for_bath BIT NOT NULL,
     for_living BIT NOT NULL,
     for_kitchen BIT NOT NULL,
     is_porcelain BIT NOT NULL,
     unit VARCHAR(5) NOT NULL DEFAULT 'mp',
     images TINYINT NOT NULL DEFAULT 0,
     order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS colectii_items (
    id TINYINT PRIMARY KEY AUTO_INCREMENT,
    collection_id SMALLINT NOT NULL,
    type TINYINT NOT NULL,
    is_porcelain BIT NOT NULL,
    size VARCHAR(20) NOT NULL,
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS parchet (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    price float NOT NULL,
    old_price float,
    in_stock BIT NOT NULL,
    width TINYINT NOT NULL,
    class TINYINT NOT NULL,
    images TINYINT NOT NULL DEFAULT 0,
    --TODO PRINDERE
    producer VARCHAR(15) NOT NULL,
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cazi (
    id TINYINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    size VARCHAR(20) NOT NULL,
    multiple_sizes BIT NOT NULL DEFAULT 0,
    price float NOT NULL,
    old_price float NOT NULL,
    images TINYINT NOT NULL DEFAULT 0,
    order_nr TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS mobilier_colectii (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    images TINYINT NOT NULL DEFAULT 0,
    colors BINARY(5) NOT NULL, -- TODO COLORS
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS mobilier_items (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    collection_id SMALLINT NOT NULL,
    code VARCHAR(15) NOT NULL,
    description VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    discount FLOAT,
    size VARCHAR(15) NOT NULL,
    name VARCHAR(20) NOT NULL,
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS mobilier_colectii_items (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    collection_id SMALLINT NOT NULL,
    order_nr SMALLINT NOT NULL DEFAULT 0
);


CREATE TABLE IF NOT EXISTS messages(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    message VARCHAR(256) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);