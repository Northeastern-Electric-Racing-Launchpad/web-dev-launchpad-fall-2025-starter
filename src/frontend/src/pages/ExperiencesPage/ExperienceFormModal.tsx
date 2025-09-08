import { Experience, ExperienceCreateData } from "shared";
import NERFormModal from "../../components/FormModal";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Close } from "@mui/icons-material";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date(),
  companyName: yup.string().required("Company Name is required"),
  location: yup.string().required("Location is required"),
});

interface ExperienceFormModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (formData: ExperienceCreateData) => void;
  experience?: Experience;
}

interface ExperienceFormInfo {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  companyName: string;
  location: string;
}

const ExperienceFormModal = ({
  showModal,
  onClose,
  onSubmit,
  experience,
}: ExperienceFormModalProps) => {
  const [addedImages, setAddedImages] = useState<File[]>([]);

  const onSubmitWrapper = (formData: ExperienceFormInfo) => {
    const data = {
      ...formData,
      images: addedImages,
      isCurrentRole: formData.endDate ? false : true,
    };
    onSubmit(data);
    onClose();
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormInfo>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: experience?.title ?? "",
      description: experience?.description ?? "",
      companyName: experience?.companyName ?? "",
      location: experience?.location ?? "",
      startDate: experience?.startDate ?? new Date(),
      endDate: experience?.endDate ?? undefined,
    },
  });

  return (
    <NERFormModal
      onFormSubmit={onSubmitWrapper}
      handleUseFormSubmit={handleSubmit}
      formId="create-edit-project-form"
      showCloseButton
      onHide={onClose}
      open={showModal}
      title={experience ? "Edit Experience" : "Create Experience"}
      reset={() =>
        reset({
          title: "",
          description: "",
          companyName: "",
          location: "",
          startDate: new Date(),
          endDate: undefined,
        })
      }
    >
      <FormControl fullWidth>
        <FormLabel>Experience Title</FormLabel>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <FormLabel>Company Name</FormLabel>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Enter Company Name"
              error={!!errors.companyName}
              helperText={errors.companyName?.message}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <FormLabel>Location</FormLabel>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder="Enter Location"
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <FormLabel>Dates</FormLabel>
        <Box
          display={"flex"}
          justifyContent={"left"}
          sx={{ verticalAlign: "middle", alignItems: "center" }}
        >
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            )}
          />
          <Typography
            variant="body1"
            sx={{ marginRight: "5px", marginLeft: "5px" }}
          >
            To
          </Typography>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            )}
          />
          <Typography variant="body1" marginLeft={"5px"}>
            (Leave Empty For Current Role)
          </Typography>
        </Box>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <FormLabel>Images</FormLabel>
        <Box display={"flex"} flexWrap={"wrap"}>
          {addedImages.map((image) => (
            <Box
              key={image.name}
              display={"flex"}
              justifyContent={"space-between"}
              borderRadius={"20px"}
              sx={{
                background: "#7D7D7D",
              }}
              marginRight={"10px"}
              marginTop={"10px"}
              height={"40px"}
              alignItems={"center"}
              padding={"0 10px"}
            >
              <Typography variant="body1"> {image.name}</Typography>
              <Close
                onClick={() =>
                  setAddedImages(addedImages.filter((img) => img !== image))
                }
              />
            </Box>
          ))}
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 1, background: "#7D7D7D" }}
          >
            Upload
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setAddedImages([
                    ...addedImages,
                    ...Array.from(e.target.files),
                  ]);
                }
              }}
            />
          </Button>
        </Box>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "10px" }}>
        <FormLabel>Experience Description</FormLabel>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter Description"
              fullWidth
              sx={{ marginTop: "10px" }}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </FormControl>
    </NERFormModal>
  );
};

export default ExperienceFormModal;
