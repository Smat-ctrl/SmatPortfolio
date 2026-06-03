import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAuthenticated } from "@/lib/auth";
import { getExperience, getProjects } from "@/lib/store";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const [projects, experience] = await Promise.all([
    getProjects(),
    getExperience(),
  ]);

  return (
    <AdminDashboard
      initialProjects={projects}
      initialExperience={experience}
    />
  );
}
