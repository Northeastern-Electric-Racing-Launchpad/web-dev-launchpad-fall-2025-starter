import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { urls } from "../utils/urls";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  console.log(imageUrls);

  return (
    <Box sx={{ width: "100%", height: "100%", flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {imageUrls.map((imageUrl, index) => (
          <div key={imageUrl}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                style={{
                  height: "100%",
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                }}
                src={urls.IMAGES(imageUrl)}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
};

export default ImageCarousel;
