export async function uploadFile(file: string, token: string) {
  const { url, fields, id } = await fetch("/api/presigned-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  formData.append("file", {
    uri: file,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);

  const uploadResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload video");
  }

  return id;
}
