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
     is_rectificat BIT NOT NULL,
     is_wood BIT NOT NULL,
     is_stone BIT NOT NULL,
     unit VARCHAR(5) NOT NULL DEFAULT 'mp',
     images TINYINT NOT NULL DEFAULT 0,
     order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS colectii_items (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    collection_id SMALLINT NOT NULL,
    is_porcelain BIT NOT NULL,
    is_rectificat BIT NOT NULL,
    is_matt BIT NOT NULL DEFAULT 0,
    is_glossy BIT NOT NULL DEFAULT 0,
    price FLOAT NOT NULL,
    old_price FLOAT,
    unit VARCHAR(5),
    size VARCHAR(20) NOT NULL,
    description VARCHAR(20),
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS parchet (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    description VARCHAR(30) NOT NULL,
    price float NOT NULL,
    old_price float,
    delivery VARCHAR(20) NOT NULL,
    wood VARCHAR(20) NOT NULL,
    warranty TINYINT,
    width TINYINT NOT NULL,
    class TINYINT NOT NULL,
    images TINYINT NOT NULL DEFAULT 1,
    grip VARCHAR(20) NOT NULL,
    size VARCHAR(20) NOT NULL,
    producer VARCHAR(15) NOT NULL,
    material VARCHAR(10) NOT NULL,
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cazi (
    id TINYINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    size VARCHAR(20) NOT NULL,
    multiple_sizes BIT NOT NULL DEFAULT 0,
    price float NOT NULL,
    old_price float,
    images TINYINT NOT NULL DEFAULT 0,
    order_nr TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS mobilier_collectii_items (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    order_nr SMALLINT NOT NULL DEFAULT 0,
    collection_id SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS mobilier_colectii (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    images TINYINT NOT NULL DEFAULT 0,
    colors VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS mobilier_items (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    collection_id SMALLINT NOT NULL,
    code VARCHAR(15) NOT NULL,
    description VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    custom_price FLOAT,
    discount FLOAT,
    size VARCHAR(30) NOT NULL,
    name VARCHAR(20) NOT NULL,
    order_nr SMALLINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS messages(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    message VARCHAR(256) NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_pages (
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    page VARCHAR(20),
    date DATETIME NOT NULL,
    count DOUBLE NOT NULL
);