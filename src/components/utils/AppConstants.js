export const ENGAGEMENTS = {
  NEW_ENGAGEMENT: {
    MESSAGES: {
      CONFIRM_SUBMIT: {
        id: "submitEngagement",
        title: "Confirm Engagement",
        titleEvent: "Confirm Event",
        message: "Are you sure you want to submit this engagement ?",
        messageEvent: "Are you sure you want to submit this event ?",
      },
      SET_INTERNAL_ALLOCATIONS: {
        id: "setInternalAllocations",
        title: "",
        message: "Do you want to allocate for this engagement now ?",
        messageEvent: "Do you want to allocate for this event now ?",
      },
      CONFIRM_UPDATE: {
        id: "updateEngagement",
        title: "Confirm Update Engagement",
        titleEvent: "Confirm Update Event",
        message: "Are you sure you want to update this engagement ?",
        messageEvent: "Are you sure you want to update this event ?",
      },
      CONFIRM_SUBMIT_WITH_DEFAULT_FUNDING_SOURCE: {
        message:
          "Note: Since you have not selected any, the selected BU will be added as the Funding Source by default.",
      },
    },
  },

  ENGAGEMENTS_PAGE: {
    MESSAGES: {
      CONFIRM_REQUEST_STATUS_UPDATE: {
        id: "updateRequestStatus",
        title: "Confirm Request Status Change",
        message:
          "Are you sure you want to change the Request Status to $newStatus ?",
      },
      CONFIRM_ENGAGEMENT_STATUS_UPDATE: {
        id: "updateEngagementStatus",
        title: "Confirm Engagement Status Change",
        message:
          "Are you sure you want to change the Engagement Status to $newStatus ?",
      },
    },
  },

  ALLOCATIONS: {
    MESSAGES: {
      DELETE_ALLOCATION: {
        id: "deleteAllocation",
        title: "",
        message: "Confirm to delete the allocation",
      },
      ALLOCATION_WITH_OVERLAPS: {
        id: "allocateWithOverlaps",
        title: "",
        message:
          "These operation(s) overlaps with existing default allocation(s). Confirming this action will result in updating the existing default allocation(s) for user. Are you sure you want to add this allocation ?",
      },
      UPDATE_TIMELINE_ON_OVERLAP: {
        id: "updateTimelineOnOverlap",
        title: "",
        message:
          "This allocation overlaps with existing allocations. Do you need to reload the timeline now ?",
      },
    },
  },
};

export const TEAM_ALLOCATIONS = {
  BULK_UPLOAD: {
    MESSAGES: {
      CONFIRM_BULK_UPLOAD: {
        id: "confirmBulkUpload",
        title: "",
        message: "Confirm the bulk upload",
      },
      CONFIRM_PARTIAL_UPLOAD: {
        id: "confirmPartialUpload",
        title: "",
        message:
          "There are some overlapped and/or erroneous records. Do you need to submit the rest of the allocations ?",
        messageErrOnly:
          "There are some erroneous records. Do you need to submit the rest of the allocations ?",
      },
      PROCEED_WITH_CSV_ERRORS: {
        id: "proceedWithCSVErrors",
        title: "",
        message:
          "There are erroneous records (incorrect number of columns / empty data) in the csv file. Do you want to proceed with the other records ?",
      },
      DOWNLOAD_ERROR_FILE: {
        id: "downloadErrorFile",
        title: "",
        message: "Do you want to download the error file now ?",
      },
      SHOW_INFO: {
        id: "showInfo",
        title: "",
        message:
          "All records are erroneous or overlapped. Please download the error file to check.",
      },
    },
  },
};

export const ROLE_SETTINGS = {
  MESSAGES: {
    ADD_NEW_ROLE: {
      id: "addNewRole",
      title: "",
      message: "Are you sure you want to add a new role as $role ?",
    },
    UPDATE_ROLE_PRIVILEGES: {
      id: "updateRolePrivileges",
      title: "",
      message: "Are you sure you want to update privileges for this role ?",
    },
    SHOW_PAGE_INFO: {
      id: "showInfo",
      title: "",
      message:
        "This page manages the Internal Apps privileges given for the LDAP roles listed in the dropdown. Type in the dropdown if you need to add another LDAP role to Internal Apps.",
    },
  },
};

export const PARTNER_RESOURCES = {
  MESSAGES: {
    SHOW_PAGE_INFO: {
      id: "showInfo",
      title: "",
      message:
        "These resources are used for adding allocations to engagement requests which are done by partners. Also note that the email shown here is the personal email of the consultant just for reference. Allocation system generated email format: partner-allocations-group+PARTNER_NAME+FIRST_NAME+LAST_NAME@wso2.com",
    },
    DELETE_PARTNER: {
      id: "deletePartner",
      title: "",
      message: "Are you sure you want to delete this partner consultant ?",
    },
  },
};

export const DIALOG_TYPES = {
  SUBMIT_DIALOG: "SUBMIT_DIALOG",
  CONFIRM_DIALOG: "CONFIRM_DIALOG",
  YES_NO_DIALOG: "YES_NO_DIALOG",
  INFO_DIALOG: "INFO_DIALOG",
};

export const STATUS_COLORS = {
  RED: "#FF6363",
  ORANGE: "#FFC762",
  GRAY: "#BECBC0",
  YELLOW: "#FFFF63",
  GREEN: "#4DCE5F",
};

export const PARTNER_ALLOCATION_GROUP_EMAIL_PREFIX =
  "partner-allocations-group";

export const PRE_ENGAGEMENT_RELAX_PERIOD_DAYS = 14;
export const POST_ENGAGEMENT_RELAX_PERIOD_DAYS = 14;
export const TIMELINE_RANGE_EXTRA_DAYS = 14;
export const ALLOWED_PAST_DAYS_ENG = 0;
export const ALLOWED_PAST_DAYS_ALLOC = 1;
export const ALLOWED_PAST_DAYS_DEF_ALLOC_END_DATE = 4;

export const EO_ALLOCATION_TYPE = "Engagement Overhead";

export const DEFAULT_TIMEZONE = "Asia/Colombo";

export const QUERY_PARAMS_REGEX = /^[a-z0-9]*$/i;

export const ALLOCATION_TYPE_ACTIVE_STATUS = "ACTIVE";
