export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface DApp {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  url: string;
}

export const categories: Category[] = [
  { id: 'defi', name: 'DeFi', icon: 'defi-icon-url' },
  { id: 'nft', name: 'NFT', icon: 'nft-icon-url' },
  { id: 'gaming', name: 'Gaming', icon: 'gaming-icon-url' },
  { id: 'social', name: 'Social', icon: 'social-icon-url' },
  { id: 'marketplace', name: 'Marketplace', icon: 'marketplace-icon-url' },
];

const initialDApps: DApp[] = [
  {
    id: '1',
    name: 'Uniswap',
    description: 'Decentralized trading protocol',
    category: 'DeFi',
    icon: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    url: 'https://app.uniswap.org',
  },
  {
    id: '2',
    name: 'OpenSea',
    description: 'NFT marketplace',
    category: 'NFT',
    icon: 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png',
    url: 'https://opensea.io',
  },
  {
    id: '3',
    name: 'Axie Infinity',
    description: 'Blockchain-based game',
    category: 'Gaming',
    icon: 'https://cryptologos.cc/logos/axie-infinity-axs-logo.png',
    url: 'https://axieinfinity.com',
  },
  {
    id: '4',
    name: 'Aave',
    description: 'Decentralized lending protocol',
    category: 'DeFi',
    icon: 'https://cryptologos.cc/logos/aave-aave-logo.png',
    url: 'https://app.aave.com',
  },
  {
    id: '5',
    name: 'Decentraland',
    description: 'Virtual reality platform',
    category: 'Gaming',
    icon: 'https://cryptologos.cc/logos/decentraland-mana-logo.png',
    url: 'https://decentraland.org',
  },
];

// Add 45 more dApps to reach a total of 50
const additionalDApps: DApp[] = [
  {
    id: '6',
    name: 'Compound',
    description: 'Algorithmic money markets',
    category: 'DeFi',
    icon: 'https://cryptologos.cc/logos/compound-comp-logo.png',
    url: 'https://compound.finance',
  },
  {
    id: '7',
    name: 'Rarible',
    description: 'NFT marketplace',
    category: 'NFT',
    icon: 'https://cryptologos.cc/logos/rarible-rari-logo.png',
    url: 'https://rarible.com',
  },
  {
    id: '8',
    name: 'The Sandbox',
    description: 'Virtual world game',
    category: 'Gaming',
    icon: 'https://cryptologos.cc/logos/the-sandbox-sand-logo.png',
    url: 'https://www.sandbox.game',
  },
  {
    id: '9',
    name: 'Curve',
    description: 'Exchange liquidity pool',
    category: 'DeFi',
    icon: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png',
    url: 'https://curve.fi',
  },
  {
    id: '10',
    name: 'Enjin',
    description: 'NFT ecosystem',
    category: 'NFT',
    icon: 'https://cryptologos.cc/logos/enjin-coin-enj-logo.png',
    url: 'https://enjin.io',
  },
  // Add more dApps here to reach a total of 50...
];

export const dapps: DApp[] = [...initialDApps, ...additionalDApps];