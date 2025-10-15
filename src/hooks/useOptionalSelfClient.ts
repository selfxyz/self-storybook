import { SelfClientContext } from '@selfxyz/mobile-sdk-alpha';
import * as React from 'react';

export function useOptionalSelfClient() {
  return React.useContext(SelfClientContext);
}
