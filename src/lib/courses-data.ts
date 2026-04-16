/**
 * Shared course data for checkout and course listing.
 * Use slug in URL: /checkout?course=arabic-calligraphy-illustrator
 */

export interface CourseModule {
  title: string;
  items: string[];
}

export interface CourseItem {
  id: number;
  slug: string;
  title: string;
  tag: string;
  fee: string;
  image: string;
  description?: string;
  /** Rich display (courses page, home) */
  tagColor?: string;
  level?: string;
  weeks?: string;
  lessons?: string;
  students?: string;
  rating?: string;
  skills?: string[];
  tools?: string;
  modules?: CourseModule[];
}

export const COURSES: CourseItem[] = [
  {
    id: 1,
    slug: "arabic-calligraphy-illustrator",
    title: "Modern Arabic Calligraphy in Illustrator",
    tag: "Recorded",
    tagColor: "#7fbf2f",
    fee: "Rs. 7,000",
    image: "/images/DSC02365.JPG",
    description:
      "Master modern Arabic calligraphy using Adobe Illustrator on PC with mouse workflow. Learn Wisam script and Kufic styles to create professional logos, structured compositions, and brand visuals — no iPad or Procreate required.",
    level: "Beginner",
    weeks: "2 Months",
    lessons: "24+ Lessons",
    students: "Enrolling now",
    rating: "New",
    tools: "PC + Adobe Illustrator",
    skills: [
      "Wisam Script Mastery",
      "Kufic Calligraphy",
      "Adobe Illustrator Workflow",
      "Mouse-Based Calligraphy",
      "Logo Design & Branding",
    ],
    modules: [
      {
        title: "Module 1: Adobe Illustrator Workflow (Foundation)",
        items: [
          "Introduction to Illustrator for calligraphy",
          "Workspace setup for precision work",
          "Understanding Pen Tool (Bezier curves)",
          "Anchor points control & smooth curves",
          "Pathfinder & Shape Builder tools",
          "Creating clean vector strokes (mouse-based technique)",
        ],
      },
      {
        title: "Module 2: Mouse-Based Calligraphy Techniques",
        items: [
          "How to simulate calligraphy without pen",
          "Stroke building using shapes & paths",
          "Curve correction & smoothness techniques",
          "Line consistency & thickness control",
          "Professional vector workflow for calligraphy",
        ],
      },
      {
        title: "Module 3: Wisam Script Mastery",
        items: [
          "Structure of Wisam script (modern flow)",
          "Full alphabet construction in Illustrator",
          "Letter proportions & balance",
          "Letter joining rules & flow creation",
          "Word composition techniques",
          "Advanced stylistic variations",
        ],
      },
      {
        title: "Module 4: Kufic Calligraphy (Geometric Design)",
        items: [
          "Basics of Kufic script structure",
          "Grid system creation in Illustrator",
          "Square Kufic design techniques",
          "Geometric precision & alignment",
          "Modern Kufic compositions for branding",
        ],
      },
      {
        title: "Module 5: Logo Design & Branding",
        items: [
          "Principles of Arabic logo design",
          "Converting calligraphy into logotypes",
          "Combining Wisam & Kufic styles",
          "Brand-focused design thinking",
          "Client-based logo project workflow",
          "Creating scalable vector logos",
        ],
      },
      {
        title: "Module 6: Final Composition & Portfolio",
        items: [
          "Layout & composition principles",
          "Creating complete brand visuals",
          "Final logo & artwork projects",
          "Presentation techniques (mockups, portfolio)",
          "Exporting professional files (AI, SVG, PNG)",
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): CourseItem | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCourseById(id: number): CourseItem | undefined {
  return COURSES.find((c) => c.id === id);
}
