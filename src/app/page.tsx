import Hero from "@/sections/Hero";

// scope.md IA §01 "Hero" — the homepage. As of 2026-08-25 the site is
// split into real routes (/about, /work, /experience, /contact) instead of
// one page with anchor scrolling; Hero is the only section that stays at
// "/". See src/app/{about,work,experience,contact}/page.tsx for the rest.
export default function Home() {
  return <Hero />;
}
