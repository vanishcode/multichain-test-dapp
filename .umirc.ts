import { defineConfig } from 'umi';

const title = 'multichain-test-dapp';

const base = process.env.IN_BUILD === 'yes' ? `/assets/${title}/` : '/';

export default defineConfig({
  base,
  publicPath: base,
  title,
  npmClient: 'npm',
  routes: [
    { path: '/', component: 'ethereum' },
    { path: '/ethereum', component: 'ethereum' },
    { path: '/bitcoin', component: 'bitcoin' },
    { path: '/tron', component: 'tron' },
    { path: '/cosmos', component: 'cosmos' },
    { path: '/solana', component: 'solana' },
    { path: '/aptos', component: 'aptos' },
    { path: '/sui', component: 'sui' },
    { path: '/starknet', component: 'starknet' },
    { path: '/stacks', component: 'stacks' },
  ],
  jsMinifierOptions: {
    target: ['chrome100', 'es2020'],
  },
  favicons: ['https://static.okx.com/cdn/wallet/logo/okt.png'],
});
