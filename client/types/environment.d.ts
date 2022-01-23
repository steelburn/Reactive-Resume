declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TZ?: string;
      NODE_ENV: 'development' | 'production';

      // Backend
      NEXT_PUBLIC_SERVER_GATEWAY: string;
    }
  }
}

export {};
