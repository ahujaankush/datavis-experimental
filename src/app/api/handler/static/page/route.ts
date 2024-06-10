import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
let convert = require("xml-js");

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location") as string;

  if (location === undefined) {
    return NextResponse.json({ err: "parameter error" }, { status: 401 });
  }

  const filePath = join(process.cwd(), "user", "dashboard", ...location.split("/"));

  try {
    const fileContent = readFileSync(filePath, "utf8");
    const jsonData: object = JSON.parse(convert.xml2json(fileContent, {
      compact: false,
      spaces: 0,
    }));

    return NextResponse.json({ data: jsonData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "error reading file" }, { status: 500 });
  }
}
