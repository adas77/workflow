import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export async function toBase64ImageUrl(imgUrl: string): Promise<string> {
    const fetchImageUrl = await fetch(imgUrl);
    const responseArrBuffer = await fetchImageUrl.arrayBuffer();
    const toBase64 = `data:${fetchImageUrl.headers.get('Content-Type') || 'image/png'};base64,${Buffer.from(responseArrBuffer).toString('base64')}`;
    return toBase64;
}

export function saveB64ToPng(b64: string): string {
    fs.mkdirSync("./public/uploads", { recursive: true });

    const uuid = uuidv4();
    const data = b64.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');
    fs.writeFile(`./public/uploads/${uuid}.png`, buf, (err) => { });
    return uuid;
}

export function fetchImage(path: string): string {
    const fetchUrl: string = path.startsWith('https://') ? path : `/uploads/${path}.png`;
    return fetchUrl;

}