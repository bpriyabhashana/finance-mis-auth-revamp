//PROD

var HOST = "https://identity-internal-gateway.cloud.wso2.com/t/wso2internal928/certificationadminportal/";
// Stage
// var HOST =
//   "https://identity-internal-gateway.cloud.wso2.com/t/wso2internaldev/wso2cp/";

// Local Tomcat API Mapper
//var HOST = "http://localhost:8080/certportal/";

// API MAPPER PATH
var API_MAPPER_PATH = "api/";

var HOST_CONFIG = {
  // LOCAL BACK END DETAILS
  BACK_END_HOST: HOST,
  BACK_END_PORT: 8080,
  BACK_END_API_MAPPER_URL: HOST + API_MAPPER_PATH
};
// BASE PATH
var BASE_PATH = {
  MODULE_SERVICE_BASE_PATH: "Module/",
  PAPER_TYPE_SERVICE_BASE_PATH: "PaperType/",
  CATEGORY_SERVICE_BASE_PATH: "Category/",
  TOPIC_SERVICE_BASE_PATH: "Topic/",
  PAPER_SERVICE_BASE_PATH: "Paper/",
  QUESTION_SERVICE_BASE_PATH: "Question/",
  SCENARIO_SERVICE_BASE_PATH: "Scenario/",
  PRODUCT_SERVICE_BASE_PATH: "Product/",
  ANALYSE_SERVICE_BASE_PATH: "Analyse/",
  PAPER_SNAP_SERVICE_BASE_PATH: "PaperSnap/"
};

var GOOGLE_SHEET_CONFIG = {
  CLIENT_ID:
    "142722332706-gskks5g34vo2bmi7h46bvtdc47tfn5g3.apps.googleusercontent.com",
  API_KEY: "AIzaSyAcTNA8OPxeY95o0Lz_6bMiEmP9L6tXEFo",

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES: "https://www.googleapis.com/auth/spreadsheets.readonly",
  spreadsheetId: "1-YnfXd5RNLvUooDldWYdAqTdg_4i83OD0_H4TYrPlYg"
};

export default {
  HOST_CONFIG,
  BASE_PATH,
  GOOGLE_SHEET_CONFIG
};
