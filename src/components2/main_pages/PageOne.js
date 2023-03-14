import { Box, Button } from "@mui/material";
import React from "react";

import useHttp from "../../utils/http";

const PageOne = () => {
  const { handleRequest } = useHttp();

  const getPrivilege = () => {
    handleRequest(
      `${process.env.REACT_APP_API_BASE_URL}/privileges`,
      "GET",
      null,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <Box sx={{ m: 2 }}>
        <h2>Home Page Content</h2>
        <Button variant="outlined" onClick={getPrivilege}>
          Execute
        </Button>
      </Box>
    </div>
  );
};

export default PageOne;
