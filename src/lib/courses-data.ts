/**
 * Shared course data for checkout and course listing.
 * Use slug in URL: /checkout?course=digital-calligraphy
 */

export interface CourseItem {
  id: number;
  slug: string;
  title: string;
  tag: string;
  fee: string;
  image: string;
  description?: string;
}

export const COURSES: CourseItem[] = [
  { id: 1, slug: "digital-calligraphy", title: "Digital Digital Calligraphy", tag: "Recorded", fee: "Rs. 5,000", image: "/images/DSC02365.JPG", description: "Master the ancient art of Arabic lettering with modern digital tools." },
  { id: 2, slug: "graphic-designing", title: "Graphic Designing", tag: "Recorded", fee: "Rs. 5,000", image: "/images/DSC02366.JPG", description: "Create visually compelling design systems using industry-standard tools." },
  { id: 3, slug: "bilingual-brand-identity", title: "Bilingual Brand Identity", tag: "Live", fee: "Rs. 5,000", image: "/images/DSC02367.JPG", description: "Craft cohesive brand identities that speak across Arabic and Latin scripts." },
  { id: 4, slug: "social-media-design", title: "Social Media Design", tag: "Upcoming", fee: "Rs. 5,000", image: "/images/DSC02368.JPG", description: "Design scroll-stopping content for Instagram, Facebook, and YouTube." },
  { id: 5, slug: "print-media-mastery", title: "Print Media Mastery", tag: "Live", fee: "Rs. 5,000", image: "/images/DSC02368.JPG", description: "Turn ideas into print-ready artwork. Packaging, posters, brochures." },
];

export function getCourseBySlug(slug: string): CourseItem | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCourseById(id: number): CourseItem | undefined {
  return COURSES.find((c) => c.id === id);
}
