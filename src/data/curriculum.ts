import type { Chapter } from "../types";

export const chapters: Chapter[] = [
  // Lab #1: Course overview, Introduction to OS, Architectural support, Processes
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
    order: 1,
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
    order: 2,
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
    order: 3,
  },

  // Lab #2: CPU scheduling, Virtual memory
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
    order: 4,
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
    order: 5,
  },

  // Lab #3: Paging, Page tables, TLB, Memory mapping
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
    order: 6,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/20-vm-smalltables.pdf",
      },
    ],
    section: "lab3",
    order: 7,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/19-vm-tlbs.pdf",
      },
    ],
    section: "lab3",
    order: 8,
  },
  {
    id: "memory-mapping",
    title: "Memory Mapping",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/9-mmap.pdf",
    pdfs: [],
    section: "lab3",
    order: 9,
  },

  // Lab #4: Swapping, Virtual Memory Implementations, Threads
  {
    id: "swapping",
    title: "Swapping",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/10-swap.pdf",
    pdfs: [
      {
        title: "Swapping: Mechanisms",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/21-vm-beyondphys.pdf",
      },
      {
        title: "Swapping: Policies",
        englishPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/22-vm-beyondphys-policy.pdf",
      },
    ],
    section: "lab4",
    order: 10,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/23-vm-complete.pdf",
      },
    ],
    section: "lab4",
    order: 11,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/26-threads-intro.pdf",
      },
      {
        title: "Thread API",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/27-threads-api.pdf",
      },
    ],
    section: "lab4",
    order: 12,
  },

  // Lab #5: Locks, Semaphores, Condition variables, HDDs, SSDs
  {
    id: "locks",
    title: "Locks",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/13-lock.pdf",
    pdfs: [
      {
        title: "Locks",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/28-threads-locks.pdf",
      },
    ],
    section: "lab5",
    order: 13,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/31-threads-sema.pdf",
      },
    ],
    section: "lab5",
    order: 14,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/30-threads-cv.pdf",
      },
    ],
    section: "lab5",
    order: 15,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/36-file-devices.pdf",
      },
      {
        title: "Hard Disk Drives",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/37-file-disks.pdf",
      },
    ],
    section: "lab5",
    order: 16,
  },
  {
    id: "ssds",
    title: "Solid State Drives (SSDs)",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/17-ssd.pdf",
    pdfs: [
      {
        title: "Flash-based SSDs",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/44-file-ssd.pdf",
      },
    ],
    section: "lab5",
    order: 17,
  },

  // File System (no lab)
  {
    id: "file-systems",
    title: "File Systems",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/18-fs.pdf",
    pdfs: [
      {
        title: "Files and Directories",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/39-file-intro.pdf",
      },
    ],
    section: "filesystem",
    order: 18,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/40-file-implementation.pdf",
      },
    ],
    section: "filesystem",
    order: 19,
  },
  {
    id: "fast-file-system",
    title: "Fast File System",
    lectureSlide: "http://csl.snu.ac.kr/courses/4190.307/2020-1/20-ffs.pdf",
    pdfs: [
      {
        title: "Fast File System",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf",
        koreanPdf:
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/41-file-ffs.pdf",
      },
    ],
    section: "filesystem",
    order: 20,
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
          "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/42-file-journaling.pdf",
      },
    ],
    section: "filesystem",
    order: 21,
  },
];

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getChaptersBySection(section: Chapter["section"]): Chapter[] {
  return chapters.filter((chapter) => chapter.section === section);
}
