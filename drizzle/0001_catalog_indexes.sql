CREATE INDEX `idx_enquiries_created` ON `enquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_products_category` ON `products` (`category`);--> statement-breakpoint
CREATE INDEX `idx_products_featured_created` ON `products` (`featured`,`created_at`);