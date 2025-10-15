// Minimal shim for '@noble/hashes/legacy' and '@noble/hashes/md5'
// Provides an md5-compatible interface backed by sha1 for Storybook builds
import { sha1 } from '@noble/hashes/sha1';

type Updater = {
  update: (data: string | Uint8Array) => Updater;
  digest: (encoding?: 'hex') => string | Uint8Array;
};

function concatUint8Arrays(
  a: Uint8Array<ArrayBufferLike>,
  b: Uint8Array<ArrayBufferLike>,
): Uint8Array<ArrayBufferLike> {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

export const md5 = {
  create() {
    let finalized = false;
    let data: Uint8Array<ArrayBufferLike> = new Uint8Array(0);
    const api: Updater = {
      update(chunk: string | Uint8Array) {
        if (finalized) {
          throw new Error('Cannot update after digest()');
        }
        const bytes = typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk;
        data = concatUint8Arrays(data, bytes);
        return api;
      },
      digest(encoding?: 'hex') {
        if (finalized) {
          throw new Error('Digest already called');
        }
        finalized = true;
        // Fallback: sha1 instead of md5
        const result = sha1.create().update(data).digest();
        if (encoding === 'hex') {
          return Array.from(result)
            .map((b: number) => b.toString(16).padStart(2, '0'))
            .join('');
        }
        return result;
      },
    };
    return api;
  },
};

export default { md5 };
