import React from "react";
import Button from "../Button";
import Link from "next/link";
// import { UploadFile } from "@prisma/client";

type Props = {
  f: UploadFile;
};

function Downloader({ f }: Props) {
  //   const { id, pathToFile, originalFileName } = f;
  return (
    <Button variant="ghost">
      <Link href={"/api/download"}>Download</Link>
    </Button>
  );
}

export default Downloader;
