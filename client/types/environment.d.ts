declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TZ?: string;
      NODE_ENV: 'development' | 'production';

      // Backend
      NEXT_PUBLIC_WS_GATEWAY: string;
      NEXT_PUBLIC_API_GATEWAY: string;
    }
  }
}

export {};
