import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

/**
 * API Route to serve frame images from the project root folder.
 * This avoids needing to copy frames into /public/.
 *
 * URL pattern: /api/frames/ezgif-frame-001.png
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Security: only allow .png files with the expected naming pattern
  if (!/^ezgif-frame-\d{3}\.png$/.test(filename)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const framesDir = path.join(
    process.cwd(),
    "ezgif-621fdca560a5c94f-png-split"
  );
  const filePath = path.join(framesDir, filename);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
