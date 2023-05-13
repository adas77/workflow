import formidable from "formidable";
import fs from "fs";
import mime from "mime";
import type { NextApiRequest } from "next";
import {
  UPLOAD_ALLOWED_MIME_TYPES,
  UPLOAD_MAX_FILES_NUMBER,
  UPLOAD_MAX_FILE_SIZE_MB,
  UPLOAD_PART_NAME,
} from "~/consts";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise((resolve, reject) => {
    const uploadDir = makeDir();
    const form = formidable({
      multiples: true,
      maxFiles: UPLOAD_MAX_FILES_NUMBER,
      maxFileSize: UPLOAD_MAX_FILE_SIZE_MB,
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
        return filename;
      },

      filter: (part) => {
        return (
          part.name === UPLOAD_PART_NAME &&
          part.mimetype != null &&
          UPLOAD_ALLOWED_MIME_TYPES.includes(part.mimetype)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export function makeDir(path?: string): string {
  const dir = path ? `./public/uploads/${path}` : `./public/uploads`;
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
