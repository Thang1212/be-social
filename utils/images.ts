export function getImageUrl(imageId: string) {
  return `${process.env.EXPO_PUBLIC_STORAGE_BUCKET_NAME}/${imageId}`;
}
