export const SZ_ENDPOINTS = {
    getGlobalInfo: "/info",
    getUser: "/user",
    createUserToken: "/user-token"
}

export function SZ_GetEndpoint(HOST: string, ENDPOINT: string, PREFIX: string) {
    return `${HOST}${PREFIX}${ENDPOINT}`
}