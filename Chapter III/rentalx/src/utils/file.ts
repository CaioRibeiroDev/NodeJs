import fs from "fs"

export const deleteFile = async(filename: string) => {
  try {
                      // verifica se existe
    await fs.promises.stat(filename)
  } catch {
    return;
  }

  await fs.promises.unlink(filename);
}