# MP&E Technology website

Industrial product-catalog website for MP&E Technology. The public website has no cart; customers browse products and submit enquiries. Administrators use `/manage` to add products, upload images, delete products and review enquiries.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm test
```

The existing private Sites build continues to use Cloudflare D1 and R2. Shinjiru uses the file storage driver described below.

## Shinjiru Node.js settings

Use cPanel **Setup Node.js App** with these values:

- Node.js version: `24.19.0` (or the current recommended Node 24 release)
- Application mode: `Production`
- Application root: `mpe-staging-app`
- Application URL: `staging.mpe-technology.com`
- Application startup file: `server.js`

Add these environment variables in the same Node.js application screen:

- `MPE_STORAGE_DRIVER` = `file`
- `MPE_STORAGE_DIR` = an absolute private folder outside the application root, for example `/home/CPANEL_USER/mpe-data`
- `MPE_ADMIN_USERNAME` = the catalog administrator username
- `MPE_ADMIN_PASSWORD` = a long, unique password

Do not commit passwords or FTP credentials. On first launch, the server creates `catalog.json` and `product-images/` inside `MPE_STORAGE_DIR`. Because this directory is outside the application root, deployments do not overwrite products, enquiries or uploaded images.

After deployment, visit `https://staging.mpe-technology.com/manage`. The browser asks for the administrator username and password. The form on that page is the product admin area.

## GitHub Actions deployment

The workflow `.github/workflows/deploy-shinjiru.yml` builds the Node.js application and uploads a lightweight runtime package to the protected staging application over explicit FTPS. It intentionally leaves `node_modules/` on the server instead of transferring thousands of dependency files over shared FTP. It runs after a push to `master`, or manually from GitHub **Actions**.

Add these GitHub repository secrets under **Settings → Secrets and variables → Actions**:

- `SHINJIRU_FTP_HOST`: the server hostname shown in cPanel FTP Accounts (prefer the hosting server hostname)
- `SHINJIRU_FTP_PORT`: normally `21`; this secret may be omitted
- `SHINJIRU_FTP_USERNAME`: a dedicated FTP account restricted to the Node application folder
- `SHINJIRU_FTP_PASSWORD`: that FTP account's password
- `SHINJIRU_FTP_REMOTE_DIR`: the FTP-visible path to `mpe-staging-app`

The workflow intentionally does not delete remote files and excludes `storage/` and `.well-known/`. The recommended `MPE_STORAGE_DIR` is still outside the deployed directory for stronger protection.

After the first successful upload, return to cPanel **Setup Node.js App**, click **Run NPM Install**, wait for it to finish, and then click **Restart**. Repeat **Run NPM Install** only when `deploy/shinjiru-package.json` changes; normal website and product updates deploy automatically.

## Important safety boundary

Staging is deployed only to `staging.mpe-technology.com`. Do not set the FTP remote directory to `/public_html` or the live WordPress document root. The current production website remains untouched until staging has been reviewed and approved.
