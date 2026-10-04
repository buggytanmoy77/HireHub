import ResumeHero from "./resumeHero";
import TrendingJobs from "./trendingJobs";
import "./home.css";

// Home doubles as the dashboard: personalized resume flow on top,
// resume-independent trending jobs below.
export default function Home() {
  return (
    <>
      <ResumeHero />
      <TrendingJobs />
    </>
  );
}
