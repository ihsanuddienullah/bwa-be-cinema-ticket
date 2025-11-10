export const getThumbnailUrl = (folderName: string): string => {
  return `${process.env.BACKEND_URL}/uploads/${folderName}/`
}
