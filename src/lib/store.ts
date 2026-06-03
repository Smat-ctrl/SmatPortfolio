import { experiences as defaultExperience } from "@/data/experience";
import { projects as defaultProjects } from "@/data/projects";
import type { Experience, Project } from "@/types";
import { promises as fs } from "fs";
import path from "path";

const STORE_KEY = "portfolio:data";
const LOCAL_PATH = path.join(process.cwd(), "content", "portfolio.json");

export interface PortfolioData {
  projects: Project[];
  experience: Experience[];
}

function getSeedData(): PortfolioData {
  return {
    projects: defaultProjects,
    experience: defaultExperience,
  };
}

async function readFromUpstash(): Promise<PortfolioData | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/get/${STORE_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { result: string | null };
  if (!json.result) return null;
  return JSON.parse(json.result) as PortfolioData;
}

async function writeToUpstash(data: PortfolioData): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  const res = await fetch(`${url}/set/${STORE_KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(JSON.stringify(data)),
  });

  return res.ok;
}

async function readFromFile(): Promise<PortfolioData | null> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, "utf-8");
    return JSON.parse(raw) as PortfolioData;
  } catch {
    return null;
  }
}

async function writeToFile(data: PortfolioData): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const upstash = await readFromUpstash();
  if (upstash) return upstash;

  const file = await readFromFile();
  if (file) return file;

  return getSeedData();
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const upstashOk = await writeToUpstash(data);
  if (upstashOk) return;

  try {
    await writeToFile(data);
  } catch {
    throw new Error(
      "Could not save data. In production, set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
    );
  }
}

export async function getProjects(): Promise<Project[]> {
  const data = await getPortfolioData();
  return data.projects;
}

export async function getExperience(): Promise<Experience[]> {
  const data = await getPortfolioData();
  return data.experience;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  const data = await getPortfolioData();
  await savePortfolioData({ ...data, projects });
}

export async function saveExperience(experience: Experience[]): Promise<void> {
  const data = await getPortfolioData();
  await savePortfolioData({ ...data, experience });
}
