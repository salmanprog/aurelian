-- =====================================================================
--  AURELIAN — The Digital House
--  MySQL schema (generated from src/db/schema.ts)
--
--  Note: the application bootstraps these tables automatically at runtime
--  (see src/db/bootstrap.ts). This file exists so you can also provision
--  the schema by hand — e.g. through a hosting provider's SQL console or
--  `mysql < schema.mysql.sql` on a server.
-- =====================================================================

CREATE TABLE IF NOT EXISTS products (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug          VARCHAR(120)    NOT NULL,
  object_no     VARCHAR(12)     NOT NULL,
  name          VARCHAR(160)    NOT NULL,
  category      VARCHAR(60)     NOT NULL,
  collection    VARCHAR(80)     NOT NULL,
  `drop`        VARCHAR(40)     NOT NULL,
  material      VARCHAR(60)     NOT NULL,
  price         INT             NOT NULL,
  edition       VARCHAR(80)     NOT NULL,
  stock         INT             NOT NULL DEFAULT 0,
  limited       BOOLEAN         NOT NULL DEFAULT FALSE,
  sort_order    INT             NOT NULL DEFAULT 0,
  tagline       TEXT            NOT NULL,
  story         TEXT            NOT NULL,
  why_it_exists TEXT            NOT NULL,
  material_note TEXT            NOT NULL,
  fit           TEXT            NOT NULL,
  drop_note     TEXT            NOT NULL,
  images        JSON            NOT NULL,
  specs         JSON            NOT NULL,
  created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS journal_posts (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug         VARCHAR(140)    NOT NULL,
  kicker       VARCHAR(80)     NOT NULL,
  title        TEXT            NOT NULL,
  excerpt      TEXT            NOT NULL,
  body         JSON            NOT NULL,
  image        VARCHAR(300)    NOT NULL,
  read_time    VARCHAR(24)     NOT NULL,
  chapter      VARCHAR(24)     NOT NULL,
  featured     BOOLEAN         NOT NULL DEFAULT FALSE,
  sort_order   INT             NOT NULL DEFAULT 0,
  published_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_journal_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscribers (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email      VARCHAR(200)    NOT NULL,
  source     VARCHAR(60)     NOT NULL DEFAULT 'house',
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_subscribers_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS access_requests (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email      VARCHAR(200)    NOT NULL,
  note       TEXT            NULL,
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  reference  VARCHAR(32)     NOT NULL,
  email      VARCHAR(200)    NOT NULL,
  subtotal   INT             NOT NULL,
  shipping   INT             NOT NULL DEFAULT 0,
  total      INT             NOT NULL,
  status     VARCHAR(32)     NOT NULL DEFAULT 'reserved',
  created_at TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_orders_reference (reference)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id     INT             NOT NULL,
  product_slug VARCHAR(120)    NOT NULL,
  name         VARCHAR(160)    NOT NULL,
  object_no    VARCHAR(12)     NOT NULL,
  quantity     INT             NOT NULL,
  price        INT             NOT NULL,
  PRIMARY KEY (id),
  KEY idx_order_items_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
