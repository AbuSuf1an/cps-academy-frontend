import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { CoursesTeaser } from '@/components/marketing/CoursesTeaser';
import { CTA } from '@/components/marketing/CTA';
import { Footer } from '@/components/marketing/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CoursesTeaser />
      <CTA />
      <Footer />
    </>
  );
}