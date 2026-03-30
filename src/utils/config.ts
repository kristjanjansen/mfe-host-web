export type MfeConfig = {
  environment: string;
  country: string;
  defaultLanguage: string;
  languages: string[];
  features: Record<string, boolean>;
};

export function useConfig(): MfeConfig {
  return (window as any).__MFE_CONFIG__;
}

export function useFeature(flag: string): boolean {
  const config = useConfig();
  return config?.features?.[flag] ?? false;
}
