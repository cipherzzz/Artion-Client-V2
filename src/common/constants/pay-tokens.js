import { getDefiTokens } from '@/modules/wallet/queries/defi-tokens.js';
import { bFromTokenValue, toInt, bToWei } from '@/utils/big-number.js';
import { getPayTokens } from '@/modules/nfts/queries/pay-tokens.js';
import { clone } from 'fantom-vue-components/src/utils';

/**
 * PayToken object
 * @typedef {Object} PayToken
 * @property {string} address
 * @property {string} label
 * @property {string} img
 * @property {number} price
 * @property {number} priceDecimals
 * @property {number} decimals
 * @property {string} value Code
 * @property {boolean} _update Update price
 */

const PAY_TOKEN_IMAGES = {
    wftm: '/img/pay-tokens/WFTM.png',
    fusdt: '/img/pay-tokens/fUSDT.png',
    usdc: '/img/pay-tokens/USDC.png',
    dai: '/img/pay-tokens/DAI.png',
};

export const WFTMContract = '0xf1277d1Ed8AD466beddF92ef448A132661956621'; // mainnet'0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83';

let PT = [];

/**
 * @param {PayToken} token
 * @return {number}
 */
function getTokenFractionDigits(token) {
    const tokenPrice = token.price || 0;
    let decimals = 1;

    if (tokenPrice < 5 && tokenPrice >= 0) {
        decimals = 1;
    } else if (tokenPrice < 100) {
        decimals = 2;
    } else if (tokenPrice < 1000) {
        decimals = 5;
    }

    return decimals;
}

/**
 * @return {PayToken[]}
 */
async function fetchPayTokens() {
    const pt = await getPayTokens();
    const defiTokens = await getDefiTokens();
    const payTokens = [];

    pt.forEach(t => {
        if (['dai', 'usdc'].includes(t.symbol.toLowerCase())) {
            t.price = bFromTokenValue(bToWei(1), 18).toNumber();
        } else if (t.symbol.toLowerCase() == 'wftm') {
            const dToken = defiTokens.find(token => token.symbol.toLowerCase() == t.symbol.toLowerCase());
            if (dToken) {
                t.price = bFromTokenValue(toInt(dToken.price), dToken.priceDecimals).toNumber();
                console.log('t.price', t.price);
            }
        }

        const symbolLC = t.symbol.toLowerCase();
        const payToken = {
            address: t.contract,
            // name: t.name,
            label: t.symbol === 'WFTM' ? 'wFTM' : t.symbol,
            img: PAY_TOKEN_IMAGES[symbolLC] || '',
            decimals: t.decimals,
            price: t.price,
            priceDecimals: 6,
            origPrice: t.price,
            value: symbolLC,
        };

        payToken.fractionDigits = getTokenFractionDigits(payToken);

        payTokens.push(payToken);
    });

    return payTokens;
}

async function setPT() {
    PT = await fetchPayTokens();
}

/**
 * @return {Promise<PayToken[]>}
 */
export async function PAY_TOKENS() {
    if (!PT || PT.length === 0) {
        await setPT();
    }

    return clone(PT);
}

/**
 * @return {Promise<PayToken[]>}
 */
export async function PAY_TOKENS_WITH_PRICES() {
    return fetchPayTokens();
}

/**
 * @return {PayToken[]}
 */
/*
export function PAY_TOKENS() {
    return [
        {
            address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
            label: 'wFTM',
            img: '/img/WFTM.png',
            price: 1,
            priceDecimals: 18,
            decimals: 18,
            value: 'wftm',
            _update: true,
        },
        {
            address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
            label: 'DAI',
            img: '',
            price: 1,
            priceDecimals: 18,
            decimals: 18,
            value: 'dai',
            _update: true,
        },
        {
            address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
            label: 'USDC',
            img: '',
            price: 1,
            priceDecimals: 6,
            decimals: 6,
            value: 'usdc',
            _update: true,
        },
        {
            address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
            label: 'fUSDT',
            img: '',
            price: 1,
            priceDecimals: 6,
            decimals: 6,
            value: 'fusdt',
            _update: true,
        },
    ];
}


/**
 * Returns list of pay tokens with updated prices. Updates price on the token with attribut `_update: true`.
 *
 * @return {PayToken[]}
 */
/*
export async function PAY_TOKENS_WITH_PRICES() {
    const payTokens = PAY_TOKENS();
    const defiTokens = await getDefiTokens();

    payTokens.forEach(token => {
        let dToken = null;

        if (token._update) {
            dToken = defiTokens.find(token => token.address.toLowerCase() === token.address.toLowerCase());
            if (dToken) {
                token.price = bFromTokenValue(dToken.price, dToken.priceDecimals).toNumber();
                token.priceDecimals = dToken.priceDecimals;
                token.decimals = dToken.decimals;
            }
        }
    });

    return payTokens;
}
*/
