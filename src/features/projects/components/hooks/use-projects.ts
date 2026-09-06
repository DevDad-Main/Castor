import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

export const useProject = (projectId: Id<"projects">) => {
  return useQuery(api.projects.getById, {
    id: projectId,
  })
}

export const useProjects = () => {
  return useQuery(api.projects.get)
}

export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, {
    limit,
  })
}

export const useCreateProject = () => {
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStore, data) => {
      const existingProject = localStore.getQuery(api.projects.get)

      if (existingProject !== undefined) {
        const now = Date.now()
        const newProject = {
          _id: crypto.randomUUID() as Id<"projects">,
          _creationTime: now,
          name: data.name,
          ownerId: "anonymous",
          updatedAt: now,
        }

        localStore.setQuery(api.projects.get, {}, [
          newProject,
          ...existingProject,
        ])
      }
    }
  )
}

export const useRenameProject = ({
  projectId,
}: {
  projectId: Id<"projects">
}) => {
  return useMutation(api.projects.renameProject).withOptimisticUpdate(
    (localStore, data) => {
      const existingProject = localStore.getQuery(api.projects.getById, {
        id: projectId,
      })

      if (existingProject !== undefined && existingProject !== null) {
        localStore.setQuery(
          api.projects.getById,
          { id: projectId },
          {
            ...existingProject,
            name: data.name,
            updatedAt: Date.now(),
          }
        )
      }

      const existingProjects = localStore.getQuery(api.projects.get)

      if (existingProjects !== undefined) {
        localStore.setQuery(
          api.projects.get,
          {},
          existingProjects?.map((project) => {
            return project._id === data.id
              ? { ...project, name: data.name, updatedAt: Date.now() }
              : project
          })
        )
      }
    }
  )
}
