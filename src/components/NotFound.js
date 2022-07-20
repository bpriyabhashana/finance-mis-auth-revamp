import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Button
} from '@material-ui/core';
import { APP_NAME } from '../Config';

const NotFoundPage = () => {
  return (
    <Box sx={{
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center'
    }}
    >
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Box
              sx={{
                p: 2
              }}
            >
              <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Grid item xs={12}>
                  <img alt="logo" width="150" height="auto" src="https://wso2.cachefly.net/wso2/sites/images/brand/downloads/wso2-logo.png"></img>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ pb: 2, }}
                >
                  <Typography variant="h5">
                    {APP_NAME}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    The page does not exist!
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </Container>
    </Box>
  )
};

export default NotFoundPage;