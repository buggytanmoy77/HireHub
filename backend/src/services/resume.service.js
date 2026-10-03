const { PDFParse } = require("pdf-parse");

const extractTextFromResume = async (fileBuffer) => {
  if (!fileBuffer) {
    throw new Error("PDF buffer is required");
  }

  const parser = new PDFParse({
    data: fileBuffer,
  });

  try {
    const result = await parser.getText();

    return result.text.trim();
  } finally {
    await parser.destroy();
  }
};

module.exports = {
  extractTextFromResume,
};