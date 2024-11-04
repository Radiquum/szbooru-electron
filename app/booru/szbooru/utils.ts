// get info
import { SZ_ENDPOINTS} from "./endpoints";

export async function SZ_GetInfo(HOST: string) {
  try {
    const res = await fetch(`/api/${SZ_ENDPOINTS.getGlobalInfo}`, {
      headers: {
        "X-HOST": HOST,
        "X-TYPE": "szurubooru",
        "X-PREFIX": "/api/",
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
