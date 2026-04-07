## Cloudinary Media Migration

This portfolio currently keeps images and videos in `public/`, which makes the repository heavy. The app now supports serving those files from Cloudinary through a manifest file at `src/data/cloudinary-media.json`.

### Upload existing media to Cloudinary

1. Create a `.env.local` file with:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_PREFIX=chinmay-portfolio
```

2. Run:

```bash
npm run media:upload
```

3. The upload script will push supported files from `public/` to Cloudinary and update `src/data/cloudinary-media.json` with the returned secure URLs.

4. After that, the app will automatically use Cloudinary URLs instead of local `/public` paths for those assets.

5. Once you verify everything works, you can remove the large media files from `public/` and from git history in a separate cleanup step.

Use `npm run media:upload -- --force` if you want to re-upload and overwrite existing manifest entries.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
