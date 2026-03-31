export type MfeConfig = {
  env: string;
  tag: string;
  route?: boolean;
  path?: string;
};

export const mfes: Record<string, MfeConfig> = {
  layout: {
    env: "VITE_MFE_LAYOUT_URL",
    tag: "mfe-layout",
  },
  cookiebot: {
    env: "VITE_MFE_COOKIEBOT_URL",
    tag: "mfe-cookiebot",
  },
  billing: {
    route: true,
    env: "VITE_MFE_BILLING_URL",
    tag: "mfe-billing",
    path: "/billing",
  },
  dashboard: {
    route: true,
    env: "VITE_MFE_DASHBOARD_URL",
    tag: "mfe-dashboard",
    path: "/dashboard",
  },
};
