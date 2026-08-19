import{t as e}from"./starter-products-BmidBsQQ.js";import{env as t}from"cloudflare:workers";function n(){let e=t.DB;if(!e)throw Error(`D1 binding DB is unavailable`);return e}function r(){let e=t.PRODUCT_IMAGES;if(!e)throw Error(`R2 binding PRODUCT_IMAGES is unavailable`);return e}var i=null;function a(){return i??=o(),i}async function o(){let t=n();await t.batch([t.prepare(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      features TEXT NOT NULL DEFAULT '[]',
      specs TEXT NOT NULL DEFAULT '{}',
      image_path TEXT,
      external_url TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),t.prepare(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`),t.prepare(`CREATE INDEX IF NOT EXISTS idx_products_featured_created ON products(featured, created_at)`),t.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
      user_id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),t.prepare(`CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      product_interest TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),t.prepare(`CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at)`)]),(await t.prepare(`SELECT COUNT(*) AS total FROM products`).first())?.total||await t.batch(e.map(e=>t.prepare(`INSERT INTO products
          (slug, name, category, subtitle, description, features, specs, image_path, external_url, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(y(e.name),e.name,e.category,e.subtitle,e.description,JSON.stringify(e.features),JSON.stringify(e.specs),e.imagePath,e.externalUrl,+!!e.featured))),await t.prepare(`PRAGMA optimize`).run()}async function s(){return await a(),((await n().prepare(`SELECT * FROM products ORDER BY featured DESC, created_at DESC, id DESC`).all()).results??[]).map(_)}async function c(e){await a();let t=await n().prepare(`SELECT * FROM products WHERE slug = ? LIMIT 1`).bind(e).first();return t?_(t):null}async function l(e){await a();let t=y(e.slug||e.name),r=t;return await c(r)&&(r=`${t}-${Date.now().toString(36)}`),await n().prepare(`INSERT INTO products
      (slug, name, category, subtitle, description, features, specs, image_path, external_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(r,e.name,e.category,e.subtitle,e.description,JSON.stringify(e.features),JSON.stringify(e.specs),e.imagePath,e.externalUrl,+!!e.featured).run(),r}async function u(e){await a();let t=await n().prepare(`SELECT * FROM products WHERE id = ?`).bind(e).first();return t?(await n().prepare(`DELETE FROM products WHERE id = ?`).bind(e).run(),_(t)):null}async function d(e){await a();let t=n();return(await t.prepare(`SELECT COUNT(*) AS total FROM admin_users`).first())?.total||await t.prepare(`INSERT OR IGNORE INTO admin_users (user_id, email) VALUES (?, ?)`).bind(e.userId,e.email).run(),!!await t.prepare(`SELECT user_id FROM admin_users WHERE user_id = ?`).bind(e.userId).first()}async function f(e){await a(),await n().prepare(`INSERT INTO enquiries
    (name, company, email, phone, product_interest, message)
    VALUES (?, ?, ?, ?, ?, ?)`).bind(e.name,e.company,e.email,e.phone,e.productInterest,e.message).run()}async function p(){return await a(),((await n().prepare(`SELECT * FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 50`).all()).results??[]).map(e=>({id:e.id,name:e.name,company:e.company,email:e.email,phone:e.phone,productInterest:e.product_interest,message:e.message,createdAt:e.created_at}))}async function m(e){let t=e.type===`image/png`?`png`:e.type===`image/webp`?`webp`:`jpg`,n=`${crypto.randomUUID()}.${t}`;return await r().put(n,e.stream(),{httpMetadata:{contentType:e.type}}),n}async function h(e){let t=await r().get(e);return t?{body:t.body,contentType:t.httpMetadata?.contentType||`application/octet-stream`,etag:t.httpEtag}:null}async function g(e){await r().delete(e)}function _(e){return{id:e.id,slug:e.slug,name:e.name,category:e.category,subtitle:e.subtitle,description:e.description,features:v(e.features,[]),specs:v(e.specs,{}),imagePath:e.image_path,externalUrl:e.external_url,featured:!!e.featured,createdAt:e.created_at}}function v(e,t){try{return JSON.parse(e)}catch{return t}}function y(e){return e.toLowerCase().trim().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)||`product-${Date.now().toString(36)}`}export{d as claimOrCheckAdmin,f as createEnquiry,l as createProduct,u as deleteProduct,a as ensureProductSchema,c as getProductBySlug,p as listEnquiries,s as listProducts,h as readProductImage,g as removeProductImage,m as saveProductImage};