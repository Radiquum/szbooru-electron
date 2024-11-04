import { NextResponse, NextRequest } from "next/server";
import { fetchDataViaGet } from "../utils";
import { SZ_GetEndpoint } from "@/app/booru/szbooru/endpoints";
// import { fetchDataViaGet, fetchDataViaPost } from "../utils";
// import { API_URL } from "../config";
// import { buffer } from "stream/consumers";

//   let API_V2: boolean | string =
//     req.nextUrl.searchParams.get("API_V2") || false;
//   if (API_V2 === "true") {
//     req.nextUrl.searchParams.delete("API_V2");
//   }

//   const url = `${API_URL}/${endpoint.join("/")}${query ? `?${query}` : ""}`;

export async function GET(
  req: NextRequest,
  { params }: { params: { endpoint: Array<string> } }
) {
  const { endpoint } = await params;
  const query = req.nextUrl.searchParams.toString();

  let hostname = req.headers.get("X-HOST") || "";
  const type = req.headers.get("X-TYPE") || "";
  let prefix = req.headers.get("X-PREFIX") || "";

  let customHeaders = req.headers.get("X-CUSTOM") || "";
  if (customHeaders != "") {
    customHeaders = JSON.parse(customHeaders);
  }

  if (hostname[hostname.length - 1] != "/" && prefix == "") {
    hostname = `${hostname}/`;
  }

  let url = "";
  if (type == "szurubooru") {
    url = `${hostname}${prefix}${endpoint.join("/")}${query ? "?" + query : ""}`;
  }

  const response = await fetchDataViaGet(url, customHeaders);
  return NextResponse.json(response);
}

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { endpoint: Array<string> } }
// ) {
//   const { endpoint } = params;
//   let API_V2: boolean | string =
//     req.nextUrl.searchParams.get("API_V2") || false;
//   if (API_V2 === "true") {
//     req.nextUrl.searchParams.delete("API_V2");
//   }
//   const query = req.nextUrl.searchParams.toString();
//   const url = `${API_URL}/${endpoint.join("/")}${query ? `?${query}` : ""}`;
//   let body;
//   const ReqContentTypeHeader = req.headers.get("Content-Type") || "";
//   let ResContentTypeHeader = "";

//   if (ReqContentTypeHeader.split(";")[0] == "multipart/form-data") {
//     ResContentTypeHeader = ReqContentTypeHeader;
//     body = await req.arrayBuffer();
//   } else {
//     ResContentTypeHeader = "application/json; charset=UTF-8";
//     body = JSON.stringify(await req.json());
//   }

//   const response = await fetchDataViaPost(url, body, API_V2, ResContentTypeHeader);
//   return NextResponse.json(response);
// }
