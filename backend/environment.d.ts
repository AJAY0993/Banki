declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      DB_URI: string
      WHITELIST_ORIGIN: string
      NODE_ENV:string
    }
  }
}

export {}
