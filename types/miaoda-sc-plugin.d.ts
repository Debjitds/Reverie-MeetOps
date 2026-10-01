// `miaoda-sc-plugin` declares `"types": "dist/index.d.ts"` in its package.json,
// but the published package ships no such file, so TypeScript resolves it as
// an implicit `any` module (error TS7016 in vite.config.ts).
// This ambient declaration supplies the missing type info for the platform
// plugin's public export, keeping vite.config.ts fully type-checked.
declare module "miaoda-sc-plugin" {
  import type { PluginOption } from "vite";
  export function miaodaDevPlugin(): PluginOption;
}
