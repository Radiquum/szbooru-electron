import { NextResponse, NextRequest } from "next/server";
import { fetchDataViaGet, fetchDataViaPost } from "../utils";
// import { buffer } from "stream/consumers";

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
    url = `${hostname}${prefix}${endpoint.join("/")}${
      query ? "?" + query : ""
    }`;
  }

  console.log(`GET VIA PROXY REQUEST: ${url}\n \t HOST: ${hostname} \n \t TYPE: ${type} \n \t PREFIX: ${prefix} \n \t HEADERS: ${req.headers.get("X-CUSTOM")} \n `)

  const response = await fetchDataViaGet(url, customHeaders);
  return NextResponse.json(response);
}

// let body;
// const ReqContentTypeHeader = req.headers.get("Content-Type") || "";
// let ResContentTypeHeader = "";

// if (ReqContentTypeHeader.split(";")[0] == "multipart/form-data") {
//   ResContentTypeHeader = ReqContentTypeHeader;
//   body = await req.arrayBuffer();
// } else {
//   ResContentTypeHeader = "application/json; charset=UTF-8";
//   body = JSON.stringify(await req.json());
// }

export async function POST(
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
    url = `${hostname}${prefix}${endpoint.join("/")}${
      query ? "?" + query : ""
    }`;
  }
  const body = JSON.stringify(await req.json());

  const response = await fetchDataViaPost(url, body, customHeaders);
  return NextResponse.json(response);
}
