import api from "../utils/config/axios.config";

// Function to get the work hours report for a specific admin within a date range
export const getHoursReport = (adminId?: number, dateBegin?: string, dateEnd?: string) => {
    // Set up the query parameters with the optional filters (adminId, dateBegin, and dateEnd)
    const params = { adminId, dateBegin, dateEnd };

    return api
        .get('/reports', { params }) // Make a GET request to '/reports' with the query parameters
        .then(response => {
            if (response.data.success) {
                // If the response is successful, return the report data
                return response.data.data;
            } else {
                // If not successful, throw an error with the message from the response
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            throw error; // Rethrow the error to propagate it
        });
};
