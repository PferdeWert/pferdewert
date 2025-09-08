This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Linting

Run ESLint with:

```bash
npm run lint
```

## Testing with Playwright MCP

This project integrates with Playwright MCP for visual testing and browser automation. See [PLAYWRIGHT.md](./PLAYWRIGHT.md) for detailed testing scenarios.

### Quick Visual Testing

When making UI changes, always validate visually:

```typescript
// Through Claude Code Playwright MCP:
await page.goto('http://localhost:3000');
await page.screenshot({ path: 'homepage.png', fullPage: true });
```

### Key Test Scenarios

- **Horse valuation form flow**: End-to-end form submission and result validation
- **Multi-language support**: German/English translation testing  
- **Payment integration**: Stripe checkout flow testing
- **PDF generation**: Download and content validation
- **Mobile responsiveness**: Cross-device layout testing
- **Performance monitoring**: Core Web Vitals measurement

### Development Workflow

1. Make changes to components/pages
2. Use Playwright MCP through Claude Code to take screenshots
3. Validate visual changes and functionality
4. Iterate based on visual feedback
5. Run `npm run lint` and `npm run type-check` before committing

For complete testing documentation, see [PLAYWRIGHT.md](./PLAYWRIGHT.md).

## Staging GA4 Test
Testing GA4 integration with staging environment and Stripe checkout flow.
