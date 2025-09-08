import { Grid, Typography } from "@mui/material";
import { useCurrentUser } from "../../hooks/users.hooks";
import { urls } from "../../utils/urls";

const Home = () => {
  const currentUser = useCurrentUser();

  return (
    <Grid container mt={"30px"}>
      <Grid item xs={12}>
        <Typography variant="h1" color={"#ef4343"}>
          Hi, I'm {currentUser.username}.
        </Typography>
      </Grid>
      <Grid item xs={12} mt={"10px"}>
        <Typography variant="h4" color={"white"}>
          {currentUser.title}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={"10px"}>
        <hr style={{ height: 0.5 }} />
      </Grid>
      <Grid item container xs={12} md={7} mt={"10px"}>
        <Grid item xs={12}>
          <Typography variant="h4" color={"white"}>
            About Me
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color={"white"}>
            {currentUser.bio}
          </Typography>
        </Grid>
      </Grid>
      <Grid item md={1} xs={0} mt={"10px"}>
        <hr style={{ height: "95%", width: "0.5%" }} />
      </Grid>
      <Grid item xs={12} md={4} mt={"10px"}>
        <img src={urls.IMAGES(currentUser.imageUrl)} alt="profile pic" />
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }} mt={"10px"}>
        <hr style={{ height: 0.5 }} />
      </Grid>
    </Grid>
  );
};

export default Home;
