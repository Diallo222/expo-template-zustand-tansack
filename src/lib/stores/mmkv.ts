import { createMMKV } from 'react-native-mmkv';

/** Single MMKV instance for Zustand persistence and fast key-value access. */
export const appMmkv = createMMKV({ id: 'app-mmkv' });
