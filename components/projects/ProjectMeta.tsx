import type { ProjectMeta as ProjectMetaType } from '@/lib/content/projects';
import type { Locale } from '@/lib/i18n/config';
import type { UIDict } from '@/lib/i18n/dictionary';

export function ProjectMetaPanel({ lang, project, dict }: { lang: Locale; project: ProjectMetaType; dict: UIDict }) {
  const rows: { label: string; value: string }[] = [
    { label: dict.labels.year, value: String(project.year) },
    { label: dict.labels.location, value: project.location[lang] },
    { label: dict.labels.category, value: dict.categories[project.category] },
  ];
  if (project.client) rows.push({ label: dict.labels.client, value: project.client });
  if (project.metrics) {
    for (const [k, v] of Object.entries(project.metrics)) {
      rows.push({ label: k, value: String(v) });
    }
  }
  return (
    <aside className="bg-bg-elev rounded-2xl p-6 border border-line">
      <dl className="space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs tracking-[0.18em] uppercase font-display text-ink-soft">{r.label}</dt>
            <dd className="mt-1 font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
      {project.tags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-line">
          <div className="text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-3">{dict.labels.tags}</div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-bg-base border border-line">{t}</span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
