CREATE TABLE admin (
    admin_id UUID DEFAULT gen_random_uuid() NOT NULL,
    email TEXT NOT NULL ,
    password TEXT NOT NULL,
    accessToken VARCHAR(128) NOT NULL,
    refreshToken VARCHAR(128) NOT NULL,
    createdAt TIMESTAMP DEFAULT current_timestamp,

    CONSTRAINT admin_id_primary_key PRIMARY KEY (admin_id),
    CONSTRAINT admin_email_unique UNIQUE(email)
);
