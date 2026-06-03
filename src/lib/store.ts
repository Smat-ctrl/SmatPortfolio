import { getStore } from "@netlify/blobs";
import { experiences as defaultExperience } from "@/data/experience";
import { projects as defaultProjects } from "@/data/projects";
import type { Experience, Project } from "@/types";
import { promises as fs } from "fs";
import path from "path";

const STORE_KEY = "portfolio:data";
const RESUME_KEY = "portfolio:resume";
const BLOB_STORE = "portfolio-admin";
const LOCAL_PATH = path.join(process.cwd(), "content", "portfolio.json");
const LOCAL_RESUME_PATH = path.join(process.cwd(), "public", "resume.pdf");
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_NETLIFY = Boolean(process.env.NETLIFY);

export interface PortfolioData {
  projects: Project[];
  experience: Experience[];
}

export interface ResumeFile {
  data: string;
  contentType: string;
  filename: string;
  updatedAt: string;
}

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return {
    url: url.replace(/\/$/, ""),
    token,
  };
}

function getSeedData(): PortfolioData {
  return {
    projects: defaultProjects,
    experience: defaultExperience,
  };
}

function getNetlifyStore() {
  if (!IS_NETLIFY) return null;
  return getStore(BLOB_STORE);
}

async function getBlobValue(key: string): Promise<string | null> {
  const store = getNetlifyStore();
  if (!store) return null;
  return store.get(key, { type: "text", consistency: "strong" });
}

async function setBlobValue(key: string, value: string): Promise<boolean> {
  const store = getNetlifyStore();
  if (!store) return false;
  await store.set(key, value);
  return true;
}

async function getUpstashValue(key: string): Promise<string | null> {
  const config = getUpstashConfig();
  if (!config) return null;

  const res = await fetch(`${config.url}/get/${key}`, {
    headers: { Authorization: `Bearer ${config.token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Upstash read failed (${res.status}). Check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.${detail ? ` ${detail}` : ""}`,
    );
  }

  const json = (await res.json()) as { result: string | null };
  return json.result;
}

async function setUpstashValue(key: string, value: string): Promise<boolean> {
  const config = getUpstashConfig();
  if (!config) return false;

  const res = await fetch(`${config.url}/set/${key}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "text/plain",
    },
    body: value,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `Upstash write failed (${res.status}). Check UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.${detail ? ` ${detail}` : ""}`,
    );
  }

  return true;
}

async function readFromUpstash(): Promise<PortfolioData | null> {
  const value = await getUpstashValue(STORE_KEY);
  if (!value) return null;
  return JSON.parse(value) as PortfolioData;
}

async function writeToUpstash(data: PortfolioData): Promise<boolean> {
  return setUpstashValue(STORE_KEY, JSON.stringify(data));
}

async function readFromBlobStore(): Promise<PortfolioData | null> {
  const value = await getBlobValue(STORE_KEY);
  if (!value) return null;
  return JSON.parse(value) as PortfolioData;
}

async function writeToBlobStore(data: PortfolioData): Promise<boolean> {
  return setBlobValue(STORE_KEY, JSON.stringify(data));
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
  const blob = await readFromBlobStore().catch((error) => {
    console.error("Could not read portfolio data from Netlify Blobs:", error);
    return null;
  });
  if (blob) return blob;

  const upstash = await readFromUpstash().catch((error) => {
    console.error("Could not read portfolio data from Upstash:", error);
    return null;
  });
  if (upstash) return upstash;

  const file = await readFromFile();
  if (file) return file;

  return getSeedData();
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const blobOk = await writeToBlobStore(data);
  if (blobOk) return;

  const upstashOk = await writeToUpstash(data);
  if (upstashOk) return;

  if (IS_PRODUCTION) {
    throw new Error(
      "Production edits require Netlify Blobs or UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
    );
  }

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

export async function getResumeFile(): Promise<ResumeFile> {
  const blobValue = await getBlobValue(RESUME_KEY).catch((error) => {
    console.error("Could not read resume from Netlify Blobs:", error);
    return null;
  });
  if (blobValue) return JSON.parse(blobValue) as ResumeFile;

  const upstashValue = await getUpstashValue(RESUME_KEY).catch((error) => {
    console.error("Could not read resume from Upstash:", error);
    return null;
  });
  if (upstashValue) return JSON.parse(upstashValue) as ResumeFile;

  const data = await fs.readFile(LOCAL_RESUME_PATH);
  return {
    data: data.toString("base64"),
    contentType: "application/pdf",
    filename: "resume.pdf",
    updatedAt: new Date(0).toISOString(),
  };
}

export async function saveResumeFile(file: ResumeFile): Promise<void> {
  const blobOk = await setBlobValue(RESUME_KEY, JSON.stringify(file));
  if (blobOk) return;

  const upstashOk = await setUpstashValue(RESUME_KEY, JSON.stringify(file));
  if (upstashOk) return;

  if (IS_PRODUCTION) {
    throw new Error(
      "Production resume uploads require Netlify Blobs or UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.",
    );
  }

  await fs.writeFile(LOCAL_RESUME_PATH, Buffer.from(file.data, "base64"));
}
