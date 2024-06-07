import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
let convert = require("xml-js");

export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("source") as string;
  console.log(source)


  if (source === undefined) {
    return NextResponse.json({ err: "parameter error" }, { status: 401 });
  }

  const filePath = join(process.cwd(), "user", "data", source);

  try {
    const fileContent = readFileSync(filePath, "utf8");
    const jsonData: object = JSON.parse(fileContent)
    return NextResponse.json({ data: jsonData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "error reading file" }, { status: 500 });
  }
}
