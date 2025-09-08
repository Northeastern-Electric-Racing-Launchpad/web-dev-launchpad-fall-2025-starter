import { Box, Typography } from "@mui/material";
import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  useCreateExperience,
  useGetAllExperiences,
} from "../../hooks/experiences.hooks";
import ExperienceSection from "../../components/ExperienceSection";
import ImageCarousel from "../../components/ImageCarousel";
import ExperienceFormModal from "./ExperienceFormModal";
import { useState } from "react";
import { Add } from "@mui/icons-material";

const ExperiencesPage = () => {
  const {
    data: experiences,
    isLoading,
    isError,
    error,
  } = useGetAllExperiences();
  const {
    mutateAsync: createExperience,
    isLoading: createExperienceIsLoading,
    isError: createExperienceIsError,
    error: createExperienceError,
  } = useCreateExperience();

  const [showModal, setShowModal] = useState(false);

  if (createExperienceIsError)
    return <ErrorPage error={createExperienceError} />;
  if (isError) return <ErrorPage error={error} />;
  if (isLoading || !experiences || createExperienceIsLoading)
    return <LoadingIndicator />;

  const accumulatedImages = experiences.flatMap(
    (experience) => experience.imageUrls
  );

  return (
    <>
      <ExperienceFormModal
        showModal={showModal}
        onSubmit={createExperience}
        onClose={() => setShowModal(false)}
      />
      <Box ml={"20px"}>
        <Typography variant="h1">My Experiences</Typography>
        <Box mt={"20px"}>
          {experiences.map((experience) => (
            <Box mt={"10px"}>
              <ExperienceSection key={experience.id} experience={experience} />
              <hr style={{ height: 1, marginTop: "30px" }} />
            </Box>
          ))}
        </Box>
        <Box
          onClick={() => setShowModal(true)}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            verticalAlign: "middle",
            cursor: "pointer",
            marginTop: "20px",
            ":hover": {
              color: "#ef4343",
              textShadow: "0 0.5px 2px #ef4343",
            },
          }}
        >
          <Add sx={{ color: "#ef4343" }} />
          <Typography variant="h5" color={"#ef4343"}>
            Add Experience
          </Typography>
        </Box>
        <ImageCarousel imageUrls={accumulatedImages} />
      </Box>
    </>
  );
};

export default ExperiencesPage;
