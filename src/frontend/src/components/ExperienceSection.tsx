import { Grid, IconButton, Typography } from "@mui/material";
import { Experience, ExperienceCreateData } from "shared";
import { datePipe } from "../utils/dateUtils";
import {
  useDeleteExperience,
  useUpdateExperience,
} from "../hooks/experiences.hooks";
import ErrorPage from "./ErrorPage";
import LoadingIndicator from "./LoadingIndicator";
import { useState } from "react";
import ExperienceFormModal from "../pages/ExperiencesPage/ExperienceFormModal";
import { Delete } from "@mui/icons-material";

const ExperienceSection = ({ experience }: { experience: Experience }) => {
  const {
    mutateAsync: updateExperience,
    isLoading: updateExperienceIsLoading,
    isError: updateExperienceIsError,
    error: updateExperienceError,
  } = useUpdateExperience();
  const {
    mutateAsync: deleteExperience,
    isLoading: deleteExperienceIsLoading,
    isError: deleteExperienceIsError,
    error: deleteExperienceError,
  } = useDeleteExperience();
  const [showModal, setShowModal] = useState(false);

  if (updateExperienceIsError)
    return <ErrorPage error={updateExperienceError} />;
  if (deleteExperienceIsError)
    return <ErrorPage error={deleteExperienceError} />;
  if (updateExperienceIsLoading || deleteExperienceIsLoading)
    return <LoadingIndicator />;

  const handleSubmit = async (data: ExperienceCreateData) => {
    await updateExperience({ id: experience.id, experienceCreateData: data });
  };

  return (
    <>
      <ExperienceFormModal
        experience={experience}
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
      <div onClick={() => setShowModal(true)}>
        <Grid
          container
          sx={{
            padding: "20px",
            ":hover": {
              borderWidth: "1px",
              borderColor: "#ef4343",
              borderStyle: "solid",
              borderRadius: "5px",
              boxShadow: "0px 2px 5px #ef4343",
              cursor: "pointer",
            },
          }}
        >
          <Grid item container lg={4} xs={11}>
            <Grid item xs={12}>
              <Typography variant="h3">
                {experience.title} @ {experience.companyName}
              </Typography>
            </Grid>
            <Grid item xs={10} mt={"10px"}>
              <Typography variant="body1">{experience.location}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                {datePipe(experience.startDate)} -{" "}
                {experience.endDate ? datePipe(experience.endDate) : "Present"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item lg={7} xs={11}>
            <Typography variant="body1">{experience.description}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => deleteExperience(experience.id)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ExperienceSection;
