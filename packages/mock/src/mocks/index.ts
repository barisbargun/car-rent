import { EnvConfig, envConfig } from '#mock/config/env'

export const enableMocking = async ({
  API_URL,
  ENABLE_API_MOCKING,
  MOCKING_SEED,
}: EnvConfig) => {
  if (ENABLE_API_MOCKING) {
    /* Initialize env variables */
    envConfig.API_URL = API_URL
    envConfig.ENABLE_API_MOCKING = ENABLE_API_MOCKING
    envConfig.MOCKING_SEED = MOCKING_SEED

    const { worker } = await import('./browser')
    if (MOCKING_SEED) {
      const { seedDb } = await import('./seed')
      await seedDb()
    }

    const { initializeDb } = await import('./db')
    await initializeDb()
    return worker.start()
  }
}
