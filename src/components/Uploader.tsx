import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import { toast } from 'react-toast'
import { UPLOAD_MAX_FILES_NUMBER, UPLOAD_PART_NAME } from '~/consts'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Uploader = () => {
    const [files, setFiles] = useState<any[]>([])
    const uploadFiles = async () => {
        try {
            if (!files || files.length < 1) return;
            var formData = new FormData();
            files.forEach(f => {
                const mediaFile = f.file
                formData.append(UPLOAD_PART_NAME, mediaFile)
            });

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const {
                data,
                error,
            }: {
                data: {
                    url: string | string[];
                } | null;
                error: string | null;
            } = await res.json();

            if (error || !data) {
                toast("Sorry! something went wrong.");
                return;
            }
            toast("Files uploaded successfylly!");
            setFiles([]);
        } catch (error) {
            console.error(error);
            toast("Sorry! something went wrong.");
        }
    };

    return (
        <div>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={UPLOAD_MAX_FILES_NUMBER}
                // server="/api/upload"
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
            <button onClick={uploadFiles}>Send</button>
        </div>
    )
}
export default Uploader
