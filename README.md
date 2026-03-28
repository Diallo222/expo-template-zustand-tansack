# expo-template-zustand-tansack

Production-oriented Expo (SDK 55) template with **feature folders**, **TanStack Query** for server state, **Zustand + MMKV** for client state, **react-hook-form + Zod** for forms, and **NativeWind** styling.

## Stack

- Expo Router (`src/app/`), React 19, TypeScript strict
- New Architecture enabled in `app.config.ts` (`newArchEnabled`)
- TanStack Query v5, Zustand with `persist` + `react-native-mmkv`
- Axios `httpClient` with JWT attach + refresh attempt + logout on hard 401
- NativeWind v4 + Tailwind, Reanimated, expo-image, FlashList
- **expo-maps** (Apple Maps on iOS, Google Maps on Android) — alpha API; use a **development build**, not Expo Go. Set `GOOGLE_MAPS_ANDROID_API_KEY` in `.env` for native Android builds ([docs](https://docs.expo.dev/versions/latest/sdk/maps/)).

## Setup

```bash
npm install
cp .env.example .env
npx expo start
```

## Environment

- Copy `.env.example` to `.env` and set `EXPO_PUBLIC_*` variables as needed.
- For maps on Android, set `GOOGLE_MAPS_ANDROID_API_KEY` (read at **prebuild** / EAS; rebuild native app after changing it).
- **Never** commit `.env` or put private API secrets in `EXPO_PUBLIC_*` (they are embedded in the client bundle).
- Access tokens for the demo can live in MMKV via Zustand persist; **refresh tokens** are intended for `expo-secure-store` (see `src/lib/api/secureTokens.ts`).

## Scripts

| Script        | Description        |
| ------------- | ------------------ |
| `npm start`   | Expo dev server    |
| `npm run lint` | ESLint            |
| `npm run typecheck` | `tsc --noEmit` |

## Layout

- `src/app/` — routes only (auth stack, drawer, index redirect).
- `src/features/<domain>/` — `api.ts`, `queries/`, `store.ts`, `types.ts`, `screens/`, `index.ts`.
- `src/lib/` — `api/httpClient.ts`, `queryClient.ts`, shared stores.

## Demo flows

- **Login** — `reqres.in` demo API (`POST /login`). Default sample credentials are pre-filled on the form.
- **Products** — `fakestoreapi.com` list with FlashList + expo-image (validated with Zod).

## Security notes

- Centralize HTTP in `src/lib/api/httpClient.ts` (no `fetch` in components).
- Validate API responses with Zod in feature `api.ts` / `types.ts`.
- For production, store long-lived refresh tokens in **SecureStore**, not plain MMKV, if your threat model requires it.
