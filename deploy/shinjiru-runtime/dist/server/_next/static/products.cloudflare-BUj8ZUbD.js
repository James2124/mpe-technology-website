import{t as e}from"./home-showcase-defaults-Cyx-U8HK.js";import{t}from"./starter-products-KT7ErtrF.js";import{env as n}from"cloudflare:workers";function r(){let e=n.DB;if(!e)throw Error(`D1 binding DB is unavailable`);return e}function i(){let e=n.PRODUCT_IMAGES;if(!e)throw Error(`R2 binding PRODUCT_IMAGES is unavailable`);return e}var a=null;function o(){return a??=s(),a}async function s(){let e=r();await e.batch([e.prepare(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      features TEXT NOT NULL DEFAULT '[]',
      specs TEXT NOT NULL DEFAULT '{}',
      image_path TEXT,
      catalogs TEXT NOT NULL DEFAULT '[]',
      external_url TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),e.prepare(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`),e.prepare(`CREATE INDEX IF NOT EXISTS idx_products_featured_created ON products(featured, created_at)`),e.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
      user_id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),e.prepare(`CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_type TEXT NOT NULL DEFAULT 'general',
      name TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      product_interest TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),e.prepare(`CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at)`),e.prepare(`CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`)]),(await e.prepare(`SELECT COUNT(*) AS total FROM products`).first())?.total||await e.batch(t.map(t=>e.prepare(`INSERT INTO products
          (slug, name, category, subtitle, description, features, specs, image_path, external_url, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t.slug||E(t.name),t.name,t.category,t.subtitle,t.description,JSON.stringify(t.features),JSON.stringify(t.specs),t.imagePath,t.externalUrl,+!!t.featured))),await e.prepare(`PRAGMA optimize`).run()}async function c(){return await o(),((await r().prepare(`SELECT * FROM products ORDER BY featured DESC, created_at DESC, id DESC`).all()).results??[]).map(w)}async function l(e){await o();let t=await r().prepare(`SELECT * FROM products WHERE slug = ? LIMIT 1`).bind(e).first();return t?w(t):null}async function u(e){await o();let t=E(e.slug||e.name),n=t;return await l(n)&&(n=`${t}-${Date.now().toString(36)}`),await r().prepare(`INSERT INTO products
      (slug, name, category, subtitle, description, features, specs, image_path, catalogs, external_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(n,e.name,e.category,e.subtitle,e.description,JSON.stringify(e.features),JSON.stringify(e.specs),e.imagePath,JSON.stringify(e.catalogs??[]),e.externalUrl,+!!e.featured).run(),n}async function d(e,t){if(await o(),!await r().prepare(`SELECT * FROM products WHERE id = ? LIMIT 1`).bind(e).first())return null;await r().prepare(`
      UPDATE products
      SET
        name = ?,
        category = ?,
        subtitle = ?,
        description = ?,
        features = ?,
        specs = ?,
        image_path = ?,
        catalogs = ?,
        external_url = ?,
        featured = ?
      WHERE id = ?
    `).bind(t.name,t.category,t.subtitle,t.description,JSON.stringify(t.features),JSON.stringify(t.specs),t.imagePath,JSON.stringify(t.catalogs??[]),t.externalUrl,+!!t.featured,e).run();let n=await r().prepare(`SELECT * FROM products WHERE id = ? LIMIT 1`).bind(e).first();return n?w(n):null}async function f(e){await o();let t=await r().prepare(`SELECT * FROM products WHERE id = ?`).bind(e).first();return t?(await r().prepare(`DELETE FROM products WHERE id = ?`).bind(e).run(),w(t)):null}async function p(){await o();let t=await r().prepare(`SELECT value FROM site_settings WHERE key = 'home_showcase'`).first();return t?T(t.value,e):e}async function m(e){let t=e(structuredClone(await p()));return await r().prepare(`INSERT INTO site_settings (key, value) VALUES ('home_showcase', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`).bind(JSON.stringify(t)).run(),t}async function h(e){await o();let t=r();return(await t.prepare(`SELECT COUNT(*) AS total FROM admin_users`).first())?.total||await t.prepare(`INSERT OR IGNORE INTO admin_users (user_id, email) VALUES (?, ?)`).bind(e.userId,e.email).run(),!!await t.prepare(`SELECT user_id FROM admin_users WHERE user_id = ?`).bind(e.userId).first()}async function g(e){await o(),await r().prepare(`INSERT INTO enquiries
    (enquiry_type, name, company, email, phone, product_interest, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(e.enquiryType,e.name,e.company,e.email,e.phone,e.productInterest,e.message).run()}async function _(){return await o(),((await r().prepare(`SELECT * FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 50`).all()).results??[]).map(e=>({id:e.id,enquiryType:e.enquiry_type||`general`,name:e.name,company:e.company,email:e.email,phone:e.phone,productInterest:e.product_interest,message:e.message,createdAt:e.created_at}))}async function v(e){let t=e.type===`image/png`?`png`:e.type===`image/webp`?`webp`:`jpg`,n=`${crypto.randomUUID()}.${t}`;return await i().put(n,e.stream(),{httpMetadata:{contentType:e.type}}),n}async function y(e){let t=await i().get(e);return t?{body:t.body,contentType:t.httpMetadata?.contentType||`application/octet-stream`,etag:t.httpEtag}:null}async function b(e){await i().delete(e)}async function x(e){let t=`${crypto.randomUUID()}.pdf`;return await i().put(t,e.stream(),{httpMetadata:{contentType:`application/pdf`}}),t}async function S(e){let t=await i().get(e);return t?{body:t.body,contentType:t.httpMetadata?.contentType||`application/pdf`,etag:t.httpEtag}:null}async function C(e){await i().delete(e)}function w(e){return{id:e.id,slug:e.slug,name:e.name,category:e.category,subtitle:e.subtitle,description:e.description,features:T(e.features,[]),specs:T(e.specs,{}),imagePath:e.image_path,catalogs:T(e.catalogs,[]),externalUrl:e.external_url,featured:!!e.featured,createdAt:e.created_at}}function T(e,t){try{return JSON.parse(e)}catch{return t}}function E(e){return e.toLowerCase().trim().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)||`product-${Date.now().toString(36)}`}export{h as claimOrCheckAdmin,g as createEnquiry,u as createProduct,f as deleteProduct,o as ensureProductSchema,p as getHomeShowcase,l as getProductBySlug,_ as listEnquiries,c as listProducts,S as readProductFile,y as readProductImage,C as removeProductFile,b as removeProductImage,x as saveProductFile,v as saveProductImage,m as updateHomeShowcase,d as updateProduct};