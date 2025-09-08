import { UserPreview } from "./user.types";

export interface Experience {
  id: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrentRole: boolean;
  createdAt: Date;
  creator: UserPreview;
  updatedAt: Date;
  imageUrls: string[];
}

export type ExperiencePreview = Omit<Experience, "creator">;

export type ExperienceCreateData = Omit<
  Experience,
  "id" | "createdAt" | "updatedAt" | "creator" | "imageUrls"
> & {
  images: File[];
};
