# Welcome to Happy Days!

## Description

Created with love by The Happy Team at Supabase and Happy Supporters.
A simple SaaS application using **Supabase**, **Stripe** and **Remix**.
Enjoy Happy Days where you can add happy entries and immortalize your happy moments. Choose between 3 different plans, where the simplest plan is free.

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Remix Docs](https://remix.run/docs)


## Guide

Read the guide for more information on how to create your own SaaS application.
You can follow allong as we build Happy Days on our YouTube channel.

[To the Guide:](./guide/)
[To the Playlist:](https://www.youtube.com/playlist?list=PL5S4mPUpp4OvS_lW6OGX2NTiQ_AHAQ3t-)

  
## Development

You will be running two processes during development:

- The Miniflare server (miniflare is a local environment for Cloudflare Workers)
- The Remix development server 

Both are started with one command:

```sh

npm run dev

```

Open up [http://127.0.0.1:8787](http://127.0.0.1:8787) and you should be ready to go! 

If you want to check the production build, you can stop the dev server and run following commands:

```sh

npm run build

npm start

```

Then refresh the same URL in your browser (no live reload for production builds).

## Deployment

Use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler) to build and deploy your application to Cloudflare Workers. If you don't have it yet, follow [the installation guide](https://developers.cloudflare.com/workers/cli-wrangler/install-update) to get it setup. Be sure to [authenticate the CLI](https://developers.cloudflare.com/workers/cli-wrangler/authentication) as well.
  

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```