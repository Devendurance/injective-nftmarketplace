import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ChainId, EvmChainId } from '@injectivelabs/ts-types';
import { Network, getNetworkEndpoints } from '@injectivelabs/networks';
import { WalletStrategy } from '@injectivelabs/wallet-strategy';
import { Wallet } from '@injectivelabs/wallet-base';
import { getInjectiveAddress } from '@injectivelabs/sdk-ts';

interface WalletContextType {
  address: string;
  injectiveAddress: string;
  isConnected: boolean;
  walletType: Wallet | null;
  connect: (wallet: Wallet) => Promise<void>;
  disconnect: () => void;
  walletStrategy: WalletStrategy;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const walletStrategy = new WalletStrategy({
  chainId: ChainId.Testnet,
  evmOptions: {
    rpcUrl: 'https://k8s.testnet.json-rpc.injective.network/',
    evmChainId: EvmChainId.Testnet,
  },
  strategies: {},
});

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState('');
  const [walletType, setWalletType] = useState<Wallet | null>(null);

  const injectiveAddress = React.useMemo(() => {
    if (address) {
      return getInjectiveAddress(address);
    }
    return '';
  }, [address]);

  const connect = useCallback(async (wallet: Wallet) => {
    try {
      walletStrategy.setWallet(wallet);
      const addresses = await walletStrategy.getAddresses();
      setAddress(addresses[0]);
      setWalletType(wallet);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress('');
    setWalletType(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        injectiveAddress,
        isConnected: !!address,
        walletType,
        connect,
        disconnect,
        walletStrategy,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
