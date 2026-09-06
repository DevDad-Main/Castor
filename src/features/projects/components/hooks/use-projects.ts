import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id, Doc } from "../../../../../convex/_generated/dataModel"
import { useAuth } from "@clerk/nextjs"

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
