// Projects are Wagtail snippets, served by a custom API endpoint at /api/v3/projects/
// (Wagtail's API has no built-in snippet endpoint). Order comes from the model's
// Meta.ordering: `order`, then newest `date`.

function toProject(item: ProjectFields): ProjectItem {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    year: item.date.slice(0, 4),
    imageUrl: cmsMediaUrl(item.featured_image?.url),
    imageAlt: item.featured_image?.title ?? '',
    projectUrl: item.project_url || undefined,
    githubUrl: item.github_url || undefined,
    technologies: (item.technologies ?? []).map(t => t.name),
    featured: item.featured,
  }
}

/** All projects. Pass `featured: true` for only featured ones. */
export function useProjects(options: { featured?: boolean } = {}) {
  return useWagtailList<ProjectFields, ProjectItem>(
    'projects',
    { fields: '*', featured: options.featured },
    toProject,
  )
}

export interface ProjectItem {
  id: number
  slug: string
  title: string
  description: string
  year: string
  imageUrl: string | undefined
  imageAlt: string
  projectUrl: string | undefined
  githubUrl: string | undefined
  technologies: string[]
  featured: boolean
}
