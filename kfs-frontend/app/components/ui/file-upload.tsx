"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { FileText, Upload, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (files: File[] | null) => void;
  initialFile?: File | File[] | null;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  initialFile = null,
  accept = "*/*",
  multiple = false,
  className = "",
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(Array.isArray(initialFile) ? initialFile : initialFile ? [initialFile] : []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      const newFiles = multiple ? [...files, ...selectedFiles] : [selectedFiles[0]];
      setFiles(newFiles);
      onFileSelect(newFiles.length > 0 ? newFiles : null);
    }
  };

  const handleDelete = (fileToDelete: File) => {
    const newFiles = files.filter((file) => file !== fileToDelete);
    setFiles(newFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(newFiles.length > 0 ? newFiles : null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col items-center justify-center w-full">
        <Input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          ref={fileInputRef}
          multiple={multiple}
        />
        <label
          htmlFor="file-upload"
          className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 overflow-hidden"
        >
          {files.length > 0 && files[0].type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(files[0])}
              alt="Uploaded Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">Dosya yüklemek için tıklayın veya sürükleyin</p>
              <p className="text-xs text-muted-foreground">
                {accept === "image/*"
                  ? "PNG, JPG veya GIF (max. 10MB)"
                  : "PDF, DOC, DOCX, XLS, XLSX formatları desteklenmektedir"}
              </p>
            </div>
          )}
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt="Uploaded" className="h-10 w-10 object-cover rounded-md" />
                ) : (
                  <FileText className="h-8 w-8 text-blue-500" />
                )}
                <div className="space-y-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(file)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
