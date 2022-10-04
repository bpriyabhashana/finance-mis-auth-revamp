// import { Helmet } from "react-helmet";
import { APP_CONFIG, APP_NAME } from "../Config";
import { Box, Container, Link, Typography } from "@mui/material";

const NotFound = () => (
  <>
    {/* <Helmet> */}
    <title>404 | {APP_NAME}</title>
    {/* </Helmet> */}
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: The page you are looking for isn’t here
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
          gutterBottom
        >
          You either tried a questionable route or you came here by mistake.
          Whichever it is, try using the navigation or click the link below.
        </Typography>
        <Link href={APP_CONFIG.PAGES.APP}>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Navigate to Home Page
          </Typography>
        </Link>
        {/* <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box> */}
      </Container>
    </Box>
  </>
);

export default NotFound;
