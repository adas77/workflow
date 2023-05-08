export const UPLOAD_MAX_FILES_NUMBER: number = 10;
export const UPLOAD_MAX_FILE_SIZE_MB: number = 1024 * 1024 * 100; // 100mb
export const UPLOAD_PART_NAME: string = "media";
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
export const UPLOAD_ALLOWED_MIME_TYPES: string[] = [
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.presentation",
    "application/vnd.oasis.opendocument.spreadsheet",
    "text/csv",
    "text/html",
    "application/vnd.ms-excel",
    "application/msword",
    "application/pdf",
    "application/zip",
    "application/json",
    "application/x-7z-compressed",
    "application/octet-stream",
    "text/calendar",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
]