/** @type {import('next').NextConfig} */

// Static export so the site can be hosted on GitHub Pages (subpath) AND Vercel.
// When deploying to GitHub Pages, the workflow sets DEPLOY_TARGET=pages so the
// app is served under /Infra-core. On Vercel (or a custom domain) basePath is "".
const isPages = process.env.DEPLOY_TARGET === "pages";
const repo = "Infra-core";

const nextConfig = {
  output: "export",
  basePath: isPages ? `/${repo}` : "",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
