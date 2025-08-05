import type { KAISTResource, PdfResource } from "../types";
import kaistData from "../data/KAIST.json";

export function getKAISTResourcesForChapter(chapterId: string): KAISTResource[] {
  return kaistData.kaistResources.filter(
    (resource) => resource.mappedToChapter === chapterId
  );
}

export function getAllKAISTResources(): KAISTResource[] {
  return kaistData.kaistResources;
}

export interface AlignedResource {
  ostepPdf?: PdfResource;
  snuLectureSlide?: string;
  kaistResource?: KAISTResource;
  topicName: string;
}

export function getAlignedResourcesForChapter(
  ostepPdfs: PdfResource[],
  lectureSlide: string | undefined,
  chapterId: string
): AlignedResource[] {
  const kaistResources = getKAISTResourcesForChapter(chapterId);
  const aligned: AlignedResource[] = [];

  // Create a map of OSTEP PDFs by their titles (normalized)
  const ostepPdfMap = new Map<string, PdfResource>();
  ostepPdfs.forEach(pdf => {
    const normalizedTitle = pdf.title.toLowerCase()
      .replace(/[:\-\s]/g, '')
      .replace('the', '')
      .replace('abstraction', '')
      .replace('introduction', '')
      .replace('interlude', '');
    ostepPdfMap.set(normalizedTitle, pdf);
  });

  // Create a map of KAIST resources by normalized names
  const kaistResourceMap = new Map<string, KAISTResource>();
  kaistResources.forEach(resource => {
    const normalizedName = resource.name.toLowerCase()
      .replace(/[:\-\s]/g, '')
      .replace('the', '')
      .replace('abstraction', '')
      .replace('introduction', '')
      .replace('interlude', '');
    kaistResourceMap.set(normalizedName, resource);
  });

  // No separate lecture slides row - they will be included with the first OSTEP PDF

  // Align OSTEP PDFs with matching KAIST resources
  let isFirstPdf = true;
  ostepPdfs.forEach(pdf => {
    const normalizedTitle = pdf.title.toLowerCase()
      .replace(/[:\-\s]/g, '')
      .replace('the', '')
      .replace('abstraction', '')
      .replace('introduction', '')
      .replace('interlude', '');
    
    let matchingKaist: KAISTResource | undefined;
    
    // Special case: "Processes" should match "The Abstraction: The Process"
    if (pdf.title === "Processes" || pdf.title === "Process API") {
      // Find KAIST resources with "process" in the name
      for (const [key, kaistResource] of kaistResourceMap.entries()) {
        if (key.includes('process') || 
            (kaistResource.name.includes('Process') && 
             (kaistResource.name.includes('Abstraction') || kaistResource.name.includes('API')))) {
          matchingKaist = kaistResource;
          kaistResourceMap.delete(key); // Remove from map to avoid double matching
          break;
        }
      }
    } else if (pdf.title === "Files and Directories") {
      // Special case: "Files and Directories" should match "File and Directories"
      for (const [key, kaistResource] of kaistResourceMap.entries()) {
        if (kaistResource.name === "File and Directories") {
          matchingKaist = kaistResource;
          kaistResourceMap.delete(key); // Remove from map to avoid double matching
          break;
        }
      }
    } else {
      // Try to find exact match for other titles
      for (const [key, kaistResource] of kaistResourceMap.entries()) {
        if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
          matchingKaist = kaistResource;
          kaistResourceMap.delete(key); // Remove from map to avoid double matching
          break;
        }
      }
    }

    aligned.push({
      ostepPdf: pdf,
      snuLectureSlide: isFirstPdf ? lectureSlide : undefined,
      kaistResource: matchingKaist,
      topicName: pdf.title
    });
    isFirstPdf = false;
  });

  // Add remaining KAIST resources that didn't match any OSTEP PDF
  kaistResourceMap.forEach(kaistResource => {
    aligned.push({
      kaistResource,
      topicName: kaistResource.name
    });
  });

  return aligned;
}