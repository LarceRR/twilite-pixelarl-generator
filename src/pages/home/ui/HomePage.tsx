import { useMemo, useState } from "react";
import type { Project, ProjectKind, ProjectStatus } from "../model/mocks";
import {
  initialProjects,
  kindLabels,
  statusLabels,
} from "../model/mocks";
import "./HomePage.scss";

type Filter = "all" | ProjectStatus;

const filterLabels: Record<Filter, string> = {
  all: "Все",
  draft: "Черновики",
  review: "На проверке",
  published: "Опубликовано",
};

const getFrameLabel = (frames: number) => {
  if (frames === 1) return "1 кадр";
  if (frames > 1 && frames < 5) return `${frames} кадра`;
  return `${frames} кадров`;
};

function Preview({ type, title }: { type: Project["preview"]; title: string }) {
  return (
    <div className={`project-preview project-preview--${type}`} aria-label={`Превью: ${title}`}>
      <span className="preview-pixel preview-pixel--one" />
      <span className="preview-pixel preview-pixel--two" />
      <span className="preview-pixel preview-pixel--three" />
      <span className="preview-pixel preview-pixel--four" />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__visual">
        <span className={`status-badge status-badge--${project.status}`}>
          {statusLabels[project.status]}
        </span>
        <Preview type={project.preview} title={project.title} />
      </div>
      <div className="project-card__body">
        <div className="project-card__heading">
          <h3>{project.title}</h3>
          <button className="icon-button icon-button--subtle" aria-label={`Действия: ${project.title}`}>
            ⋯
          </button>
        </div>
        <div className="project-card__meta">
          <span>{kindLabels[project.kind]}</span>
          <span>{project.lastEdited}</span>
        </div>
        <div className="project-card__footer">
          <span>{getFrameLabel(project.frames)}</span>
          <span>{project.progress}% готово</span>
        </div>
        <div className="progress" aria-label={`Готовность ${project.progress}%`}>
          <span style={{ width: `${project.progress}%` }} />
        </div>
      </div>
    </article>
  );
}

function CreatePanel({ onCreate }: { onCreate: (kind: ProjectKind) => void }) {
  return (
    <div className="create-panel" role="dialog" aria-label="Создать объект">
      <div>
        <span className="eyebrow">новая работа</span>
        <h2>Какой момент собираем?</h2>
        <p>Тип объекта определит контекст и набор подсказок в редакторе.</p>
      </div>
      <div className="create-panel__actions">
        <button className="type-choice type-choice--good" onClick={() => onCreate("good")}>
          <span>✦</span>
          <strong>Good moment</strong>
          <small>Светлое событие</small>
        </button>
        <button className="type-choice type-choice--bad" onClick={() => onCreate("bad")}>
          <span>◒</span>
          <strong>Bad moment</strong>
          <small>Сложный момент</small>
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "all" || project.status === filter;
      const matchesQuery = !normalizedQuery || project.title.toLocaleLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, projects, query]);

  const handleCreate = (kind: ProjectKind) => {
    const newProject: Project = {
      id: `new-${Date.now()}`,
      title: kind === "good" ? "Новый good moment" : "Новый bad moment",
      kind,
      status: "draft",
      lastEdited: "только что",
      frames: 1,
      progress: 8,
      preview: kind === "good" ? "moon" : "ember",
    };
    setProjects((current) => [newProject, ...current]);
    setIsCreateOpen(false);
    setFilter("all");
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div>
          <span className="eyebrow">creator workspace · 30.08.26</span>
          <h1>Момент,<br /><em>собранный</em> в объект.</h1>
          <p>Загружайте исходник, доводите пиксельные детали и отправляйте готовую работу в каталог Twilite.</p>
        </div>
        <button className="button button--primary" onClick={() => setIsCreateOpen((open) => !open)} aria-expanded={isCreateOpen}>
          <span>＋</span> Создать объект
        </button>
      </section>

      {isCreateOpen && <CreatePanel onCreate={handleCreate} />}

      <section className="stats-row" aria-label="Сводка проектов">
        <div className="stat"><strong>{projects.length}</strong><span>Все проекты</span><small>+2 за неделю</small></div>
        <div className="stat"><strong>{projects.filter((project) => project.status === "draft").length}</strong><span>Черновики</span></div>
        <div className="stat"><strong>{projects.filter((project) => project.status === "review").length}</strong><span>На проверке</span></div>
        <div className="stat"><strong>{projects.filter((project) => project.status === "published").length}</strong><span>Опубликовано</span><small>41 использование</small></div>
      </section>

      <section className="projects-section" aria-labelledby="projects-title">
        <div className="section-heading">
          <div><span className="eyebrow">library</span><h2 id="projects-title">Последние работы</h2></div>
          <a href="#all-projects">Открыть все <span>↗</span></a>
        </div>
        <div className="projects-toolbar">
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по проектам" aria-label="Поиск по проектам" />
          </label>
          <div className="filter-tabs" role="tablist" aria-label="Фильтр проектов">
            {(Object.keys(filterLabels) as Filter[]).map((value) => (
              <button key={value} className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)} role="tab" aria-selected={filter === value}>
                {filterLabels[value]}
              </button>
            ))}
          </div>
        </div>
        {visibleProjects.length > 0 ? (
          <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        ) : (
          <div className="empty-state"><span>⌕</span><h3>Ничего не найдено</h3><p>Попробуйте изменить запрос или сбросить фильтр.</p><button className="button button--secondary" onClick={() => { setQuery(""); setFilter("all"); }}>Сбросить поиск</button></div>
        )}
      </section>

      <section className="home-lower">
        <div className="activity-list">
          <div className="section-heading section-heading--compact"><div><span className="eyebrow">сегодня</span><h2>Последняя активность</h2></div><button className="text-button">Вся история ↗</button></div>
          <div className="activity-item"><span className="activity-icon activity-icon--success">✓</span><div><strong>«Тихий вечер» опубликован</strong><p>Модерация завершена, объект доступен в каталоге</p></div><time>12 мин</time></div>
          <div className="activity-item"><span className="activity-icon activity-icon--review">◌</span><div><strong>«Ресторан» отправлен на проверку</strong><p>Версия 02, анимация из 6 кадров</p></div><time>2 ч</time></div>
          <div className="activity-item"><span className="activity-icon activity-icon--draft">✎</span><div><strong>«Первый огонёк» сохранён</strong><p>Изменения синхронизированы</p></div><time>вчера</time></div>
        </div>
        <aside className="quick-start"><span className="eyebrow">с чего начать</span><h2>Один объект,<br />один живой момент.</h2><p>Выберите good или bad moment, затем загрузите картинку. Детали можно настроить в редакторе.</p><button className="button button--secondary">Открыть документацию ↗</button></aside>
      </section>
    </main>
  );
}
