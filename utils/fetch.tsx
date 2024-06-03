import { AiEffectType } from "@/types";

const Model = {
    none: "app/model/deploy/AnimeGANv3_Hayao_36.onnx",
    hayao: "app/model/deploy/AnimeGANv3_Hayao_36.onnx",
    shinkai: "app/model/deploy/AnimeGANv3_Shinkai_37.onnx",
    paprika: "app/model/deploy/AnimeGANv3_Paprika.onnx",
    portraitSketch: "app/model/deploy/AnimeGANv3_PortraitSketch.onnx",
    jpFace: "app/model/deploy/AnimeGANv3_JP_face.onnx",
}

export async function uploadFile(videoObject: any, type: AiEffectType) {
  // Extract the blob URL from the videoObject
  const blobUrl = videoObject;

  try {
    // Fetch the blob data from the blob URL
    const blob = await fetch(blobUrl).then((res) => res.blob());

    // Create a new file object from the blob
    const file = new File([blob], "video.mp4", { type: "video/mp4" });

    // Prepare the FormData with the file and the extra parameter
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", Model[type]); // Append the additional parameter

    // Post the form data with the file to the FastAPI endpoint
    const response = await fetch("http://127.0.0.1:8000/uploadfile/", {
      method: "POST",
      body: formData,
    });

    // Handle the response
    if (response.ok) {
      const jsonResponse = await response.json();

      // Extract the object name from the JSON response
      const objectName = jsonResponse.object_name;
      console.log(objectName);

      // Fetch the pre-signed URL for accessing the uploaded file
      const presignedUrlResponse = await fetch(
        `http://127.0.0.1:8000/get_presigned_url/?file_name=${encodeURIComponent(
          objectName
        )}`
      );

      if (!presignedUrlResponse.ok) {
        throw new Error(
          `Failed to get pre-signed URL: ${presignedUrlResponse.statusText}`
        );
      }

      const presignedUrlJson = await presignedUrlResponse.json();
      const presignedUrl = presignedUrlJson.url;
      console.log(presignedUrl);
      
      return presignedUrl
    } else {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function processVideo(videoObject:any, type:string) {
  // Extract the blob URL from the videoObject
  const blobUrl = videoObject;

  try {
    // Fetch the blob data from the blob URL
    const blob = await fetch(blobUrl).then((res) => res.blob());

    // Create a new file object from the blob
    const file = new File([blob], "video.mp4", { type: "video/mp4" });

    // Prepare the FormData with the file
    const formData = new FormData();
    formData.append("video_file", file);
    formData.append("type", type);

    // Post the form data with the file to the FastAPI endpoint
    const response = await fetch("http://127.0.0.1:8000/process_and_upload_video/", {
      method: "POST",
      body: formData,
    });

    // Handle the response
    if (response.ok) {
      const jsonResponse = await response.json();

      // Extract the download URL and object name from the JSON response
      const downloadUrl = jsonResponse.download_url;
      const videoObjectName = jsonResponse.video_object_name;

      console.log(downloadUrl);
      console.log(videoObjectName);

      return { downloadUrl, videoObjectName };
    } else {
      throw new Error(`Processing failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error processing video:", error);
    throw error;
  }
}

export async function processVideoSrt(videoObject: any, type: string, srtUrl: any) {
  const videoBlobUrl = videoObject;
  const srtBlobUrl = srtUrl;

  try {
    // Fetch the blob data from the video and SRT blob URLs
    const videoBlob = await fetch(videoBlobUrl).then((res) => res.blob());
    const srtBlob = await fetch(srtBlobUrl).then((res) => res.blob());

    // Create new file objects from the blobs
    const videoFile = new File([videoBlob], "video.mp4", { type: "video/mp4" });
    const srtFile = new File([srtBlob], "subtitles.srt", { type: "application/x-subrip" });

    // Prepare the FormData with the files
    const formData = new FormData();
    formData.append("video_file", videoFile);
    formData.append("srt_file", srtFile);
    formData.append("type", type);

    // Post the form data with the files to the FastAPI endpoint
    const response = await fetch("/process_video_srt/", {
      method: "POST",
      body: formData,
    });

    // Handle the response
    if (response.ok) {
      const jsonResponse = await response.json();

      // Extract the download URL and object name from the JSON response
      const downloadUrl = jsonResponse.download_url;
      const videoObjectName = jsonResponse.object_name;

      console.log(downloadUrl);
      console.log(videoObjectName);

      return { downloadUrl, videoObjectName };
    } else {
      throw new Error(`Processing failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error processing video with SRT:", error);
    throw error;
  }
}
