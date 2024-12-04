import type { NextConfig } from "next";
import nextTranslate from "next-translate-plugin";

module.exports = nextTranslate()
const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'zh'], // 支持的语言列表
    defaultLocale: 'zh', // 默认语言
  },
};



export default nextConfig;
