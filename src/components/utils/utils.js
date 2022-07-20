import { PARTNER_ALLOCATION_GROUP_EMAIL_PREFIX, ALLOWED_PAST_DAYS_ENG, ALLOWED_PAST_DAYS_ALLOC, ALLOWED_PAST_DAYS_DEF_ALLOC_END_DATE } from './AppConstants';
import { getUserPrivileges } from './oauth';
import { monthNames } from './AppData';
import { FormConstants } from '../../Config'
import timezones from 'timezones-list';

// If user has at least one privilege, access will be granted (as per the use case)
export const isAccessGranted = (privilegeArr) => {
    const userPrivileges = getUserPrivileges();
    let isAccessGranted = false;

    for (let privilegeId of privilegeArr) {
        if (userPrivileges.includes(privilegeId)) {
            isAccessGranted = true;
            break;
        }
    };

    return isAccessGranted;
}

export const formatDateWithDashes = (date) => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
}

// Input: String with mm/dd/yyyy format
export const formatDateToStandard = (date) => {
    let day = date.split("/")[1];
    let month = date.split("/")[0];
    let year = date.split("/")[2];

    return [year, month, day].join("-");
}

export const getTimeFromDate = (date) => {
    var hh = (date.getHours() < 10 ? "0" : "") + date.getHours().toString();
    var mm = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
    return hh + ':' + mm;
}

export const getStandardDateFormat = () => {
    return "YYYY-MM-DD";
}

// Input: hh:mm:ss format. Output hh:mm format
export const getTimeWithoutSecs = (time) => {
    let timeArr = time.split(":");

    return timeArr[0] + ':' + timeArr[1];
}

// Extract date part from a string starting from YYYY-MM-DD. Output is in YYYY-MM-DD format
export const getDateFromString = (date) => {
    return date.substring(0, 10);
};

export const formatDateWithMonthName = (dateObj) => {
    let dd = dateObj.getDate().toString();
    let month = monthNames[dateObj.getMonth()];
    let yyyy = dateObj.getFullYear();

    return (dd[1] ? dd : "0" + dd[0]) + "/" + month + "/" + yyyy;
}

export const getCurrentYear = () => {
    return new Date().getFullYear().toString();
}

export const getDateObjectFromString = (stringDate) => {
    if (stringDate) {
        let dateWithoutTime = new Date(stringDate).setHours(0, 0, 0, 0);

        return new Date(dateWithoutTime);
    }
}

export const getDateObjectFromTimeString = (stringTime) => {
    if (stringTime) {
        let timeArr = stringTime.split(":");
        let date = new Date().setHours(timeArr[0], timeArr[1], 0, 0);

        return new Date(date);
    }

    return null;
}

export const getEndDateTime = (dateObj) => {
    return dateObj.setHours(23, 59, 59);
}

export const getDateObjWithStartTime = (dateObj) => {
    return new Date(dateObj.setHours(0, 0, 0, 0));
}

const _isPastDate = (dateObj, allowedDays) => {
    if (dateObj) {
        let today = new Date().setHours(0, 0, 0, 0);
        return dateObj.setHours(0, 0, 0, 0) < new Date(today).setDate(new Date().getDate() - allowedDays);
    }
}

const _getAllowedPastDate = (allowedDays) => {
    let today = new Date().setHours(0, 0, 0, 0);
    let pastDate = new Date(new Date(today).setDate(new Date().getDate() - allowedDays));
    return pastDate;
}

export const isPastDateForEng = (dateObj) => {
    return _isPastDate(dateObj, ALLOWED_PAST_DAYS_ENG);
}

export const getAllowedPastDateForEng = () => {
    return _getAllowedPastDate(ALLOWED_PAST_DAYS_ENG);
}

export const isPastDateForAlloc = (dateObj) => {
    return _isPastDate(dateObj, ALLOWED_PAST_DAYS_ALLOC);
}

export const isPastDate = (dateObj) => {
    return _isPastDate(dateObj, 0);
}

export const getAllowedPastDateForAlloc = () => {
    return _getAllowedPastDate(ALLOWED_PAST_DAYS_ALLOC);
}

export const isPastDateForDefAlloc = (dateObj) => {
    return _isPastDate(dateObj, ALLOWED_PAST_DAYS_DEF_ALLOC_END_DATE);
}

export const getAllowedDefaultDate = () => {
    return new Date();
}

export const getTimeZoneDisp = (tzCode) => {
    let zoneObj = timezones.find(timezone => timezone.tzCode === tzCode);

    return zoneObj && zoneObj.utc ? `GMT${zoneObj.utc}` : "";
}

export const getTimeZoneObj = (tzCode) => {
    return timezones.find(timezone => timezone.tzCode === tzCode);
}

export const getBaseTime = (date, timeZoneObj) => {
    let dateObj = new Date(date.getTime());
    let offsetStr = timeZoneObj.utc;
    let sign = offsetStr.charAt(0);

    let time = offsetStr.substring(1);
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];

    let timeDifference = (hours * 1000 * 60 * 60 + minutes * 1000 * 60);

    if (sign === "+") {
        dateObj.setTime(dateObj.getTime() - timeDifference);
    } else {
        dateObj.setTime(dateObj.getTime() + timeDifference);
    }

    return new Date(dateObj);
}

export const getTimeByTimezone = (date, fromTimezone, toTimeZone) => {
    let baseTime = getBaseTime(date, fromTimezone);

    let offsetStr = toTimeZone.utc;
    let sign = offsetStr.charAt(0);

    let time = offsetStr.substring(1);
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];

    let timeDifference = (hours * 1000 * 60 * 60 + minutes * 1000 * 60);

    if (sign === "+") {
        baseTime.setTime(baseTime.getTime() + timeDifference);
    } else {
        baseTime.setTime(baseTime.getTime() - timeDifference);
    }

    return baseTime;
}

export const getRoundOffNumber = (number) => {
    return +(Math.round(number + "e+2") + "e-2");
}

export const workdayCount = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
        let weekDay = currentDate.getDay();

        if (weekDay !== 0 && weekDay !== 6) {
            count++;
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
}

// Only for objects with key value pairs (not for date objects)
export const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
}

// The same as in old code
export const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}

export const getPartnerConsultantEmail = (partner, firstName, lastName) => {
    // return `${PARTNER_ALLOCATION_GROUP_EMAIL_PREFIX}+${partner.replace(" ", "_")}+${firstName.replace(" ", "_")}+${lastName.replace(" ", "_")}@wso2.com`;

    return PARTNER_ALLOCATION_GROUP_EMAIL_PREFIX +
        (partner ? "+" + partner.replace(" ", "_") : "") +
        (firstName ? "+" + firstName.replace(" ", "_") : "") +
        (lastName ? "+" + lastName.replace(" ", "_") : "") +
        "@wso2.com"
}

export const isEngineeringAlloc = (engagementId) => {
    return engagementId === -1 || engagementId === "-1" || engagementId === -1.0 || engagementId === "-1.0"
}

export const isPaidEngagement = (type) => {
    return type === FormConstants.EngagementTypes.Paid.id;
}

export const isInternal = (type) => {
    let internalIds = [FormConstants.EngagementTypes.InternalEngagement.id, FormConstants.EngagementTypes.MarketingEvent.id]
    return internalIds.some(id => id === type);
};

export const isNonPaidPostSale = (type) => {
    return type === FormConstants.EngagementTypes.NonPaidPostSale.id;
};

export const isNonPaidPreSale = (type) => {
    return type === FormConstants.EngagementTypes.NonPaidPreSale.id;
};
