import Item from '@/components/Item';
import { keplrConnect } from '@/utils/connect';

export default function SignArbitrary() {
  const value = {
    chainId: 'dydx-mainnet-1',
    denom: 'adydx',
    amount: '100000000000000000',
  };

  const handleClick = async ({ chainId, denom, amount }: any) => {
    await keplrConnect();
    const { bech32Address: signer } = await window.keplr.getKey(chainId);
    const signature = await window.keplr.signAmino(
      chainId,
      signer,
      {
        account_number: '833360',
        chain_id: chainId,
        fee: {
          gas: '174651',
          amount: [
            {
              amount,
              denom,
            },
          ],
        },
        memo: '',
        msgs: [
          {
            type: 'sei/poolmanager/swap-exact-amount-in',
            value: {
              routes: [
                {
                  pool_id: '1',
                  token_out_denom:
                    'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
                },
              ],
              sender: signer,
              token_in: {
                amount: '10000',
                denom,
              },
              token_out_min_amount: '545',
            },
          },
        ],
        sequence: '20',
      },
      { preferNoSetFee: true },
    );
    return signature;
  };

  return <Item name="signAmino" value={value} onClick={handleClick} />;
}
