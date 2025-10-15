// Namespace shim for ethers v6 to support `import { ethers } from 'ethers'` with property access
// We import from the real package entry and then construct a namespace object.
// Also re-export all named exports for consumers that import individual symbols.
import * as EthersNS from 'ethers/lib.esm/ethers.js';
import * as EthersUtils from 'ethers/lib.esm/utils.js';

export * from 'ethers/lib.esm/ethers.js';
export * from 'ethers/lib.esm/utils.js';

export const ethers = {
  ...EthersNS,
  // common utils re-exposed on namespace
  sha256: EthersUtils.sha256,
  ripemd160: EthersUtils.ripemd160,
  solidityPacked: EthersUtils.solidityPack,
  zeroPadValue: EthersUtils.hexZeroPad,
  toBeHex: EthersUtils.hexValue,
  toUtf8Bytes: EthersUtils.toUtf8Bytes,
  JsonRpcProvider: EthersNS.providers.JsonRpcProvider,
  getBytes: EthersUtils.arrayify,
};
