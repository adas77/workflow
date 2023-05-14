import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { toast } from "react-toastify";
import { UPLOAD_MAX_FILES_NUMBER, UPLOAD_PART_NAME } from "~/consts";
import { api } from "~/utils/api";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  taskId?: string;
};

const Uploader = ({ taskId }: Props) => {
  const [files, setFiles] = useState<FilePondUpload[]>([]);
  const { mutate: doTaskMutate } = api.task.doTask.useMutation({
    onSuccess() {
      toast.success("Updated files");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const uploadFiles = async () => {
    try {
      if (!files || files.length < 1) return;
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

      toast.success("Files uploaded successfylly!");
      console.log(data);
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Sorry! something went wrong.");
    }
  };

  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={UPLOAD_MAX_FILES_NUMBER}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <button onClick={uploadFiles}>Send</button>
    </div>
  );
};
export default Uploader;
