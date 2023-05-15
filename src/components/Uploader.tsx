import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { toast } from "react-toastify";
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

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: FileUrl[];
        };
        error: string | null;
      } = await res.json();

      if (error || !data) {
        toast.error("Sorry! something went wrong.");
        return;
      }
      if (taskId) {
        doTaskMutate({
          taskId,
          files: data.url.map((f) => {
            return { originalFileName: f.originalFilename, path: f.filepath };
          }),
        });
      }
    } catch (error) {
      console.error(error);
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
