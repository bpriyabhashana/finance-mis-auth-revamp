export const AppConfig = {
  // baseUrl: 'https://localhost:8243/allocations/1.0.0/',
  baseUrl: process.env.REACT_APP_BASE_URL,
  appUUID: process.env.REACT_APP_UUID,

  salesForceUrl: process.env.REACT_APP_SALESFORCE_URL,

  getUserPrivileges: "getUserPrivileges",

  // baseUrl: 'http://localhost:37081/allocations/',
  getEngagementAccounts: "getEngagementAccounts",

  // baseUrl: 'https://prabhashimeddegoda.choreoapis.dev/salesforce/1.0.0/',
  getEngagementById: "getEngagementById",
  getEngagements: "getEngagements",
  getEngagementTypes: "getEngagementTypes",
  getAccounts: "getAccounts",
  getOpportunities: "getOpportunities",
  getOpportunitiesPostSale: "getOpportunitiesPostSale",
  getProducts: "getProducts",
  getAllocationTypes: "getAllocationTypes",
  updateRequestStatus: "updateRequestStatus",
  updateEngagementStatus: "updateEngagementStatus",
  getEmailList: "getEmailList",
  getAllocationsByEmail: "getAllocationsByEmail",
  getNewDates: "getNewDates",
  getDefaultAllocationTypes: "getDefaultAllocationTypes", // This is not used
  getAllProducts: "getAllProducts",
  getAllocationsByEngagementId: "getAllocationsByEngagementId",
  getAllocationTypeIdMapping: "getAllocationTypeIdMapping",
  getAllocationTypesByEngagementType: "getAllocationTypesByEngagementType",

  getBusinessUnits: "getBusinessUnits",
  getAllocationsWithEngagementType: "getAllocationsWithEngagementType",
  getPaidAllocationsWithAllocationType: "getPaidAllocationsWithAllocationType",
  getNonPaidAllocationsWithAllocationType:
    "getNonPaidAllocationsWithAllocationType",

  addNewEngagement: "addNewEngagement",
  updateEngagement: "updateEngagement",
  addNewAllocation: "addNewAllocation",
  updateAllocation: "updateAllocation",
  deleteAllocation: "deleteAllocation",
  updateAllocationComment: "updateAllocationComment",
  updateTeamAllocation: "updateTeamAllocation",
  validateAllocation: "validateAllocation",
  getEmployeeJobBandData: "getEmployeeJobBandData",

  getAllocations: "getAllocations",
  getEmailListByTeam: "getEmailListByTeam",
  getPartners: "getPartners",
  getActivePartners: "getActivePartners",
  addNewPartner: "addNewPartner",
  updatePartner: "updatePartner",
  getAllocationCountForPartnerConsultant:
    "getAllocationCountForPartnerConsultant",
  deletePartner: "deletePartner",

  getOrgStructure: "getOrgStructure",
  getEmailsByOrgStructure: "getEmailsByOrgStructure",

  bulkUploadAllocations: "bulkUploadAllocations",
  bulkUpdateAllocations: "bulkUpdateAllocations",

  getRoles: "getRoles",
  getPrivileges: "getPrivileges",
  getPrivilegesByRole: "getPrivilegesByRole",
  addNewRole: "addNewRole",
  updatePrivilegesForRole: "updatePrivilegesForRole",

  getIsUserPrivileged: "getIsUserPrivileged",

  getAllocationsForReport: "getAllocationsForReport",
  getEmployeeDataByEmail: "getEmployeeDataByEmail",
  getNonAllocatedEngineerData: "getNonAllocatedEngineerData",
  getDefaultAllocations: "getDefaultAllocations",
  getEngCodeGroup: "getEngCodeGroup",

  getTravelReadiness: "getTravelReadiness",
  getConsultantsByEngagementId: "getConsultantsByEngagementId",
  getEngagementByUUID: "getEngagementByUUID",

  addEngagementFundingSources: "addEngagementFundingSources",
  updateEngagementFundingSources: "updateEngagementFundingSources",
  getEngagementFundingSourcesById: "getEngagementFundingSourcesById",

  getEvents: "getEvents",
  addEvent: "addEvent",
  getAllFundingSources: "getAllFundingSources",
  getEventsWithSearch: "getEventsWithSearch",
  getInternalAllocationTypes: "getInternalAllocationTypes",
  addNewInternalEngagement: "addNewInternalEngagement",
  updateInternalEngagement: "updateInternalEngagement",
  getAddedEventNamesList: "getAddedEventNamesList",

  headers: {
    Accept: "application/json",
    "API-Key": "asgardeo-id-token",
  },

  reqHeaders: {
    Accept: "application/json",
  },
};

export const APP_NAME = "Internal Apps";

export const AUTH_CONFIG = {
  signInRedirectURL: process.env.REACT_APP_AUTH_SIGNIN_REDIRECT_URL,
  signOutRedirectURL: process.env.REACT_APP_AUTH_SIGNOUT_REDIRECT_URL,

  clientID: process.env.REACT_APP_AUTH_CLIENT_ID,

  serverOrigin: process.env.REACT_APP_AUTH_SERVER_ORIGIN,

  // scope: ["openid", "profile"],
  // scope: ["openid", "roles"]
  scope: ["openid", process.env.REACT_APP_CUSTOM_SCOPE],
};

export const OAUTH_CONFIG = {
  SKIP_TOKEN_EXCHANGE:
    process.env.REACT_APP_SKIP_TOKEN_EXCHANGE === "true" ? true : false,
  BEARER_TOKEN: process.env.REACT_APP_APIM_STATIC_TOKEN,
  TOKEN_APIS: {
    ASGARDEO_TOKEN_EXCHANGE: process.env.REACT_APP_ASGARDEO_TOKEN_EXCHANGE,
    CLIENT_ID: process.env.REACT_APP_APIM_CLIENT_ID,
  },
};

