import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  updateExperience,
} from "../apis/experiences.api";
import { Experience, ExperienceCreateData } from "shared";

export const useGetAllExperiences = () => {
  return useQuery<Experience[], Error>(["experiences"], async () => {
    const { data } = await getAllExperiences();
    return data;
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<Experience, Error, ExperienceCreateData>(
    ["experiences"],
    async (experienceCreateData) => {
      const { data } = await createExperience(experienceCreateData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Experience,
    Error,
    { id: string; experienceCreateData: ExperienceCreateData }
  >(
    async ({ id, experienceCreateData }) => {
      const { data } = await updateExperience(id, experienceCreateData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>(
    async (id) => {
      const { data } = await deleteExperience(id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("experiences");
      },
    }
  );
};
