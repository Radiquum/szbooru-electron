export const SZ_ENDPOINTS = {
    getGlobalInfo: "/info",
    getUser: "/user",
    createUserToken: "/user-token",
    listPosts: "/posts"
}

export function SZ_GetEndpoint(HOST: string, ENDPOINT: string, PREFIX: string) {
    return `${HOST}${PREFIX}${ENDPOINT}`
}