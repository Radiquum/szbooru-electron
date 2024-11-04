// get user
// generate new token if password is used

import { SZ_ENDPOINTS} from "./endpoints";

export async function SZ_GetLoggedUser(HOST: string, username: string, password: string) {
  try {
    const res = await fetch(`/api/${SZ_ENDPOINTS.getUser}/${username}?bump-login=true`, {
      headers: {
        "X-HOST": HOST,
        "X-TYPE": "szurubooru",
        "X-PREFIX": "/api/",
        "X-CUSTOM": JSON.stringify({
          "authorization": `Basic ${btoa(username + ":" + password)}`
        })
      },
    });
    if (!res.ok) {
      console.log(res);
      throw new Error("FAILED TO FETCH SERVER CONFIG!");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}