export const PAGES = {
  BASE_URL: "/",
  DASHBOARD: "/dashboard",
  NEW_ENGAGEMENT: "/engagement",
  EDIT_ENGAGEMENT: "/engagement/edit",
  ENGAGEMENTS: "/engagement/view/all",
  ENGAGEMENT_ALLOCATIONS: "/engagement/allocations",
  TEAM_ALLOCATIONS: "/team-allocations",
  REPORTS: "/report/consultant-allocations",
  SETTINGS: "/settings",
  EVENTS: "/events",
  INTERNAL: "/internal",
  EDIT_INTERNAL: "/internal/edit",
};

export const ResponseStatus = {
  success: 200,
};

export const FormConstants = {
  Wso2InternalAccount: "WSO2",
  Wso2InternalLegacyAccount: "WSO2 Internal",
  Wso2WorkshopLegacyAccount: "WSO2 Workshop",
  EngagementTypes: {
    InternalEngagement: { id: 1, name: "Internal Engagment" },
    MarketingEvent: { id: 5, name: "Marketing Event" },
    Paid: { id: 2, name: "Paid" },
    NonPaidPreSale: { id: 3, name: "Non-Paid Pre Sale" },
    NonPaidPostSale: { id: 4, name: "Non-Paid Post Sale" },
  },
  Types: {
    Internal: "Internal",
    Customer: "Customer",
  },
};

export const engineeringAllocEngagementId = "-1.0";

export const RequestStatus = {
  NEW: "New",
  UPDATED: "Updated",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const EngagementStatus = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const AllocationStatus = {
  TENTATIVE: "Tentative",
  READY_FOR_CLEARANCE: "Ready for Clearance",
  CLEARANCE_IN_PROGRESS: "Clearance In Progress",
  ACCEPTED_BY_CONSULTANT: "Accepted by Consultant",
  REJECTED_BY_CONSULTANT: "Rejected by Consultant",
  REJECTED_VISA_ISSUES: "Rejected - Visa Issues",
  REJECTED_OTHER: "Rejected - Other",
  CONFIRMED: "Confirmed",
  CONFIRMED_VISA_PENDING: "Confirmed - Visa Pending",
  ALLOCATION_CANCELLED: "Allocation Cancelled",
};

export const DefaultAllocationStatus = "Active";

export const Privileges = {
  DASHBOARD_PAGE: 1,
  CUSTOMER_ENGAGEMENT_CREATE_PAGE: 2,
  CUSTOMER_ENGAGEMENTS_PAGE: 3,
  CUSTOMER_ENGAGEMENT_STATUS_UPDATE: 4,
  CUSTOMER_ENGAGEMENT_EDIT: 5,
  CUSTOMER_ENGAGEMENT_ALLOCATE_CONSULTANT: 6,
  CUSTOMER_ENGAGEMENT_REQUEST_STATUS_UPDATE: 7,
  CUSTOMER_ENGAGEMENTS_PAGE_VIEW_CONSULTANTS_COLUMN: 8,
  CUSTOMER_ENGAGEMENT_ALLOCATIONS_PAGE: 9,
  CUSTOMER_ENGAGEMENT_ALLOCATION_STATUS_UPDATE: 10,

  INTERNAL_ENGAGEMENT_CREATE_PAGE: 11,
  MARKETING_EVENT_CREATE_PAGE: 12,
  INTERNAL_ENGAGEMENTS_PAGE: 13,
  INTERNAL_ENGAGEMENT_STATUS_UPDATE: 14,
  INTERNAL_ENGAGEMENT_EDIT: 15,
  INTERNAL_ENGAGEMENT_ALLOCATE_CONSULTANT: 16,
  INTERNAL_ENGAGEMENT_REQUEST_STATUS_UPDATE: 17,
  INTERNAL_ENGAGEMENTS_PAGE_VIEW_CONSULTANTS_COLUMN: 18,
  INTERNAL_ENGAGEMENT_ALLOCATIONS_PAGE: 19,
  INTERNAL_ENGAGEMENT_ALLOCATION_STATUS_UPDATE: 20,

  TEAM_ALLOCATIONS_PAGE: 21,
  CONSULTANT_ALLOCATIONS_REPORT: 22,
  ROLE_SETTINGS_PAGE: 23,
  PARTNER_RESOURCES_MGT_PAGE: 24,
};

export const RequestStatusPriority = {
  [RequestStatus.NEW]: 1,
  [RequestStatus.UPDATED]: 2,
  [RequestStatus.IN_PROGRESS]: 3,
  [RequestStatus.COMPLETED]: 4,
  [RequestStatus.CANCELLED]: 5,
};

export const ClearanceStatusPriority = {
  [AllocationStatus.TENTATIVE]: 1,
  [AllocationStatus.READY_FOR_CLEARANCE]: 2,
  [AllocationStatus.CLEARANCE_IN_PROGRESS]: 3,
  [AllocationStatus.ACCEPTED_BY_CONSULTANT]: 4,
  [AllocationStatus.REJECTED_BY_CONSULTANT]: 5,
  [AllocationStatus.REJECTED_VISA_ISSUES]: 6,
  [AllocationStatus.REJECTED_OTHER]: 7,
  [AllocationStatus.CONFIRMED]: 8,
  [AllocationStatus.CONFIRMED_VISA_PENDING]: 9,
  [AllocationStatus.ALLOCATION_CANCELLED]: 10,
};

export const DATE_DISPLAY_FORMAT = "dd/MM/yyyy";
