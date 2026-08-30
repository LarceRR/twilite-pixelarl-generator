export type ProjectStatus = "draft" | "review" | "published";
export type ProjectKind = "good" | "bad";

export type Project = {
  id: string;
  title: string;
  kind: ProjectKind;
  status: ProjectStatus;
  lastEdited: string;
  frames: number;
  progress: number;
  preview: "ember" | "cafe" | "moon" | "cloud";
};

export const statusLabels: Record<ProjectStatus, string> = {
  draft: "Черновик",
  review: "На проверке",
  published: "Опубликован",
};

export const kindLabels: Record<ProjectKind, string> = {
  good: "Good moment",
  bad: "Bad moment",
};

export const initialProjects: Project[] = [
  {
    id: "quiet-evening",
    title: "Тихий вечер",
    kind: "good",
    status: "published",
    lastEdited: "12 минут назад",
    frames: 8,
    progress: 100,
    preview: "moon",
  },
  {
    id: "restaurant",
    title: "Ресторан",
    kind: "good",
    status: "review",
    lastEdited: "2 часа назад",
    frames: 6,
    progress: 78,
    preview: "cafe",
  },
  {
    id: "first-ember",
    title: "Первый огонёк",
    kind: "bad",
    status: "draft",
    lastEdited: "вчера",
    frames: 1,
    progress: 42,
    preview: "ember",
  },
  {
    id: "new-dawn",
    title: "Новый рассвет",
    kind: "good",
    status: "draft",
    lastEdited: "3 дня назад",
    frames: 4,
    progress: 64,
    preview: "cloud",
  },
];
