const HEADERS = { Accept: "application/json" };

export const fetchDataViaGet = async (url: string, customHeaders?: any) => {
  try {
    const response = await fetch(url, {
      headers: { ...HEADERS, ...customHeaders },
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataViaPost = async (
  url: string,
  body: string,
  customHeaders?: any,
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { ...HEADERS, ...customHeaders },
      body: body,
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
