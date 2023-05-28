import type { NextApiRequest, NextApiResponse } from "next";
import { FormidableError, parseForm } from "~/utils/form";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: {
      url: FileUrl[];
    };
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      error: "Method Not Allowed",
    });
    return;
  }
  try {
    const { files } = await parseForm(req);
    if (Object.keys(files).length === 0) {
      throw new Error("No files found");
    }
    console.log(files);
    const file = files.media;
    if (!file) return;
    const url: FileUrl[] = Array.isArray(file)
      ? file.map((f) => {
          return {
            filepath: f.filepath,
            originalFilename: f.originalFilename || "",
          };
        })
      : [
          {
            filepath: file.filepath,
            originalFilename: file.originalFilename || "",
          },
        ];
    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
