import type { Chapter } from "../../types";
import { isLab } from "../../types";

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
    resources: [
      {
        title: "Goal & Description",
        titleKo: "목표 및 설명",
        link: "https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/initial-xv6",
      },
      {
        title: "How to Install & Run xv6-riscv",
        titleKo: "xv6-riscv 설치 및 실행 방법",
        link: "https://github.com/snu-csl/os-pa1",
      },
      {
        title: "Background: How System Calls Work",
        titleKo: "배경 지식: 시스템 콜 동작 방식",
        link: "https://github.com/remzi-arpacidusseau/ostep-projects/blob/master/initial-xv6/background.md",
      },
      {
        title: "Video Tutorial: Adding a System Call to xv6",
        titleKo: "비디오 튜토리얼: xv6에 시스템 콜 추가하기",
        link: "https://www.youtube.com/watch?v=vR6z2QGcoo8",
      },
      {
        title: "How to Adapt ostep-projects' Test Cases to xv6-riscv",
        titleKo: "ostep-projects 테스트 케이스를 xv6-riscv에 적용하는 방법",
        link: "https://github.com/remzi-arpacidusseau/ostep-projects/commit/7d9e53fedcc97038809f27b98e7e5298fb99d563?w=1",
      },
    ],
    section: "lab1",
    isLab: true,
    description: `Implement a new system call getreadcount() in xv6 that tracks and returns the total number of read() system calls made since kernel boot.

Key Implementation Requirements

- Function signature: int getreadcount(void); (uint64 if you want)
- Functionality: Return a counter that increments every time any process calls read()
- Approach: Find similar existing system calls (like getpid()) and use them as templates

Development Strategy

- Most time spent understanding existing code rather than writing new code
- Copy/modify similar existing implementations rather than starting from scratch

Testing

- Test script: ./test-getreadcounts.sh
- Every test code assumes your project is based on xv6-public(x86).
  If you want to run provided script, you should patch your test code. See last resource."
- Tests assume xv6 source code is in src/ directory
- Optional -s flag to skip repeated builds`,
    descriptionKo: `xv6에서 커널 부팅 이후 호출된 read() 시스템 콜의 총 개수를 추적하고 반환하는 새로운 시스템 콜 getreadcount()를 구현합니다.

주요 구현 요구사항

- 함수 시그니처: int getreadcount(void); (원하면 uint64)
- 기능: 프로세스가 read()를 호출할 때마다 증가하는 카운터를 반환
- 접근 방법: 기존 시스템 콜(getpid() 등)을 템플릿으로 활용

개발 전략

- 새로운 코드 작성보다는 기존 코드를 이해하는 데 대부분의 시간을 투자
- 처음부터 작성하기보다는 유사한 기존 구현을 복사/수정

테스팅

- 테스트 스크립트: ./test-getreadcounts.sh
- 모든 테스트 코드는 xv6-public(x86) 기반으로 작성됨.
  제공된 스크립트를 실행하려면 테스트 코드를 패치해야 함. 마지막 자료 참조.
- 테스트는 xv6 소스 코드가 src/ 디렉토리에 있다고 가정
- 반복 빌드를 건너뛰는 -s 플래그 옵션`,
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
      {
        title: "Scheduling: Proportional Share",
        englishPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf",
        koreanPdf: "https://pages.cs.wisc.edu/~remzi/OSTEP/Korean/09-cpu-sched-lottery.pdf",
      }
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
    section: "lab2",
    isLab: true,
    resources: [
      {
        title: "Goal & Description",
        titleKo: "목표 및 설명",
        link: "https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/scheduling-xv6-lottery",
      },
    ],
    description: `Main Objectives:

- Modify xv6 kernel to use lottery scheduling instead of round-robin
- Implement proportional CPU allocation based on process tickets
- Create system calls for ticket management and process monitoring

Key Implementation Requirements:

1. System Calls:
  - settickets(int number) - Sets process ticket count (default: 1 ticket)
  - getpinfo(struct pstat *) - Returns scheduling statistics
2. Scheduler Logic:
  - Randomly select processes to run based on ticket probability
  - Processes with more tickets get proportionally more CPU time
  - Child processes inherit parent's ticket count
  - Implement pseudo-random number generation in kernel
3. Process Tracking:
  - Track process IDs, ticket counts, and accumulated CPU ticks
  - Use pstat structure for statistics collection
4. Performance Demonstration:
  - Create graph showing 3:2:1 ticket ratio results in proportional CPU allocation
`,
    descriptionKo: `주요 목표:

- xv6 커널을 라운드로빈 대신 복권 스케줄링을 사용하도록 수정
- 프로세스 티켓을 기반으로 한 비례적 CPU 할당 구현
- 티켓 관리 및 프로세스 모니터링을 위한 시스템 콜 생성

주요 구현 요구사항:

1. 시스템 콜:
  - settickets(int number) - 프로세스 티켓 수 설정 (기본값: 1 티켓)
  - getpinfo(struct pstat *) - 스케줄링 통계 반환
2. 스케줄러 로직:
  - 티켓 확률을 기반으로 실행할 프로세스를 무작위 선택
  - 더 많은 티켓을 가진 프로세스가 비례적으로 더 많은 CPU 시간 획득
  - 자식 프로세스는 부모의 티켓 수를 상속
  - 커널에서 의사 난수 생성 구현
3. 프로세스 추적:
  - 프로세스 ID, 티켓 수, 누적된 CPU 틱 추적
  - 통계 수집을 위한 pstat 구조체 사용
4. 성능 시연:
  - 3:2:1 티켓 비율이 비례적 CPU 할당으로 이어지는 그래프 생성
`,
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
    section: "lab3",
    isLab: true,
    resources: [
      {
        title: "Goal & Description",
        titleKo: "목표 및 설명",
        link: "https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/vm-xv6-intro",
      },
    ],
    description: `Main Objectives:

- Enhance xv6's virtual memory system with basic protection features
- Implement null-pointer dereference detection
- Add read-only code protection capabilities

Key Implementation Requirements:

1. Null-Pointer Protection:
  - Make the first page of memory (page 0) invalid
  - Cause exceptions when programs dereference null pointers
  - Modify address space creation and initialization
2. Memory Protection System Calls:
  - mprotect(void *addr, int len) - Mark memory region as read-only
  - munprotect(void *addr, int len) - Restore read-write permissions
  - Handle error cases (unaligned addresses, invalid regions, bad lengths)
3. Process Management:
  - Inherit page protections during fork()
  - Ensure illegal memory accesses trap and terminate processes
  - Update hardware page tables using lcr3()`,
    descriptionKo: `주요 목표:

- xv6의 가상 메모리 시스템에 기본적인 보호 기능 추가
- null 포인터 역참조 감지 구현
- 읽기 전용 코드 보호 기능 추가

주요 구현 요구사항:

1. Null 포인터 보호:
  - 메모리의 첫 번째 페이지(페이지 0)를 무효화
  - 프로그램이 null 포인터를 역참조할 때 예외 발생
  - 주소 공간 생성 및 초기화 수정
2. 메모리 보호 시스템 콜:
  - mprotect(void *addr, int len) - 메모리 영역을 읽기 전용으로 표시
  - munprotect(void *addr, int len) - 읽기/쓰기 권한 복원
  - 오류 케이스 처리 (정렬되지 않은 주소, 잘못된 영역, 잘못된 길이)
3. 프로세스 관리:
  - fork() 중 페이지 보호 상속
  - 불법적인 메모리 접근 시 트랩 발생 및 프로세스 종료 보장
  - lcr3()를 사용한 하드웨어 페이지 테이블 업데이트`,
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
    if (isLab(a) && !isLab(b)) return 1;
    if (!isLab(a) && isLab(b)) return -1;

    // Fallback to alphabetical order
    return a.title.localeCompare(b.title);
  });
}
