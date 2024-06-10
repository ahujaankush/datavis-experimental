import { toJpeg, toPng, toSvg } from "html-to-image";
import React, { useState } from "react";

import { PDFDocument } from "pdf-lib";

// Im public Folder kann man das test.png und test.jpg zu den erwünschten watermarks ändern.
async function addWatermark(
  dataUrl: string,
  watermarkUrl: string,
  opacity = 0.1
) {
  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const watermark = new Image();
  watermark.src = watermarkUrl;
  await new Promise((resolve) => {
    watermark.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the original image
  ctx?.drawImage(img, 0, 0);

  // Set the transparency level
  if (ctx != null) ctx.globalAlpha = opacity;

  const scaleFactor = 0.1; // Scale watermark to 10% of the image width
  const wmWidth = img.width * scaleFactor;
  const wmHeight = watermark.height * (wmWidth / watermark.width);

  // Draw the watermark with the specified opacity in the top right corner
  ctx?.drawImage(watermark, img.width - wmWidth - 10, 10, wmWidth, wmHeight);

  // Reset the globalAlpha to default
  if (ctx != null) ctx.globalAlpha = 1.0;

  return canvas.toDataURL("image/png");
}

export function exportHandlerPNG(ref: any) {
  if (ref.current === null) {
    return;
  }

  const watermarkUrl = "test.png"; // WATERMARK/HIER WASSERZEICHEN PATH HINZUFÜGEN

  toPng(ref.current, { cacheBust: true })
    .then((dataUrl) => addWatermark(dataUrl, watermarkUrl))
    .then((dataUrlWithWatermark) => {
      const link = document.createElement("a");
      link.download = "png_bild.png";
      link.href = dataUrlWithWatermark;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
}
export async function exportHandlerPDFMulti(
  refs: Array<{ content: React.RefObject<any> }>
) {
  if (refs.length === 0) {
    return;
  }

  try {
    const pdfDoc = await PDFDocument.create();

    for (const ref of refs) {
      const element = ref.content.current;
      if (element instanceof HTMLElement) {
        const dataUrl = await toPng(element, { cacheBust: true });

        const dataUrlWithWatermark = await addWatermark(
          dataUrl,
          "test.png",
          0.1
        ); // Set opacity to 50%

        if (!dataUrlWithWatermark.startsWith("data:image/png")) {
          throw new Error("The watermarked data URL is not a valid PNG.");
        }

        const pdfImage = await pdfDoc.embedPng(dataUrlWithWatermark);

        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const dims = pdfImage.scaleToFit(width, height);

        page.drawImage(pdfImage, {
          x: (width - dims.width) / 2,
          y: (height - dims.height) / 2,
          width: dims.width,
          height: dims.height,
        });
      } else {
        console.error("Invalid content element:", ref.content);
      }
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = "combined_pdf_with_watermark.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.log(err);
  }
}
export async function exportHandlerPDF(ref: any) {
  if (ref.current === null) {
    return;
  }

  try {
    const dataUrl = await toPng(ref.current, { cacheBust: true });

    const dataUrlWithWatermark = await addWatermark(dataUrl, "test.png", 0.1); // Set opacity to 50%

    if (!dataUrlWithWatermark.startsWith("data:image/png")) {
      throw new Error("The watermarked data URL is not a valid PNG.");
    }

    const pdfDoc = await PDFDocument.create();
    const pdfWatermarkImage = await pdfDoc.embedPng(dataUrlWithWatermark);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const dims = pdfWatermarkImage.scaleToFit(width, height);

    page.drawImage(pdfWatermarkImage, {
      x: (width - dims.width) / 2,
      y: (height - dims.height) / 2,
      width: dims.width,
      height: dims.height,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = "pdf_image_with_watermark.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.log(err);
  }
}

export function exportHandlerJPEG(ref: any) {
  if (ref.current === null) {
    return;
  }

  toJpeg(ref.current, { cacheBust: true })
    .then((dataUrl) => addWatermark(dataUrl, "test.jpg"))
    .then((dataUrlWithWatermark) => {
      const link = document.createElement("a");
      link.download = "bild.jpeg";
      link.href = dataUrlWithWatermark;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
}
