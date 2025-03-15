-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Packages table
CREATE TABLE packages (
    tracking_number VARCHAR(20) PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_address VARCHAR(255) NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    weight FLOAT NOT NULL,
    cost_per_unit_weight FLOAT NOT NULL,
    flat_fee FLOAT NOT NULL,
    shipping_method VARCHAR(10) NOT NULL CHECK (shipping_method IN ('OneDay', 'TwoDay')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Created', 'In-Transit', 'Delivered')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Package history table to track status changes
CREATE TABLE package_history (
    id SERIAL PRIMARY KEY,
    tracking_number VARCHAR(20) REFERENCES packages (tracking_number),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Created', 'In-Transit', 'Delivered')),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);