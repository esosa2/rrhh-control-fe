import api from "../utils/config/axios.config";

// Function to insert work hours for an admin
export const insertHours = (adminId: number, date: string, entryTime: string, exitTime: string) => {
    // Create the request body with admin details and hours information
    const body = {
        'adminId': adminId, // Admin ID to associate the hours with
        'date': date,       // Date of the work hours
        'entryTime': entryTime, // Entry time of the admin
        'exitTime': exitTime  // Exit time of the admin
    };

    return api
        .post('/register_hours', body) // Make POST request to '/register_hours' with the hours data
        .then(response => {
            if (response.data.success) {
                // If the response is successful, return the data
                return response.data;
            } else {
                // If not successful, throw an error with the message
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            throw error; // Rethrow the error to propagate it
        });
};
