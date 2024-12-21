type EnvConfig = {
  API_URL: string
  ENABLE_API_MOCKING?: boolean
  MOCKING_SEED?: boolean
}

const envConfig: EnvConfig = {
  API_URL: '',
  ENABLE_API_MOCKING: false,
  MOCKING_SEED: false,
}

export { envConfig, type EnvConfig }
