## [2.1.2](https://github.com/commercelayer/mfe-cart/compare/v2.1.1...v2.1.2) (2022-12-12)


### Bug Fixes

* disable quantity selector when quantity is updating ([37c390d](https://github.com/commercelayer/mfe-cart/commit/37c390d60a80363607faeb5e26a2364307b94c2c))
* prevent out of stock to permanently disable UI ([b3858de](https://github.com/commercelayer/mfe-cart/commit/b3858de02bda9c666aaa3147b9634dab538d1ed0))
* quantity sync when multiple hosted carts are embedded in iframes ([fb8c40d](https://github.com/commercelayer/mfe-cart/commit/fb8c40d5b81bfd989a3fbbc4abbd9c473dc22f75))

## [2.1.1](https://github.com/commercelayer/mfe-cart/compare/v2.1.0...v2.1.1) (2022-12-07)


### Bug Fixes

* keep sync between InputSpinner internal state and order quantity ([0a7bd55](https://github.com/commercelayer/mfe-cart/commit/0a7bd5545aa88b30fd1b0bfa1fa2d15f72f0abe0))

# [2.1.0](https://github.com/commercelayer/mfe-cart/compare/v2.0.0...v2.1.0) (2022-12-07)


### Bug Fixes

* add InputSpinner component to be used as quantity selector with debounced value ([19797ef](https://github.com/commercelayer/mfe-cart/commit/19797effbdd121cbeaa98bdf2e28919ca970f874))
* loading skeleton to match new quantity selector width ([c7c5086](https://github.com/commercelayer/mfe-cart/commit/c7c50865a72d2659492426b23ba4f68a62f81cf8))
* rename iframe event `updateCart` to `update` ([bb35cc1](https://github.com/commercelayer/mfe-cart/commit/bb35cc1149f1b9b942f866e2fb49af86de0c3f54))
* set initial quantity after out of stock error message ([58208ed](https://github.com/commercelayer/mfe-cart/commit/58208ed79a1440d29e8cd570f7e0729dbb9ff2ad))
* switch from `react-helmet` to `react-helmet-async` ([578d167](https://github.com/commercelayer/mfe-cart/commit/578d1677cad0e7a2a49a9ca6b07ba084efe5e588))


### Features

* use new `<EmbeddedCapabilities />` component to wrap all iframe logics and embeddable behaviours ([f925cf4](https://github.com/commercelayer/mfe-cart/commit/f925cf456b36f6b61bf584888dc63a38c0fb61d2))


### Performance Improvements

* add manual chunk names to vite build config to improve code splitting ([4d5032e](https://github.com/commercelayer/mfe-cart/commit/4d5032e48b065f45c6f4197c031506a6f6992910))

# [2.1.0-beta.3](https://github.com/commercelayer/mfe-cart/compare/v2.1.0-beta.2...v2.1.0-beta.3) (2022-12-07)


### Bug Fixes

* add InputSpinner component to be used as quantity selector with debounced value ([19797ef](https://github.com/commercelayer/mfe-cart/commit/19797effbdd121cbeaa98bdf2e28919ca970f874))
* loading skeleton to match new quantity selector width ([c7c5086](https://github.com/commercelayer/mfe-cart/commit/c7c50865a72d2659492426b23ba4f68a62f81cf8))
* set initial quantity after out of stock error message ([58208ed](https://github.com/commercelayer/mfe-cart/commit/58208ed79a1440d29e8cd570f7e0729dbb9ff2ad))

# [2.1.0-beta.2](https://github.com/commercelayer/mfe-cart/compare/v2.1.0-beta.1...v2.1.0-beta.2) (2022-11-29)


### Bug Fixes

* rename iframe event `updateCart` to `update` ([bb35cc1](https://github.com/commercelayer/mfe-cart/commit/bb35cc1149f1b9b942f866e2fb49af86de0c3f54))

# [2.1.0-beta.1](https://github.com/commercelayer/mfe-cart/compare/v2.0.1-beta.1...v2.1.0-beta.1) (2022-11-29)


### Features

* use new `<EmbeddedCapabilities />` component to wrap all iframe logics and embeddable behaviours ([f925cf4](https://github.com/commercelayer/mfe-cart/commit/f925cf456b36f6b61bf584888dc63a38c0fb61d2))


### Performance Improvements

* add manual chunk names to vite build config to improve code splitting ([4d5032e](https://github.com/commercelayer/mfe-cart/commit/4d5032e48b065f45c6f4197c031506a6f6992910))

## [2.0.1-beta.1](https://github.com/commercelayer/mfe-cart/compare/v2.0.0...v2.0.1-beta.1) (2022-11-29)


### Bug Fixes

* switch from `react-helmet` to `react-helmet-async` ([578d167](https://github.com/commercelayer/mfe-cart/commit/578d1677cad0e7a2a49a9ca6b07ba084efe5e588))

# [2.0.0](https://github.com/commercelayer/mfe-cart/compare/v1.0.14...v2.0.0) (2022-11-22)


### Features

* switch to `Vite` + `pnpm` ([145ece1](https://github.com/commercelayer/mfe-cart/commit/145ece125b0af14e8666b87d3169c39957102802))
* switch to `Vite` + `pnpm`  Switch to `Vite` and `pnpm` from `NextJS` and `yarn`  BREAKING CHANGE: starting from this release we entirely dropped NextJS framework. ViteJS is used now as main bundler and dev server and only `pnpm` can be used as package manager. Source files have been moved into `src/` folder (dropped default Next.js folder structure). variables in .env files exposed in client-side code are now prefixed with `PUBLIC_` instead of `NEXT_PUBLIC_`. `vitest` is now being used for unit tests. ([e03ccd0](https://github.com/commercelayer/mfe-cart/commit/e03ccd027915daeaa4270a87333c771d10b3cd44))
* update to React 18 (bump @commercelayer/react-components to latest version) ([49613de](https://github.com/commercelayer/mfe-cart/commit/49613dec1fc3e77bd1bed1ad9a68ec8c382dc02b))


### BREAKING CHANGES

* starting from this release we entirely dropped NextJS framework. ViteJS is used now as main bundler and dev server and only `pnpm` can be used as package manager.
Source files have been moved into `src/` folder (dropped default Next.js folder structure).
variables in .env files exposed in client-side code are now prefixed with `PUBLIC_` instead of `NEXT_PUBLIC_`.
`vitest` is now being used for unit tests.

# [2.0.0-beta.2](https://github.com/commercelayer/mfe-cart/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-11-21)


### Features

* update to React 18 (bump @commercelayer/react-components to latest version) ([49613de](https://github.com/commercelayer/mfe-cart/commit/49613dec1fc3e77bd1bed1ad9a68ec8c382dc02b))

# [2.0.0-beta.1](https://github.com/commercelayer/mfe-cart/compare/v1.1.0-beta.1...v2.0.0-beta.1) (2022-11-21)


### Features

* switch to `Vite` + `pnpm` ([145ece1](https://github.com/commercelayer/mfe-cart/commit/145ece125b0af14e8666b87d3169c39957102802))


### BREAKING CHANGES

* starting from this release we entirely dropped NextJS framework. ViteJS is used now as main bundler and dev server and only `pnpm` can be used as package manager.
Source files have been moved into `src/` folder (dropped default Next.js folder structure).
variables in .env files exposed in client-side code are now prefixed with `PUBLIC_` instead of `NEXT_PUBLIC_`.
`vitest` is now being used for unit tests.

# [1.1.0-beta.1](https://github.com/commercelayer/mfe-cart/compare/v1.0.14...v1.1.0-beta.1) (2022-11-21)


### Features

* switch to `Vite` + `pnpm`  Switch to `Vite` and `pnpm` from `NextJS` and `yarn`  BREAKING CHANGE: starting from this release we entirely dropped NextJS framework. ViteJS is used now as main bundler and dev server and only `pnpm` can be used as package manager. Source files have been moved into `src/` folder (dropped default Next.js folder structure). variables in .env files exposed in client-side code are now prefixed with `PUBLIC_` instead of `NEXT_PUBLIC_`. `vitest` is now being used for unit tests. ([e03ccd0](https://github.com/commercelayer/mfe-cart/commit/e03ccd027915daeaa4270a87333c771d10b3cd44))

## [1.0.14](https://github.com/commercelayer/mfe-cart/compare/v1.0.13...v1.0.14) (2022-11-09)


### Bug Fixes

* add new hook to propagate `keydown` (escape) and `blur` event to parent iframe, when embedded ([36f29f7](https://github.com/commercelayer/mfe-cart/commit/36f29f78e2c9af7a8ba5bc8709022a17c59fbd7b))

## [1.0.13](https://github.com/commercelayer/mfe-cart/compare/v1.0.12...v1.0.13) (2022-10-12)


### Bug Fixes

* send `updateCart` event to parent window when app is loaded as iframe content ([#23](https://github.com/commercelayer/mfe-cart/issues/23)) ([7da4dfb](https://github.com/commercelayer/mfe-cart/commit/7da4dfb831f30351b592e970309fb1829af4e93c))

## [1.0.12](https://github.com/commercelayer/mfe-cart/compare/v1.0.11...v1.0.12) (2022-08-16)


### Bug Fixes

* show empty cart when there is no order and cart is embedded ([#18](https://github.com/commercelayer/mfe-cart/issues/18)) ([11ef2f2](https://github.com/commercelayer/mfe-cart/commit/11ef2f2e84a720fd7358cc9e828a7d18e3ec40d7))

## [1.0.11](https://github.com/commercelayer/mfe-cart/compare/v1.0.10...v1.0.11) (2022-07-26)


### Bug Fixes

* early invalidate settings if order id in url has wrong format ([18af88b](https://github.com/commercelayer/mfe-cart/commit/18af88b35dd901f5159564784a3c92a73ca1251c))
* prevent retry when catching not-api specific error like 404 ([3b3c7a5](https://github.com/commercelayer/mfe-cart/commit/3b3c7a501a4ae3490bf03416d0ef36322c11feb8))

## [1.0.10](https://github.com/commercelayer/mfe-cart/compare/v1.0.9...v1.0.10) (2022-07-26)


### Bug Fixes

* add slug as env to enforce security when app is not running in cl-hosted mode ([62d6e0e](https://github.com/commercelayer/mfe-cart/commit/62d6e0e3fceeaeae7dd6aa73b4380084db79e892))

## [1.0.9](https://github.com/commercelayer/mfe-cart/compare/v1.0.8...v1.0.9) (2022-07-25)


### Bug Fixes

* add iframe resizer lib ([2f2f207](https://github.com/commercelayer/mfe-cart/commit/2f2f207e6a60ee85da4caa1d016a894833cd99af))
* add support for embedded mode ([e96e5fd](https://github.com/commercelayer/mfe-cart/commit/e96e5fd49ec4a8f89ec9b6925219a782794e3d21))
* avoid overwriting of existing cart_url ([3cfb01f](https://github.com/commercelayer/mfe-cart/commit/3cfb01f07c0bdb006e4f42245722ca6e3eea0943))

## [1.0.8](https://github.com/commercelayer/mfe-cart/compare/v1.0.7...v1.0.8) (2022-07-12)


### Bug Fixes

* prevent to show oversized product images when they have portrait ratio ([a3832c5](https://github.com/commercelayer/mfe-cart/commit/a3832c53fc38ef66f324633d8c6e418c0ccf1cef))

## [1.0.7](https://github.com/commercelayer/mfe-cart/compare/v1.0.6...v1.0.7) (2022-06-21)


### Bug Fixes

* always set cart_url to current url ([eebe7d5](https://github.com/commercelayer/mfe-cart/commit/eebe7d51b041a170650814300e51262275772ba0))

## [1.0.6](https://github.com/commercelayer/mfe-cart/compare/v1.0.5...v1.0.6) (2022-06-20)


### Bug Fixes

* enforce 404 status code on invalid :orderId ([8104cdb](https://github.com/commercelayer/mfe-cart/commit/8104cdb8e9df47092a0df2702653b39fc5dbf9c4))

## [1.0.5](https://github.com/commercelayer/mfe-cart/compare/v1.0.4...v1.0.5) (2022-06-15)


### Bug Fixes

* make promo and gift card input always visibile ([01868b8](https://github.com/commercelayer/mfe-cart/commit/01868b83adda08a5b6e636cfae8e90b71156e46d))

## [1.0.4](https://github.com/commercelayer/mfe-cart/compare/v1.0.3...v1.0.4) (2022-06-15)


### Bug Fixes

* move promo code input below subtotal ([#9](https://github.com/commercelayer/mfe-cart/issues/9)) ([41f44ad](https://github.com/commercelayer/mfe-cart/commit/41f44ad3fdc9a0bed47520d39926b0b83825db05))

## [1.0.3](https://github.com/commercelayer/mfe-cart/compare/v1.0.2...v1.0.3) (2022-06-09)


### Bug Fixes

* improve client-side logic for async requests retry ([79375ed](https://github.com/commercelayer/mfe-cart/commit/79375ed8f77022d3eb8da98ececac739ccbcd6f1))
* init GTM if found in settings ([#7](https://github.com/commercelayer/mfe-cart/issues/7)) ([d276a9a](https://github.com/commercelayer/mfe-cart/commit/d276a9ae4141889a24c914abc923f0ef11a7179c))
* set order autorefresh when needed ([e545b8e](https://github.com/commercelayer/mfe-cart/commit/e545b8efeed5fcb09520f9e5bc4aae9ab4d11c76))
* show error message in case of connectivity error ([#6](https://github.com/commercelayer/mfe-cart/issues/6)) ([edb3b5d](https://github.com/commercelayer/mfe-cart/commit/edb3b5d975af943da9941d5f6c7ade1eca452815))

## [1.0.2](https://github.com/commercelayer/mfe-cart/compare/v1.0.1...v1.0.2) (2022-06-07)


### Bug Fixes

* improve loading state ([#5](https://github.com/commercelayer/mfe-cart/issues/5)) ([a6ba2d7](https://github.com/commercelayer/mfe-cart/commit/a6ba2d7fe4b6a9e9d905d4cd708141c95156204a))

## [1.0.1](https://github.com/commercelayer/mfe-cart/compare/v1.0.0...v1.0.1) (2022-06-03)


### Bug Fixes

* add white-space after items quantity ([d858609](https://github.com/commercelayer/mfe-cart/commit/d85860996a2d9dd8ae582a650673821a3a2dda0a))
