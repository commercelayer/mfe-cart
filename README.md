# Commerce Layer Cart

The Commerce Layer Cart application (React) provides you with a production-ready shopping cart powered by Commerce Layer APIs. You can fork this repository and deploy it to any hosting service or use it as a reference application to build your own. A hosted version is also available.

![Commerce Layer Cart demo](./public/cart.png)

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Hosted version](#hosted-version)
- [Embedding the cart](#embedding-the-cart)
- [Contributors guide](#contributors-guide)
- [Help and support](#need-help)
- [License](#license)

---

## Getting started

1. Create your organization and get your credentials by following one of our [onboarding tutorials](https://docs.commercelayer.io/developers/welcome).

2. Set the environment variable `NEXT_PUBLIC_SLUG` on your hosting provider to your organization slug (subdomain) and be sure to build the forked repository using the node environment (`NODE_ENV`) as production.

3. Deploy the forked repository to your preferred hosting service or host it yourself. You can deploy with one click below:

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="35">](https://app.netlify.com/start/deploy?repository=https://github.com/commercelayer/commercelayer-cart) [<img src="https://vercel.com/button" alt="Deploy to Vercel" height="35">](https://vercel.com/new/clone?repository-url=https://github.com/commercelayer/commercelayer-cart) [<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku" height="35">](https://heroku.com/deploy?template=https://github.com/commercelayer/commercelayer-cart) [<img src="https://www.deploytodo.com/do-btn-blue.svg" alt="Deploy to Digital Ocean" height="35">](https://cloud.digitalocean.com/apps/new?repo=https://github.com/commercelayer/commercelayer-cart/tree/master)

4. Build your sales channel with your favorite technologies and frameworks by leveraging our [developer resources](https://commercelayer.io/developers) and [documentation](https://docs.commercelayer.io/api).

5. Get an [access token](https://docs.commercelayer.io/api/authentication) for your application. You should generate this in your sales channel or use our Javascript [authentication library](https://github.com/commercelayer/commercelayer-js-auth).

6. Create an [order](https://docs.commercelayer.io/developers/v/api-reference/orders) associated with some [line items](https://docs.commercelayer.io/developers/v/api-reference/line_items).

7. View the cart associated with the previously created order using the URL format: `<your-deployed-cart-url>/:order_id?accessToken=<your-access-token>`.

### Example

`https://cart.yourbrand.com/PrnYhoVeza?accessToken=eyJhbGciOiJIUzUxMiJ9`

## Hosted version

Any Commerce Layer account comes with a hosted version of the Cart application that is automatically enabled. You can customize it by adding your organization logo, favicon, primary color, and Google Tag Manager ID.

You can use the hosted version of the Cart application with the following URL format: `https://<your-organization-subdomain>.commercelayer.app/cart/:order_id?accessToken=<your-access-token>`

### Example

`https://yourbrand.commercelayer.app/cart/PrnYhoVeza?accessToken=eyJhbGciOiJIUzUxMiJ9`

## Embedding the cart

The cart can be embedded in your application or website by loading the hosted URL in an inline frame. This way a compact version of the Cart app that doesn't show the header and the footer will be automatically rendered.

### Example

```
// hosted
<iframe src="https://cart.yourbrand.com/PrnYhoVeza?accessToken=eyJhbGciOiJIUzUxMiJ9" width="100%" />

// forked
<iframe src="https://yourbrand.commercelayer.app/cart/PrnYhoVeza?accessToken=eyJhbGciOiJIUzUxMiJ9" width="100%" />
```

> You can either set your iFrame to a fixed height or keep it responsive using the [iFrame Resizer](https://github.com/davidjbradshaw/iframe-resizer) library — the Cart app already includes the `iframeResizer.contentWindow` scripts, so you only need to add it to your parent app.

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/commercelayer-cart) (you can learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/commercelayer-cart.git && cd commercelayer-cart
```

3. First, install dependencies and run the development server:

```
yarn install
yarn dev
```

4. (Optional) Set your environment with `.env.local` starting from `.env.local.sample`.

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can use the following format to open the cart: `http://localhost:3000/:orderId?accessToken=<your-access-token>`

6. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

7. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/commercelayer-cart/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
