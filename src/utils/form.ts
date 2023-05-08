import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import mime from "mime";
import type { NextApiRequest } from "next";
import { join } from "path";
import { UPLOAD_ALLOWED_MIME_TYPES, UPLOAD_MAX_FILES_NUMBER, UPLOAD_MAX_FILE_SIZE_MB, UPLOAD_PART_NAME } from "~/consts";
import { formatDate } from "./format";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return await new Promise(async (resolve, reject) => {
        const uploadDir = join(
            process.env.ROOT_DIR || process.cwd(),
            `/uploads/${formatDate(Date.now())}`
        );

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }

        const form = formidable({
            maxFiles: UPLOAD_MAX_FILES_NUMBER,
            maxFileSize: UPLOAD_MAX_FILE_SIZE_MB,
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"
                    }`;
                return filename;
            },

            filter: (part) => {
                return (
                    part.name === UPLOAD_PART_NAME
                    && part.mimetype != null
                    && UPLOAD_ALLOWED_MIME_TYPES.includes(part.mimetype)
                );
            },
        });

        form.parse(req, function (err, fields, files) {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};