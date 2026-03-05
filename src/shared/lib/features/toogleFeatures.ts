import { FeatureFlags } from 'shared/types/featureFlags';
import { getFeatureFlag } from './setGetFeatures';

export interface ToogleFeatureOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toogleFeatures<T>({
  off,
  on,
  name,
}: ToogleFeatureOptions<T>): T {
  if (getFeatureFlag(name)) {
    return on();
  }
  return off();
}
