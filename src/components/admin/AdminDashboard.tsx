"use client";

import Button from "@/components/ui/Button";
import type { Experience, Project } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Tab = "projects" | "experience" | "resume";

interface AdminDashboardProps {
  initialProjects: Project[];
  initialExperience: Experience[];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyProject = (): Project => ({
  id: "",
  name: "",
  description: "",
  tech: [],
  highlights: [],
  featured: false,
  order: 1,
});

const emptyExperience = (): Experience => ({
  id: "",
  company: "",
  role: "",
  date: "",
  location: "",
  tech: [],
  bullets: [],
});

export default function AdminDashboard({
  initialProjects,
  initialExperience,
}: AdminDashboardProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [experience, setExperience] = useState(initialExperience);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [projectForm, setProjectForm] = useState<Project>(emptyProject());
  const [expForm, setExpForm] = useState<Experience>(emptyExperience());
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    const payload = {
      ...projectForm,
      id: projectForm.id || slugify(projectForm.name),
      tech: projectForm.tech,
      highlights: projectForm.highlights,
    };

    const url = editingProjectId
      ? `/api/projects/${editingProjectId}`
      : "/api/projects";
    const method = editingProjectId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Failed to save project.");
      return;
    }

    const saved = (await res.json()) as Project;
    if (editingProjectId) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProjectId ? saved : p)),
      );
    } else {
      setProjects((prev) => [...prev, saved]);
    }
    setProjectForm(emptyProject());
    setEditingProjectId(null);
    setMessage("Project saved.");
    router.refresh();
  }

  async function saveExperienceEntry(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    const payload = {
      ...expForm,
      id: expForm.id || slugify(expForm.company),
      tech: expForm.tech,
      bullets: expForm.bullets,
    };

    const url = editingExpId
      ? `/api/experience/${editingExpId}`
      : "/api/experience";
    const method = editingExpId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Failed to save experience.");
      return;
    }

    const saved = (await res.json()) as Experience;
    if (editingExpId) {
      setExperience((prev) =>
        prev.map((item) => (item.id === editingExpId ? saved : item)),
      );
    } else {
      setExperience((prev) => [saved, ...prev]);
    }
    setExpForm(emptyExperience());
    setEditingExpId(null);
    setMessage("Experience saved.");
    router.refresh();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setMessage("Project deleted.");
      router.refresh();
    }
  }

  async function deleteExperience(id: string) {
    if (!confirm("Delete this experience entry?")) return;
    const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
    if (res.ok) {
      setExperience((prev) => prev.filter((e) => e.id !== id));
      setMessage("Experience deleted.");
      router.refresh();
    }
  }

  function editProject(p: Project) {
    setProjectForm(p);
    setEditingProjectId(p.id);
    setTab("projects");
  }

  function editExperienceEntry(e: Experience) {
    setExpForm(e);
    setEditingExpId(e.id);
    setTab("experience");
  }

  async function uploadResume(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!resumeFile) {
      setError("Choose a PDF resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    setIsUploadingResume(true);
    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    });
    setIsUploadingResume(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Failed to upload resume.");
      return;
    }

    setResumeFile(null);
    setMessage("Resume uploaded.");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-beige bg-foam px-3 py-2 text-sm text-espresso outline-none focus:border-caramel";

  return (
    <div className="mx-auto max-w-4xl px-6 py-28">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-espresso">Content dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Button href="/" variant="secondary">
            View site
          </Button>
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>

      {message && (
        <p className="mb-4 rounded-xl bg-foam px-4 py-2 text-sm text-caramel-deep">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mb-6 flex gap-2">
        {(["projects", "experience", "resume"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "bg-caramel text-steamed"
                : "border border-beige bg-steamed text-mocha hover:text-espresso"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "projects" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form
            onSubmit={saveProject}
            className="rounded-2xl border border-beige bg-steamed p-6 shadow-warm"
          >
            <h2 className="font-serif text-lg text-espresso">
              {editingProjectId ? "Edit project" : "Add project"}
            </h2>
            <div className="mt-4 space-y-3">
              <input
                className={inputClass}
                placeholder="Name"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="ID (auto from name if empty)"
                value={projectForm.id}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, id: e.target.value })
                }
              />
              <textarea
                className={inputClass}
                rows={3}
                placeholder="Description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="Tech (comma-separated)"
                value={projectForm.tech.join(", ")}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    tech: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
              <input
                className={inputClass}
                placeholder="Highlights (comma-separated)"
                value={projectForm.highlights.join(", ")}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    highlights: e.target.value
                      .split(",")
                      .map((s) => s.trim()),
                  })
                }
              />
              <input
                className={inputClass}
                placeholder="GitHub URL"
                value={projectForm.githubUrl ?? ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    githubUrl: e.target.value || undefined,
                  })
                }
              />
              <input
                className={inputClass}
                placeholder="Live URL"
                value={projectForm.liveUrl ?? ""}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    liveUrl: e.target.value || undefined,
                  })
                }
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-mocha">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        featured: e.target.checked,
                      })
                    }
                  />
                  Featured
                </label>
                <input
                  className={`${inputClass} w-24`}
                  type="number"
                  placeholder="Order"
                  value={projectForm.order}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      order: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="submit" variant="primary">
                {editingProjectId ? "Update" : "Add"} project
              </Button>
              {editingProjectId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setProjectForm(emptyProject());
                    setEditingProjectId(null);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          <ul className="space-y-3">
            {projects.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-beige bg-foam p-4"
              >
                <p className="font-medium text-espresso">{p.name}</p>
                <p className="mt-1 text-xs text-mocha">{p.id}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => editProject(p)}
                    className="text-sm text-caramel hover:text-caramel-deep"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProject(p.id)}
                    className="text-sm text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "experience" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form
            onSubmit={saveExperienceEntry}
            className="rounded-2xl border border-beige bg-steamed p-6 shadow-warm"
          >
            <h2 className="font-serif text-lg text-espresso">
              {editingExpId ? "Edit experience" : "Add experience"}
            </h2>
            <div className="mt-4 space-y-3">
              <input
                className={inputClass}
                placeholder="Company"
                value={expForm.company}
                onChange={(e) =>
                  setExpForm({ ...expForm, company: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="Role"
                value={expForm.role}
                onChange={(e) =>
                  setExpForm({ ...expForm, role: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="ID (auto from company if empty)"
                value={expForm.id}
                onChange={(e) =>
                  setExpForm({ ...expForm, id: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="Date"
                value={expForm.date}
                onChange={(e) =>
                  setExpForm({ ...expForm, date: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="Location"
                value={expForm.location}
                onChange={(e) =>
                  setExpForm({ ...expForm, location: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="Tech (comma-separated)"
                value={expForm.tech.join(", ")}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    tech: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Bullets (one per line)"
                value={expForm.bullets.join("\n")}
                onChange={(e) =>
                  setExpForm({
                    ...expForm,
                    bullets: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="submit" variant="primary">
                {editingExpId ? "Update" : "Add"} experience
              </Button>
              {editingExpId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setExpForm(emptyExperience());
                    setEditingExpId(null);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          <ul className="space-y-3">
            {experience.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-beige bg-foam p-4"
              >
                <p className="font-medium text-espresso">{item.company}</p>
                <p className="text-sm text-mocha">{item.role}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => editExperienceEntry(item)}
                    className="text-sm text-caramel hover:text-caramel-deep"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteExperience(item.id)}
                    className="text-sm text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "resume" && (
        <form
          onSubmit={uploadResume}
          className="max-w-xl rounded-2xl border border-beige bg-steamed p-6 shadow-warm"
        >
          <h2 className="font-serif text-lg text-espresso">Replace resume</h2>
          <p className="mt-2 text-sm leading-relaxed text-mocha">
            Upload a PDF to replace the resume shown on the public site. In
            production this is saved to Netlify Blobs, with Upstash as an
            optional fallback for non-Netlify deployments.
          </p>

          <div className="mt-5 space-y-3">
            <input
              className={inputClass}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            />
            {resumeFile && (
              <p className="text-xs text-mocha">
                Selected: {resumeFile.name}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={isUploadingResume}
            >
              {isUploadingResume ? "Uploading..." : "Upload resume"}
            </Button>
            <Button href="/api/resume" variant="secondary" external>
              Open current resume
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
