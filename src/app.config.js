let appConfig = {
    // app name - used in titles
    name: 'Siren',
    // app main title
    title: 'Siren, NFT marketplace',
    // app description
    description: 'Siren, NFT marketplace',
    // app keywords
    keywords: 'Siren, NFT, NFTs, Fantom',
    // app's favicon
    favicon: 'public/favicon.png',
    // app code
    code: process.env.VUE_APP_FANTOM_MODULE || 'artion',
    // app routes
    module: process.env.VUE_APP_FANTOM_MODULE || 'artion',
    // apollo client settings
    apollo: {
        // Artion api
        artion: {
            // list of providers. if one of them is unavailable, another is randomly picked
            providers: [
                {
                    http: 'https://artion-api-graphql.herokuapp.com/graphql',
                    // for subscriptions
                    ws: '',
                },
            ],
            // index into providers array of default provider or 'random' - takes index randomly
            defaultProviderIndex: 'random',
        },
        // Fantom api
        fantom: {
            // list of providers. if one of them is unavailable, another is randomly picked
            providers: [
                {
                    http: 'https://xapi.fantom.network/',
                    // for subscriptions
                    ws: 'wss://rpc.ankr.com/fantom_testnet/ws/6b3e97781946201e68dd1c620e0fdf759ed42be9ebd97c6f892036f37ea2bf89',
                },
            ],
            // index into providers array of default provider or 'random' - takes index randomly
            defaultProviderIndex: 'random',
        },
    },
    // app settings
    settings: {
        languages: [
            { label: 'English', value: 'en' },
            // { label: 'русский', value: 'ru' },
        ],
        defaultLanguage: 'en',
        mobileViewBreakpoint: '64em', // set also variable $breakpoint-mw in assets/scss/_variables.scss
        themes: ['default', 'theme-dark'],
        maxNFTSize: 15000000,
    },
    // progressive web application
    usePWA: true,
    // pwa settings
    pwa: {
        // name used in pwa manifest
        name: 'Artion',
        categories: ['finance'],
        mainColor: '#ffffff',
        assetsVersion: '1',
    },
    // if `true`, every route will be redirected to 'under maintenance' page
    underMaintenance: false,
    // use hash in address
    routerHashMode: false,
    // Opera chain id
    chainId: '0xfa2',
    // JSON-RPC endpointAdd
    // rpc: 'https://rpcapi.fantom.network/',
    rpc: 'https://rpc.ankr.com/fantom_testnet',
    // used in links pointing to fantom explorer
    explorerUrl: 'https://testnet.ftmscan.com/',
    // used in links pointing to validators
    explorerUrl2: 'https://testnet.ftmscan.com/',
    // default options for production build
    build: {
        // output dir for production build
        outputDir: 'dist',
    },
    // feature flags
    flags: {
        moderatorFunctions: true,
        advertisedCollection: false,
    },
};

if (appConfig.module === 'pg') {
    appConfig = {
        ...appConfig,
        // app name - used in titles
        name: 'Pierre Gasly NFT drop',
        // app main title
        title: 'Pierre Gasly NFT drop',
        // app description
        description:
            'Pierre Gasly launches his NFTs on Fantom, as the first NFT drop of an F1™ driver. The NFTs will be redeemable for VIP experiences, meet and greet, signed original helmets and merchandise',
        // app keywords
        keywords: 'Pierre Gasly, F1™ driver, Fantom, NFT, NFTs',
        // meta image
        imageUrl: '/img/PierreGaslyNFTdrop.png',
        // app's favicon
        favicon: 'public/favicon-pg.png',
        // progressive web application
        usePWA: false,
        // specifies if auction is on or off
        auctionOn: true,
        // specifies auction start date - timestamp in UTC
        auctionStart: 1634738400000,
        // specifies if setting page is on/off
        settingsOn: true,
        routerHashMode: true,
    };
}

appConfig.mainnet = {
    chainId: appConfig.chainId,
    rpc: appConfig.rpc,
    explorerUrl: appConfig.explorerUrl,
    explorerUrl2: appConfig.explorerUrl2,
};

module.exports = appConfig;
