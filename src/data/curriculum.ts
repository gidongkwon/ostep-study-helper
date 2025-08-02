import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  // H.1: Course overview, Introduction to OS, Architectural support, Processes
  {
    id: "intro-os",
    title: "Introduction to Operating Systems",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/1-intro.pdf",
    pdfs: [
      {
        title: "Introduction to Operating Systems",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf",
        koreanPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/02-intro.pdf",
      },
    ],
    section: "lab1",
  },
  {
    id: "arch-support",
    title: "Architectural Support for OS",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/2-arch.pdf",
    pdfs: [
      {
        title: "Direct Execution",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/06-cpu-mechanisms.pdf",
      },
    ],
    section: "lab1",
  },
  {
    id: "processes",
    title: "Processes",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/3-process.pdf",
    pdfs: [
      {
        title: "Processes",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/04-cpu-intro.pdf",
      },
      {
        title: "Process API",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/05-cpu-api.pdf",
      },
    ],
    section: "lab1",
  },
  {
    id: "lab1-exercises",
    title: "H.1",
    pdfs: [
      {
        title: "Initial xv6 - System Call Implementation (x86 version)",
        englishPdf:
          "https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/initial-xv6",
      },
      {
        title: "Background: How System Calls Work",
        englishPdf:
          "https://github.com/remzi-arpacidusseau/ostep-projects/blob/master/initial-xv6/background.md",
      },
      {
        title: "Video Tutorial: Adding a System Call to xv6",
        englishPdf: "https://www.youtube.com/watch?v=vR6z2QGcoo8",
      },
      {
        title:
          "Note: OSTEP projects target x86 xv6-public, adapt for xv6-riscv",
        englishPdf: "https://github.com/mit-pdos/xv6-riscv",
      },
    ],
    section: "lab1",
    isLab: true,
    description:
      "Implement getreadcount() system call. Note: OSTEP examples use x86 xv6-public, but course uses xv6-riscv.",
  },

  // H.2: CPU scheduling, Virtual memory
  {
    id: "cpu-scheduling",
    title: "CPU Scheduling",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/4-sched.pdf",
    pdfs: [
      {
        title: "CPU Scheduling",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/07-cpu-sched.pdf",
      },
      {
        title: "Multi-level Feedback",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/08-cpu-sched-mlfq.pdf",
      },
    ],
    section: "lab2",
  },
  {
    id: "virtual-memory",
    title: "Virtual Memory",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/5-vm.pdf",
    pdfs: [
      {
        title: "Address Spaces",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/13-vm-intro.pdf",
      },
      {
        title: "Memory API",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-api.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/14-vm-api.pdf",
      },
      {
        title: "Address Translation",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-mechanism.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/15-vm-mechanism.pdf",
      },
      {
        title: "Segmentation",
        englishPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/16-vm-segmentation.pdf",
      },
    ],
    section: "lab2",
  },
  {
    id: "lab2-exercises",
    title: "H.2",
    pdfs: [],
    section: "lab2",
    isLab: true,
  },

  // H.3: Paging, Page tables, TLB, Memory mapping
  {
    id: "paging",
    title: "Paging",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/6-paging.pdf",
    pdfs: [
      {
        title: "Introduction to Paging",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/18-vm-paging.pdf",
      },
    ],
    section: "lab3",
  },
  {
    id: "page-tables",
    title: "Page Tables",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/7-pt.pdf",
    pdfs: [
      {
        title: "Advanced Page Tables",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/20_vm-smalltables.pdf",
      },
    ],
    section: "lab3",
  },
  {
    id: "tlb",
    title: "TLB",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/8-tlb.pdf",
    pdfs: [
      {
        title: "Translation Lookaside Buffers",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/19_vm-tlbs.pdf",
      },
    ],
    section: "lab3",
  },
  {
    id: "memory-mapping",
    title: "Memory Mapping",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/9-mmap.pdf",
    pdfs: [],
    section: "lab3",
  },
  {
    id: "lab3-exercises",
    title: "H.3",
    pdfs: [],
    section: "lab3",
    isLab: true,
  },

  // H.4: Swapping, Virtual Memory Implementations, Threads
  {
    id: "swapping",
    title: "Swapping",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/10-swap.pdf",
    pdfs: [
      {
        title: "Swapping: Mechanisms",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/21_vm-beyondphys.pdf",
      },
      {
        title: "Swapping: Policies",
        englishPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/22_vm-beyondphys-policy.pdf",
      },
    ],
    section: "lab4",
  },
  {
    id: "vm-implementations",
    title: "Virtual Memory Implementations",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/11-vmimpl.pdf",
    pdfs: [
      {
        title: "Complete Virtual Memory Systems",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-complete.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/23_vm-vax.pdf",
      },
    ],
    section: "lab4",
  },
  {
    id: "threads",
    title: "Threads",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/12-thread.pdf",
    pdfs: [
      {
        title: "Concurrency and Threads",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/26_threads-intro.pdf",
      },
      {
        title: "Thread API",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/27_threads-api.pdf",
      },
    ],
    section: "lab4",
  },
  {
    id: "lab4-exercises",
    title: "H.4",
    pdfs: [],
    section: "lab4",
    isLab: true,
  },

  // H.5: Locks, Semaphores, Condition variables, HDDs, SSDs
  {
    id: "locks",
    title: "Locks",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/13-lock.pdf",
    pdfs: [
      {
        title: "Locks",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/28_threads-locks.pdf",
      },
    ],
    section: "lab5",
  },
  {
    id: "semaphores",
    title: "Semaphores",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/14-sema.pdf",
    pdfs: [
      {
        title: "Semaphores",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/31_threads-sema.pdf",
      },
    ],
    section: "lab5",
  },
  {
    id: "condition-variables",
    title: "Condition Variables",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/15-cv.pdf",
    pdfs: [
      {
        title: "Condition Variables",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/30_threads-cv.pdf",
      },
    ],
    section: "lab5",
  },
  {
    id: "storage-devices",
    title: "Hard Disk Drives",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/16-hdd.pdf",
    pdfs: [
      {
        title: "I/O Devices",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/36_file-devices.pdf",
      },
      {
        title: "Hard Disk Drives",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/37_file_disks.pdf",
      },
    ],
    section: "lab5",
  },
  {
    id: "ssds",
    title: "Solid State Drives (SSDs)",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/17-ssd.pdf",
    pdfs: [
      {
        title: "Flash-based SSDs",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf",
      },
    ],
    section: "lab5",
  },
  {
    id: "file-systems",
    title: "File Systems",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/18-fs.pdf",
    pdfs: [
      {
        title: "Files and Directories",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf",
        koreanPdf: "39_interlude-file-directory",
      },
    ],
    section: "lab5",
  },
  {
    id: "lab5-exercises",
    title: "H.5",
    pdfs: [],
    section: "lab5",
    isLab: true,
  },
  {
    id: "file-system-implementation",
    title: "File System Implementation",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/19-fsimpl.pdf",
    pdfs: [
      {
        title: "File System Implementation",
        englishPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/40_FS-implementation.pdf",
      },
    ],
    section: "filesystem",
  },
  {
    id: "fast-file-system",
    title: "Fast File System",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/20-ffs.pdf",
    pdfs: [
      {
        title: "Fast File System",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf",
        koreanPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/41_FFS.pdf",
      },
    ],
    section: "filesystem",
  },
  {
    id: "file-system-consistency",
    title: "File System Consistency",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/21-crash.pdf",
    pdfs: [
      {
        title: "FSCK and Journaling",
        englishPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/42_crash-consistency.pdf",
      },
    ],
    section: "filesystem",
  },
];

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getChaptersBySection(section: Chapter["section"]): Chapter[] {
  const sectionChapters = chapters.filter(
    (chapter) => chapter.section === section,
  );

  // Define the desired order of chapters for each section
  const chapterOrder: Record<string, string[]> = {
    lab1: ["intro-os", "arch-support", "processes", "lab1-exercises"],
    lab2: ["cpu-scheduling", "virtual-memory", "lab2-exercises"],
    lab3: ["paging", "page-tables", "tlb", "memory-mapping", "lab3-exercises"],
    lab4: ["swapping", "vm-implementations", "threads", "lab4-exercises"],
    lab5: [
      "locks",
      "semaphores",
      "condition-variables",
      "storage-devices",
      "ssds",
      "file-systems",
      "lab5-exercises",
    ],
    filesystem: [
      "file-system-implementation",
      "fast-file-system",
      "file-system-consistency",
    ],
  };

  const order = chapterOrder[section] || [];

  // Sort chapters according to the defined order, with labs at the end
  return sectionChapters.sort((a, b) => {
    const aIndex = order.indexOf(a.id);
    const bIndex = order.indexOf(b.id);

    // If both chapters are in the order array, use their positions
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // If only one is in the order array, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // For chapters not in the order array, sort labs to the end
    if (a.isLab && !b.isLab) return 1;
    if (!a.isLab && b.isLab) return -1;

    // Fallback to alphabetical order
    return a.title.localeCompare(b.title);
  });
}
