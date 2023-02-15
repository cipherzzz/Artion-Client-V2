import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getErc20TokenBalance(ownerAddress = '', tokenAddress = '') {
    const query = {
        query: gql`
            query GetErc20TokenBalance($account: Address!, $contract: Address!) {
                ercTokenBalance(contract: $contract, account: $account) {
                    balance
                }
            }
        `,
        variables: {
            account: ownerAddress,
            contract: tokenAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'ercTokenBalance.balance');
}
