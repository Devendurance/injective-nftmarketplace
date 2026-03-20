export interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  price: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  contractType: 'EVM' | 'CosmWasm';
  contractAddress: string;
  tokenId: string;
  owner: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  lastSale?: string;
  listed: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  banner: string;
  floorPrice: string;
  volume24h: string;
  volumeTotal: string;
  items: number;
  owners: number;
  contractType: 'EVM' | 'CosmWasm';
  contractAddress: string;
  verified: boolean;
}

export interface AnalyticsData {
  collectionId: string;
  name: string;
  image: string;
  floorPrice: string;
  floorChange24h: number;
  volume24h: string;
  volumeChange24h: number;
  sales24h: number;
  salesChange24h: number;
  avgPrice: string;
  marketCap: string;
  holders: number;
  uniqueHolders: number;
  listingRate: number;
  priceHistory: Array<{
    timestamp: number;
    price: number;
  }>;
  volumeHistory: Array<{
    timestamp: number;
    volume: number;
  }>;
  topSales: Array<{
    tokenId: string;
    price: string;
    timestamp: number;
    buyer: string;
    seller: string;
  }>;
  distribution: {
    common: number;
    uncommon: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}
