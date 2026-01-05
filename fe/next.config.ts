import type { NextConfig } from "next";
import { ROUTERS } from "./src/utils/constant";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Temporarily disable to fix hydration
  
  // Auto-import variables và mixins vào tất cả file SCSS
  sassOptions: {
    additionalData: `
      @use "src/styles/variables" as *;
      @use "src/styles/mixins" as *;
    `,
  },
  
  async rewrites() {
    return [
      {
        source: ROUTERS.PUBLIC.HOME,
        destination: ROUTERS.USER.HOME,
      },
      {
        source: ROUTERS.PUBLIC.TEST,
        destination: ROUTERS.USER.TEST,
      },
      {
        source: ROUTERS.PUBLIC.ADMIN_PANEL,
        destination: ROUTERS.ADMIN.HOME,
      },
    ];
  },
};

export default nextConfig;
