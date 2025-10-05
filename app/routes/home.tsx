import Navbar from "~/Components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "Constants";
import ResumeCard from "../Components/ResumeCard";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import auth from "./auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Resumind is a tool that helps you analyze your resume and get feedback on your resume." },
  ];
}

export default function Home() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { auth: { isAuthenticated } } = usePuterStore();

  useEffect(() => {
    if(!isAuthenticated) navigate('/auth?next=/');
  }, [isAuthenticated , navigate])
  
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {/* Render ResumeCards if there are resumes */}
        {resumes.length > 0 && (
          <div className="resumes-section">
            {/* Render ResumeCards */}
            {resumes.map((resume) => (
              <div key={resume.id}>
                <ResumeCard key={resume.id} resume={resume} />
              </div>
            ))}
          </div>
        )}
      </section>



    </main>
  );
}
