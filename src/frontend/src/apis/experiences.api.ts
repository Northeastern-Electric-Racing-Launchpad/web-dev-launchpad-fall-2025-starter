import { urls } from "../utils/urls";
import { experienceTransformer } from "../transformers/experiences.transformer";
import { Experience, ExperienceCreateData } from "shared";
import axios from "../utils/axios";

export const getAllExperiences = async () => {
  const response = await axios.get(urls.EXPERIENCES, {
    transformResponse: (data) => JSON.parse(data).map(experienceTransformer),
  });

  return response;
};

export const createExperience = async (
  experienceCreateData: ExperienceCreateData
) => {
  const formData = new FormData();
  formData.append("title", experienceCreateData.title);
  formData.append("description", experienceCreateData.description);
  formData.append("companyName", experienceCreateData.companyName);
  formData.append("location", experienceCreateData.location);
  formData.append("startDate", experienceCreateData.startDate.toISOString());
  formData.append("endDate", experienceCreateData.endDate?.toISOString() || "");
  experienceCreateData.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await axios.post<Experience>(
    urls.EXPERIENCES_NEW,
    formData,
    {
      transformResponse: (data) => experienceTransformer(JSON.parse(data)),
    }
  );

  return response;
};

export const updateExperience = async (
  id: string,
  experienceCreateData: ExperienceCreateData
) => {
  const formData = new FormData();
  formData.append("title", experienceCreateData.title);
  formData.append("description", experienceCreateData.description);
  formData.append("companyName", experienceCreateData.companyName);
  formData.append("location", experienceCreateData.location);
  formData.append("startDate", experienceCreateData.startDate.toISOString());
  formData.append("endDate", experienceCreateData.endDate?.toISOString() || "");
  experienceCreateData.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await axios.post<Experience>(
    urls.EXPERIENCE_BY_ID(id),
    formData,
    {
      transformResponse: (data) => experienceTransformer(JSON.parse(data)),
    }
  );

  return response;
};

export const deleteExperience = async (id: string) => {
  const response = await axios.delete(urls.EXPERIENCE_BY_ID(id));

  return response;
};
