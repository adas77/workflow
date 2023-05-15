import axios from "axios";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { toast } from "react-toastify";
import { z } from "zod";
import { UPLOAD_MAX_FILES_NUMBER, UPLOAD_PART_NAME } from "~/consts";
import { api } from "~/utils/api";
import Button from "./Button";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  taskId: string;
};

const Uploader = ({ taskId }: Props) => {
  const [files, setFiles] = useState<FilePondUpload[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { mutate: doTaskMutate } = api.task.doTask.useMutation({
    onSuccess() {
      setFiles([]);
      toast.success("Files uploaded successfylly!");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const uploadFiles = async () => {
    try {
      if (!files || files.length < 1) return;
      setUploadLoading(true);
      const formData = new FormData();
      files.forEach((f) => {
        const mediaFile = f.file;
        formData.append(UPLOAD_PART_NAME, mediaFile);
      });

      const { data } = await fetchFiles(formData);
      const { url } = data;
      if (!url) {
        toast.error("Sorry! something went wrong.");
        return;
      }
      if (taskId) {
        doTaskMutate({
          taskId,
          files: url.map((f) => {
            return { originalFileName: f.originalFilename, path: f.filepath };
          }),
        });
      }
    } catch (error) {
      toast.error("Sorry! something went wrong.");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="grid">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={UPLOAD_MAX_FILES_NUMBER}
        name="files"
        credits={false}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <Button variant="ghost" onClick={uploadFiles} loading={uploadLoading}>
        Send
      </Button>
    </div>
  );
};
export default Uploader;

async function fetchFiles(formData: FormData) {
  const schema = z.object({
    data: z.object({
      url: z.array(
        z.object({
          filepath: z.string(),
          originalFilename: z.string(),
        })
      ),
    }),
  });

  const res = await axios.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return schema.parse(res.data);
}
