import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { withAuth } from "@/utils/withAuth";

const isLocalS3 = process.env.USE_LOCAL_S3 === "true";

export const s3Client = new S3Client({
  region: "us-east-1",
  ...(isLocalS3 && {
    endpoint: "http://localhost:9000",
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER",
    },
    forcePathStyle: true,
  }),
});

export const POST = withAuth(async (request: Request) => {
  const id = uuidv4();

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.STORAGE_BUCKET_NAME!,
    Key: id,
    Conditions: [
      ["content-length-range", 0, 5 * 1024 * 1024],
      ["starts-with", "$Content-Type", "image/"],
    ],
    Expires: 600,
  });

  const finalUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:9000/${process.env.STORAGE_BUCKET_NAME}/`
      : url;

  return new Response(JSON.stringify({ url: finalUrl, fields, id }), {
    status: 200,
  });
});
