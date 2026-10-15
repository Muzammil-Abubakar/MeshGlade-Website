import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectsExplorer } from "@/components/interactive/ProjectsExplorer";
import { CTABand } from "@/components/sections/CTABand";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects — Case Studies & Results",
  description:
    "AI agents, SaaS platforms, RAG assistants, computer vision and growth systems — with the numbers they moved.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Selected work"
        title={["Proof, not", <span key="p" className="text-ember">promises.</span>]}
        intro={
          <>
            <span className="font-display text-5xl tracking-tight text-charcoal">{projects.length}</span>{" "}
            <span>case studies across automation, software, data and growth — each with the number it moved.</span>
          </>
        }
      />
      <section className="pb-16">
        <div className="container-x">
          <ProjectsExplorer projects={projects} />
        </div>
      </section>
      <CTABand title={["Your project", "could be next."]} />
    </>
  );
}
