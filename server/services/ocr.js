import pdf from "pdf-parse";
import fs from "fs";
import tesseract from "node-tesseract-ocr";

export async function extractText(file) {
  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (file.mimetype.startsWith("image/")) {
    const config = {
      lang: "eng",
      oem: 1,
      psm: 3,
    };
    const text = await tesseract.recognize(file.path, config);
    return text;
  }
  throw new Error("Unsupported file type");
}
