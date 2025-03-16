const list = {
  access_token: 'token',
}

type Storage = {
  get: () => string | null
  set: (value: string) => void
  remove: () => void
}

export const storageToken: Storage = {
  get: () => localStorage.getItem(list.access_token),
  set: (value) => {
    localStorage.setItem(list.access_token, value)
  },
  remove: () => {
    localStorage.removeItem(list.access_token)
  },
}
