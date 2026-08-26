-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2026 at 01:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aurelian`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_requests`
--

CREATE TABLE `access_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(200) NOT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journal_posts`
--

CREATE TABLE `journal_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(140) NOT NULL,
  `kicker` varchar(80) NOT NULL,
  `title` text NOT NULL,
  `excerpt` text NOT NULL,
  `body` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`body`)),
  `image` varchar(300) NOT NULL,
  `read_time` varchar(24) NOT NULL,
  `chapter` varchar(24) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `journal_posts`
--

INSERT INTO `journal_posts` (`id`, `slug`, `kicker`, `title`, `excerpt`, `body`, `image`, `read_time`, `chapter`, `featured`, `sort_order`, `published_at`) VALUES
(1, 'the-art-of-not-looking-like-everyone-else', 'Chapter 01 / Identity', 'The Art of Not Looking Like Everyone Else', 'Difference is not decoration. It is the discipline of removing everything that was never yours.', '[\"There is a moment in every men\'s wear shop when the assistant tells you what everybody is buying. It is offered as help. It is actually an instruction.\",\"Most men take the instruction. Not because they lack taste, but because taste is expensive in social currency and safety is free. The result is a city of men dressed in the same three silhouettes, at the same three price points, carrying the same three bags, wondering why nobody remembers meeting them.\",\"Not looking like everyone else has almost nothing to do with colour. It is a subtraction problem. Remove the logo that speaks for you. Remove the detail that exists to be photographed. Remove the piece you bought because a man you do not know wore it in a picture you did not choose to see.\",\"What is left is small, and it is yours. A bracelet that has darkened where your wrist bends. A wallet that has taken the shape of your back pocket. A hat with a brim that casts the exact shadow you want between you and the room.\",\"That is the whole philosophy of the house. We do not make much. We make objects that survive long enough to become evidence.\"]', '/images/journal-featured.jpg', '6 min', '01', 1, 1, '2026-07-13 04:00:00'),
(2, 'what-your-accessories-say-before-you-do', 'Chapter 02 / Signal', 'What Your Accessories Say Before You Do', 'You are read in the first four seconds. The objects on your body do most of the talking.', '[\"Before you have spoken, four things have already been registered: your hands, your wrist, your shoes and the object you pull out of your pocket.\",\"Hands are the most honest part of a man. They cannot be styled. But they can be framed — a watch, a bracelet, a ring, kept deliberately quiet so the hand stays the subject.\",\"The wrist is the only place where a man is allowed a small piece of sculpture in public. Treat it like that. One object, heavy enough to feel, quiet enough to ignore.\",\"Then the pocket. When you pull out a wallet in a bar, a taxi, a restaurant, you are performing a small reveal whether you intended to or not. Choose something that looks better at year five than it did at day one.\",\"None of this is about wealth. A twenty dollar object with real material beats a two thousand dollar object with a printed story, every single time.\"]', '/images/hero.jpg', '4 min', '02', 0, 2, '2026-07-22 04:00:00'),
(3, 'the-personal-uniform', 'Chapter 03 / Restraint', 'The Personal Uniform', 'The most stylish men you know are wearing the same seven things. On purpose.', '[\"Decision fatigue is real, and it is not sentimental — it takes the same energy you would otherwise spend on the thing that actually matters.\",\"The men who look most individual are usually the men who decided once, carefully, and then stopped deciding. A jacket shape. A trouser weight. A hat. A bracelet. Repeated until it stops being an outfit and becomes a person.\",\"The uniform is not a cage. It is a container. Inside it you are free to be interesting in every other dimension — what you say, what you build, who you let close.\",\"Start with one object you would keep in a fire. Add the second only when the first has worn in. That is how a personal uniform is built: slowly, and against the calendar of the industry.\"]', '/images/journal-featured.jpg', '5 min', '03', 0, 3, '2026-07-31 04:00:00'),
(4, 'the-objects-we-keep', 'Chapter 04 / Memory', 'The Objects We Keep', 'Nobody remembers the price. Everybody remembers where the object was when it happened.', '[\"Ask a man what he owns and he lists a category. Ask him what he keeps and the answer changes completely.\",\"Kept objects are marked. A wallet with the receipt from a night that went wrong. A bracelet bought the week the company collapsed. A journal with the page where a decision was finally written down.\",\"We design for the second list. Material that records. Brass that ages. Leather that darkens where a life happens to press against it.\",\"Perfection is forgettable. Wear is a biography.\"]', '/images/object-journal.jpg', '3 min', '04', 0, 4, '2026-08-09 04:00:00'),
(5, 'inside-drop-002', 'Chapter 05 / The House', 'Inside Drop 002', 'Nine objects. Two colourways. One material we have never used before.', '[\"Drop 002 is built around a single question: what does restraint look like when it is warm.\",\"There is a maroon version of the Meridian. There is a longer bracelet, in a heavier hide, with a plate that can be engraved after purchase. There is a jacket — the first piece of apparel the house has ever cut, in a charcoal wool that behaves more like leather.\",\"We are also introducing a material we have refused until now: a vegetable-tanned leather from a single tannery in Tuscany that finishes its hides in oak and chestnut over forty days. It is slow and it is expensive and it is the reason Drop 002 is smaller than we would like.\",\"Private room members see it fourteen days early. That is the entire advantage of being inside the house.\"]', '/images/object-limited.jpg', '4 min', '05', 0, 5, '2026-08-18 04:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reference` varchar(32) NOT NULL,
  `email` varchar(200) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `shipping` int(11) NOT NULL DEFAULT 0,
  `total` int(11) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'reserved',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_slug` varchar(120) NOT NULL,
  `name` varchar(160) NOT NULL,
  `object_no` varchar(12) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slug` varchar(120) NOT NULL,
  `object_no` varchar(12) NOT NULL,
  `name` varchar(160) NOT NULL,
  `category` varchar(60) NOT NULL,
  `collection` varchar(80) NOT NULL,
  `drop` varchar(40) NOT NULL,
  `material` varchar(60) NOT NULL,
  `price` int(11) NOT NULL,
  `edition` varchar(80) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `limited` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `tagline` text NOT NULL,
  `story` text NOT NULL,
  `why_it_exists` text NOT NULL,
  `material_note` text NOT NULL,
  `fit` text NOT NULL,
  `drop_note` text NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`images`)),
  `specs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`specs`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `object_no`, `name`, `category`, `collection`, `drop`, `material`, `price`, `edition`, `stock`, `limited`, `sort_order`, `tagline`, `story`, `why_it_exists`, `material_note`, `fit`, `drop_note`, `images`, `specs`, `created_at`) VALUES
(1, 'signature-bracelet', '007', 'Signature Bracelet', 'Wrist', 'House Signatures', 'Drop 001', 'Leather & Steel', 129, 'Limited / 42 remaining', 42, 1, 1, 'The object that started the house.', 'There is a version of you that only appears when the room gets difficult. Calmer. Quieter. More certain. The Signature Bracelet was built for that version — a single band of Tuscan leather closed with a brushed steel plate that carries nothing but the house mark. No motto. No slogan. Nothing to explain to anyone.', 'We made it because every man owns something he touches before he walks into a hard conversation. A ring. A watch. A coin. A habit. We wanted that object to be deliberate instead of accidental — something chosen, not inherited by default. It sits at the wrist because the wrist is where the pulse is, and where people look when you offer your hand.', 'Cut from a single hide of vegetable-tanned full-grain leather, 1.4mm, then hand-burnished at the edges. The closure plate is 316L stainless, satin-finished, sealed against sweat and salt water. Expect the leather to darken at the flex point within three weeks. That darkening is the point.', 'Three sizes — 18cm, 19.5cm, 21cm. Measure the wrist bone with a cord, add 1cm for a close fit, 1.5cm for a lived-in fit. Between sizes: take the larger. The leather relaxes roughly 4mm in the first month of wear.', 'Released as the opening object of Drop 001. Numbered, not restocked. When this run closes, the next bracelet carries a different plate and a different chapter number.', '[{\"src\":\"/images/object-bracelet.jpg\",\"alt\":\"AURELIAN Signature Bracelet on black volcanic stone\",\"focus\":\"50% 50%\"},{\"src\":\"/images/craft.jpg\",\"alt\":\"Cutting the leather band in the atelier\",\"focus\":\"50% 45%\"},{\"src\":\"/images/hero.jpg\",\"alt\":\"Signature Bracelet worn with a charcoal tailored jacket\",\"focus\":\"45% 55%\"}]', '[{\"label\":\"Material\",\"value\":\"Full-grain Tuscan leather / 316L steel\"},{\"label\":\"Width\",\"value\":\"9mm\"},{\"label\":\"Closure\",\"value\":\"Magnetic plate, security fold\"},{\"label\":\"Weight\",\"value\":\"34g\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11'),
(2, 'voyager-wallet', '014', 'Voyager Wallet', 'Carry', 'House Signatures', 'Drop 001', 'Leather', 168, 'Limited / 60 remaining', 60, 1, 2, 'Six cards. One note. No bulk.', 'A wallet is the most public private object a man owns. It leaves your pocket on command, in front of strangers, and it says something before you do. The Voyager carries six cards, folded notes and a key — and collapses to the thickness of a lighter when it does.', 'Most men carry a filing cabinet. We wanted a filter. If an object cannot survive ten years of pockets, airport trays and bar tops, it does not belong in the house. The Voyager is built from one piece of leather folded rather than stitched together, which means there is no lining to split and no seam to fail first.', 'Single-piece construction in 1.2mm full-grain leather, saddle-stitched with waxed linen thread at 7 stitches per inch. Interior is unlined — raw leather, no fabric — so it patinas uniformly. Edges hand-rubbered in six passes.', '104mm x 76mm closed. Holds 6 embossed cards, up to 12 flat cards, folded notes. Weighs 48g empty. It will feel tight for the first ten days. That is correct — do not force the sixth card.', 'Part of the opening chapter. Produced alongside the Signature Bracelet in the same hide lot.', '[{\"src\":\"/images/object-wallet.jpg\",\"alt\":\"Voyager Wallet in full-grain black leather on walnut and marble\",\"focus\":\"50% 50%\"},{\"src\":\"/images/craft.jpg\",\"alt\":\"Saddle stitching the wallet at the bench\",\"focus\":\"40% 50%\"},{\"src\":\"/images/private-room.jpg\",\"alt\":\"Wallet on dark concrete in the private room\",\"focus\":\"50% 60%\"}]', '[{\"label\":\"Material\",\"value\":\"Full-grain leather, unlined\"},{\"label\":\"Capacity\",\"value\":\"6 cards + folded notes\"},{\"label\":\"Dimensions\",\"value\":\"104 x 76 x 9mm\"},{\"label\":\"Thread\",\"value\":\"Waxed linen, saddle stitch\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11'),
(3, 'obsidian-cuff', '001', 'Obsidian Cuff', 'Wrist', 'Numbered Editions', 'Drop 001', 'Stone & Brass', 340, 'Numbered / 18 remaining', 18, 1, 3, 'The first object. Never repeated.', 'Object 001 is the reason the house exists. A cut of obsidian set into antique champagne brass, weighted so you feel it arrive on the wrist. Each piece is numbered on the underside — 001 through 120, then the mould is destroyed.', 'We wanted one object that could not be mass-produced without lying about itself. The stone is cut by hand, so no two faces reflect light the same way. If you want something that looks identical to everyone else\'s, there are a thousand brands waiting to sell it to you.', 'Natural obsidian, hand-ground and polished over 11 hours. Brass frame cast in a Florence foundry, hand-engraved with the house mark, then sealed with a matte PVD that lets it age without corroding. Stone will stay cold for the first four minutes of wear.', 'Internal circumference 17.5cm — a precise, close fit. It does not flex. If you are between sizes, size up; the cuff should sit against the wrist bone, not past it.', 'Numbered edition of 120. Released 08.26.26. No restock, no re-issue, no second run.', '[{\"src\":\"/images/object-limited.jpg\",\"alt\":\"Obsidian Cuff with champagne brass on a brushed metal plinth\",\"focus\":\"50% 50%\"},{\"src\":\"/images/object-bracelet.jpg\",\"alt\":\"Detail of metal and stone next to the Signature Bracelet\",\"focus\":\"50% 45%\"},{\"src\":\"/images/journal-featured.jpg\",\"alt\":\"Obsidian Cuff worn at night\",\"focus\":\"50% 40%\"}]', '[{\"label\":\"Stone\",\"value\":\"Natural obsidian, hand-ground\"},{\"label\":\"Frame\",\"value\":\"Antique champagne brass, PVD sealed\"},{\"label\":\"Edition\",\"value\":\"120 numbered pieces\"},{\"label\":\"Weight\",\"value\":\"71g\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11'),
(4, 'chronicle-journal', '021', 'Chronicle Journal', 'Paper', 'House Signatures', 'Drop 001', 'Leather & Brass', 94, 'Open edition', 240, 0, 4, 'Paper for the decisions you have not made yet.', 'Every man keeps a record somewhere. Notes app. Napkins. The back of a boarding pass. The Chronicle is a place to put it that will still exist in fifteen years — 224 pages of heavy ivory stock, brass post binding, a cover that takes the shape of your bag.', 'Because the interesting part of a life is not the outcome, it is the version of the plan that failed. The pages are unlined on purpose. Structure is a choice, not a default.', '224 pages, 120gsm ivory stock, FSC certified, sewn in 16-page signatures so it opens flat. Brass posts can be unscrewed with a coin to archive a finished volume. Cover leather is the same hide lot as the Voyager Wallet.', 'A5 — 148 x 210mm, 21mm spine. Lies flat at any page. Fits the inner pocket of the Voyager and the Carryall\'s document sleeve.', 'The Chronicle is a permanent house object. Refills are released every January.', '[{\"src\":\"/images/object-journal.jpg\",\"alt\":\"Chronicle Journal open on smoked black marble\",\"focus\":\"50% 50%\"},{\"src\":\"/images/craft.jpg\",\"alt\":\"Sewing the journal signatures\",\"focus\":\"55% 50%\"},{\"src\":\"/images/object-wallet.jpg\",\"alt\":\"Journal beside the Voyager Wallet\",\"focus\":\"50% 55%\"}]', '[{\"label\":\"Pages\",\"value\":\"224 / 120gsm ivory\"},{\"label\":\"Binding\",\"value\":\"Brass posts, sewn signatures\"},{\"label\":\"Size\",\"value\":\"A5 — 148 x 210mm\"},{\"label\":\"Refillable\",\"value\":\"Yes, standard A5\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11'),
(5, 'meridian-hat', '009', 'Meridian Hat', 'Head', 'House Standards', 'Drop 001', 'Cotton & Felt', 145, 'Limited / 75 remaining', 75, 1, 5, 'Shadow, on purpose.', 'A hat changes the way a man enters a room, and the way the room reads him. The Meridian has a wide flat brim and a low, structured crown — architecture rather than costume. It casts a shadow across the eyes and leaves the mouth visible.', 'Because most men\'s hats are either jokes or uniforms. We wanted one that behaves like a jacket: silent, structured, correct in a hotel lobby and correct at 2am.', '420gsm heavy brushed cotton canvas, double washed for softness, blocked over a wooden form. Internal grosgrain sweatband, hidden brass eyelets, brim reinforced with a folded steel core that holds its line in wind.', 'S/M 55-57cm, L/XL 58-60cm. Internal drawcord lets you tighten by up to 8mm. Brim 8.5cm, crown 10.5cm. Wear it low or not at all.', 'Produced in a single colourway for Drop 001 — Obsidian. A maroon version arrives with Drop 002.', '[{\"src\":\"/images/object-hat.jpg\",\"alt\":\"Meridian Hat in a dark architectural environment\",\"focus\":\"50% 45%\"},{\"src\":\"/images/hero.jpg\",\"alt\":\"Meridian Hat styled with charcoal tailoring\",\"focus\":\"50% 35%\"},{\"src\":\"/images/journal-featured.jpg\",\"alt\":\"Hat worn from behind at a night window\",\"focus\":\"50% 50%\"}]', '[{\"label\":\"Shell\",\"value\":\"420gsm brushed cotton canvas\"},{\"label\":\"Brim\",\"value\":\"8.5cm, steel core\"},{\"label\":\"Sizes\",\"value\":\"S/M 55-57cm, L/XL 58-60cm\"},{\"label\":\"Colourway\",\"value\":\"Obsidian\"},{\"label\":\"Made in\",\"value\":\"Porto, Portugal\"}]', '2026-08-25 23:50:11'),
(6, 'carryall-48', '032', 'Carryall 48', 'Carry', 'House Standards', 'House Standard', 'Leather & Steel', 520, 'Open edition', 30, 0, 6, 'Forty-eight hours, one object.', 'Built around a simple test: if you cannot leave for two days with one bag, you are carrying decisions you have not made. The Carryall 48 holds three shirts, two shoes, a laptop, a wash kit and a journal — and still fits an overhead bin.', 'Hardware is where bags fail. We used solid brass zips on steel tape, riveted rather than sewn at every stress point, and a reinforced base panel that stands up on its own when you set it down.', '2.0mm full-grain leather body, 1680D ballistics base, solid brass hardware, hand-hammered copper rivets, cotton twill lining. Shoulder straps are 12mm vegetable-tanned leather wrapped around a cotton core.', '54 x 28 x 26cm, 38L. 1.9kg empty. Cabin compliant on most carriers. Document sleeve fits A5 and 14\" laptops.', 'A permanent house object. Repairs are handled in-house for life.', '[{\"src\":\"/images/object-carryall.jpg\",\"alt\":\"Carryall 48 detail with brushed steel hardware on concrete\",\"focus\":\"50% 50%\"},{\"src\":\"/images/object-wallet.jpg\",\"alt\":\"Leather texture detail of the Carryall\",\"focus\":\"50% 60%\"},{\"src\":\"/images/private-room.jpg\",\"alt\":\"Carryall resting in the private room\",\"focus\":\"50% 55%\"}]', '[{\"label\":\"Volume\",\"value\":\"38L\"},{\"label\":\"Body\",\"value\":\"2.0mm full-grain leather\"},{\"label\":\"Base\",\"value\":\"1680D ballistics nylon\"},{\"label\":\"Hardware\",\"value\":\"Solid brass, copper rivets\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11'),
(7, 'contour-card-case', '028', 'Contour Card Case', 'Carry', 'House Standards', 'House Standard', 'Leather', 88, 'Open edition', 180, 0, 7, 'The minimum viable pocket.', 'Four cards, one fold, nothing else. The Contour exists for the nights you do not want to carry a history — the shape of a house key pressed into the leather so you feel it before you reach the door.', 'It is the object we give to men who claim they carry nothing. After three weeks they come back for the wallet. That is the design working.', 'Two-layer 1.1mm full-grain leather, skived to 1.8mm total at the mouth. Unlined, edge-painted in four passes, thumb notch cut at 32 degrees.', '98 x 68mm. Holds 2-4 cards plus a folded note or a key. 22g.', 'Permanent house object. Ships in the same black box as the rest of the house.', '[{\"src\":\"/images/object-wallet.jpg\",\"alt\":\"Contour Card Case in black full-grain leather\",\"focus\":\"35% 45%\"},{\"src\":\"/images/craft.jpg\",\"alt\":\"Skiving the card case at the bench\",\"focus\":\"50% 55%\"},{\"src\":\"/images/object-journal.jpg\",\"alt\":\"Card case beside the Chronicle Journal\",\"focus\":\"50% 45%\"}]', '[{\"label\":\"Material\",\"value\":\"1.1mm full-grain leather, unlined\"},{\"label\":\"Capacity\",\"value\":\"2-4 cards\"},{\"label\":\"Dimensions\",\"value\":\"98 x 68 x 4mm\"},{\"label\":\"Weight\",\"value\":\"22g\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11'),
(8, 'atelier-key-fob', '035', 'Atelier Key Fob', 'Carry', 'House Standards', 'House Standard', 'Leather & Brass', 64, 'Open edition', 210, 0, 8, 'The smallest object with the loudest opinion.', 'You touch it six times a day, usually in a doorway, usually in front of someone. A folded leather loop, a solid brass ring, a hand-set brass rivet. It clicks against the door frame and announces you before you speak.', 'It is the cheapest way we know to put real material in a man\'s hand every day. No logo visible unless you turn it over. The house mark is on the inside, where only you find it.', 'Three-layer 1.2mm full-grain leather, hand-stitched with waxed linen, solid brass 25mm ring, copper rivet set by hand. Edges burnished with beeswax.', '95mm total length, 22mm wide. Holds 3-8 keys. 31g with ring.', 'Permanent house object. Often the first thing a man buys from us.', '[{\"src\":\"/images/object-bracelet.jpg\",\"alt\":\"Atelier Key Fob leather and brass detail\",\"focus\":\"60% 60%\"},{\"src\":\"/images/craft.jpg\",\"alt\":\"Hand-setting the brass rivet\",\"focus\":\"50% 50%\"},{\"src\":\"/images/object-wallet.jpg\",\"alt\":\"Fob resting on the Voyager Wallet\",\"focus\":\"55% 50%\"}]', '[{\"label\":\"Material\",\"value\":\"Full-grain leather, solid brass ring\"},{\"label\":\"Length\",\"value\":\"95mm\"},{\"label\":\"Fixing\",\"value\":\"Hand-set copper rivet\"},{\"label\":\"Weight\",\"value\":\"31g\"},{\"label\":\"Made in\",\"value\":\"Florence, Italy\"}]', '2026-08-25 23:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(200) NOT NULL,
  `source` varchar(60) NOT NULL DEFAULT 'house',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_requests`
--
ALTER TABLE `access_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `journal_posts`
--
ALTER TABLE `journal_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_journal_slug` (`slug`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_orders_reference` (`reference`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_items_order` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_products_slug` (`slug`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_subscribers_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_requests`
--
ALTER TABLE `access_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journal_posts`
--
ALTER TABLE `journal_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
