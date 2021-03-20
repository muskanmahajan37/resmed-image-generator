import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

export default function Storie({ title: coupon, thumbnailUrl }) {
  return (
    <main>
      <Head>
        <title>{coupon}</title>

        <meta name="description" content={coupon} />

        <meta property="og:site_name" content="Blog do Diego" />

        <meta property="og:title" content={coupon} />
        <meta property="og:description" content={coupon} />

        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={coupon} />
        <meta name="twitter:description" content={coupon} />
        <meta name="twitter:image" content={thumbnailUrl} />
      </Head>
      <div>
        <img width="450" src={thumbnailUrl} alt={coupon} />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const coupon = context.query.title;
  const width = context.query.width || 1080;
  const height = context.query.height || 1920;

  const isDev = process.env.NODE_ENV === "development";
  const mustShowExtension = !isDev ? ".png" : "";

  const baseUrl = isDev
    ? "http://localhost:3000"
    : "https://thumbnail-poc-alangabrielbs.vercel.app";

  const thumbnailUrl =
    `${baseUrl}/api/thumbnail${mustShowExtension}` +
    `?coupon=${coupon}&width=${width}&height=${height}`;

  return {
    props: {
      coupon,
      thumbnailUrl,
    },
  };
};
