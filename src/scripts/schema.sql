-- Packages table
CREATE TABLE IF NOT EXISTS packages (
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