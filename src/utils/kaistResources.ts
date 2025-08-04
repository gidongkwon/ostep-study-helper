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
  snuPdf?: PdfResource;
  kaistResource?: KAISTResource;
  topicName: string;
}

export function getAlignedResourcesForChapter(
  snuPdfs: PdfResource[],
  chapterId: string
): AlignedResource[] {
  const kaistResources = getKAISTResourcesForChapter(chapterId);
  const aligned: AlignedResource[] = [];

  // Create a map of SNU PDFs by their titles (normalized)
  const snuPdfMap = new Map<string, PdfResource>();
  snuPdfs.forEach(pdf => {
    const normalizedTitle = pdf.title.toLowerCase()
      .replace(/[:\-\s]/g, '')
      .replace('the', '')
      .replace('abstraction', '')
      .replace('introduction', '')
      .replace('interlude', '');
    snuPdfMap.set(normalizedTitle, pdf);
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

  // First, align SNU PDFs with matching KAIST resources
  snuPdfs.forEach(pdf => {
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
      snuPdf: pdf,
      kaistResource: matchingKaist,
      topicName: pdf.title
    });
  });

  // Add remaining KAIST resources that didn't match any SNU PDF
  kaistResourceMap.forEach(kaistResource => {
    aligned.push({
      kaistResource,
      topicName: kaistResource.name
    });
  });

  return aligned;
}