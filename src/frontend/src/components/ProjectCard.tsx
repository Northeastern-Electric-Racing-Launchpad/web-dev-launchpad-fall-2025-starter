import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Project, ProjectCreateData } from "shared";
import ImageCarousel from "./ImageCarousel";
import { CSSProperties, useState } from "react";
import { useDeleteProject, useUpdateProject } from "../hooks/projects.hooks";
import ProjectFormModal from "../pages/ProjectsPage/ProjectFormModal";
import ErrorPage from "./ErrorPage";
import LoadingIndicator from "./LoadingIndicator";
import { Delete, GitHub } from "@mui/icons-material";

const ProjectCard = ({
  project,
  sx,
}: {
  project: Project;
  sx: CSSProperties;
}) => {
  const [showModal, setShowModal] = useState(false);
  const {
    mutateAsync: deleteProject,
    isLoading,
    isError,
    error,
  } = useDeleteProject();
  const {
    mutateAsync: updateProject,
    isLoading: updateIsLoading,
    isError: updateIsError,
    error: updateError,
  } = useUpdateProject();

  if (isError) return <ErrorPage error={error} />;
  if (updateIsError) return <ErrorPage error={updateError} />;
  if (isLoading || updateIsLoading) return <LoadingIndicator />;

  const handleSubmit = async (data: ProjectCreateData) => {
    await updateProject({ id: project.id, projectCreateData: data });
  };

  const handleDelete = async () => {
    await deleteProject(project.id);
  };

  return (
    <>
      <ProjectFormModal
        project={project}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        showModal={showModal}
      />
      <div onClick={() => setShowModal(true)}>
        <Card
          sx={{
            ...sx,
            width: 350,
            height: 600,
            background: "#D1D4D6",
            position: "relative",
            ":hover": {
              cursor: "pointer",
              boxShadow: "0 0 20px #ef4343",
            },
          }}
        >
          <CardMedia
            sx={{
              height: 200,
              background: "#434343",
              borderColor: "#ef4343",
              borderStyle: "solid",
              borderWidth: 2,
            }}
          >
            <ImageCarousel imageUrls={project.imageUrls} />
          </CardMedia>
          <CardContent>
            <Grid container>
              <Grid item xs={10}>
                <Typography
                  color={"black"}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {project.title}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={handleDelete} sx={{ color: "black" }}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>

            <Typography variant="body1" color="black" flexGrow={1}>
              {project.description}
            </Typography>
            <Grid container sx={{ position: "absolute", bottom: 0 }}>
              <Grid item xs={10}>
                {project.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ margin: 1, color: "black", background: "#B9BEC1" }}
                  />
                ))}
              </Grid>
              <Grid item xs={2} mt={"10px"}>
                <a
                  href={project.url}
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHub />
                </a>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProjectCard;
