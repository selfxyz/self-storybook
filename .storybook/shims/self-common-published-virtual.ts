// Virtual aggregator that maps root @selfxyz/common imports to its published subpath exports
// Export only the exact symbols required by local SDK code to avoid re-export conflicts

// Constants (if any stories or SDK reference them at runtime)
export * from '@selfxyz/common/constants';
// Types
export * from '@selfxyz/common/types';
// Selected utils required by @selfxyz/mobile-sdk-alpha
// Export OFAC utilities required by the SDK
export {
  brutforceSignatureAlgorithmDsc,
  calculateContentHash,
  inferDocumentCategory,
  isAadhaarDocument,
  isMRZDocument,
} from '@selfxyz/common/utils';
export { parseCertificateSimple } from '@selfxyz/common/utils/certificate_parsing/parseCertificateSimple';
// Additional exports required by the SDK
export { getSKIPEM } from '../../.local-packages/common/src/utils/csca.ts';
// Export OFAC utility directly from local source to ensure availability in Storybook
export { fetchOfacTrees } from '../../.local-packages/common/src/utils/ofac.ts';
export {
  generateMockDSC,
  genMockIdDoc,
  genMockIdDocAndInitDataParsing,
} from '../../.local-packages/common/src/utils/passports/genMockIdDoc.ts';
export { initPassportDataParsing } from '../../.local-packages/common/src/utils/passports/passport.ts';
