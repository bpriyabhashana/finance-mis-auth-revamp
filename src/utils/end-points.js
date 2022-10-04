const baseURL = process.env.REACT_APP_APIM_SERVICES_ENDPOINT

export const getEmployees = "https://mobileinternal.wso2.com/api/external/employees?employeeStatus=Active,Marked leaver"

// <============ EA Migration =============================
export const getEmployeeEmails = baseURL+"employee/emails"
export const getNewTravelRequests = baseURL+"travels/new"
export const getAllTravelRequests = baseURL+"travels/all"
export const getEmployeeActiveVisa = baseURL+"employee/visas/active"
export const getActiveTravelAgents = baseURL+"travel-agents/active"
export const assignTravelRequest = baseURL+"assign-travel"

export const getEmployeeAllTravelVisa = baseURL+"employees/visas/all"
export const getAllTravelAgents = baseURL+"travel-agents/all"

// ==============================================================>

export const getNewTravelRequestsAgentsVisa = baseURL+"new_travel_requests_agents_visa" //
export const getAllTravelRequestsAgentsVisa = baseURL+"all_travel_requests_agents_visa" //

export const getTravelRequstAgentVisaByJobNumber = baseURL+"travel_request_agent_visa_by_job_number"
export const getPrivilegesByRoles = baseURL+"privileges_by_roles"
export const getHotelBookingsByJobNumber = baseURL+"hotel_bookings_by_job_number"
export const getUserVisaList = baseURL+"user_visa_list"
export const getVisaList = baseURL+"visa_list"
export const getVisaByVisaId = baseURL+"visa_by_visa_id"
export const getVisaImage = baseURL+"visa_image"
export const getOwnVisaImage = baseURL+"own_visa_image"
export const getUserTravelDocumentList = baseURL+"user_travel_document_list"
export const getTravelDocumentsList = baseURL+"travel_document_list"
export const getPassportList = baseURL+"passport_list"
export const getUserPassportList = baseURL+"user_passport_list"
export const getTravelDocumentByDocumentId = baseURL+"travel_document_by_document_id"
export const getTravelDocumentImage = baseURL+"travel_document_image"
export const getOwnTravelDocumentImage = baseURL+"own_travel_document_image"
export const getHotelVoucher = baseURL+"hotel_voucher_file"
export const validateTravelInformationByJobNumber = baseURL+"validate_travel_information_by_job_number"
export const getVisaAllocationCount = baseURL+"visa_allocation_count"
export const getTravelDocumentAllocationCount = baseURL+"travel_document_allocation_count"

export const postVisaInformation = baseURL+"visa_information"
export const postVisaImage = baseURL+"upload_visa_image"
export const postOwnVisaInformation = baseURL+"own_visa_information"
export const postOwnVisaImage = baseURL+"upload_own_visa_image"
export const postTravelDocumentInformation = baseURL+"travel_document_information"
export const postOwnTravelDocumentInformation = baseURL+"own_travel_document_information"
export const postTravelDocumentImage = baseURL+"upload_travel_document_image"
export const postOwnTravelDocumentImage = baseURL+"upload_own_travel_document_image"
export const putHotelBookings = baseURL+"update_hotel_bookings"
export const postHotelVoucher = baseURL+"upload_hotel_voucher"
export const postTravelEmail = baseURL+"send_travel_email"

export const putTravelOperation = baseURL+"travel_operation"
export const putTravelStatus = baseURL+"travel_status"
export const putTravelAgent = baseURL+"travel_agent"
export const putTravelVisa = baseURL+"travel_visa"
export const putVisaPassport = baseURL+"visa_passport"
export const putVisaInformation = baseURL+"update_visa_information"
export const putTravelDocumentInformation = baseURL+"update_travel_document_information"

export const deleteHotelBooking = baseURL+"delete_hotel_booking"




