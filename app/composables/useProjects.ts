// Projects are Wagtail snippets. NOTE: the v3 API has no projects endpoint yet (its
// snippets endpoint only covers blog.Author and projects.Technology, and needs a bearer
// token), so this returns an error until one exists. Not used by any page yet.

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
