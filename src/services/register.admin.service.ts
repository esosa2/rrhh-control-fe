import api from "../utils/config/axios.config";

// Function to get admins, optionally filtered by adminId
export const getAdmin = (adminId?: number) => {
    // Conditionally add the adminId parameter if provided
    const params = adminId !== undefined ? { adminId } : {};

    return api
        .get('/register_admin', { params }) // Make GET request to '/register_admin' with optional params
        .then(response => {

            if (response.data.success) {
                // If the response is successful, return the data
                return response.data.data;
            } else {
                // If not successful, throw an error with the message
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message || error); // Log the error message
            throw error; // Rethrow the error to propagate it
        });
};

// Function to insert a new admin
export const insertAdmin = (firstName: string, lastName: string, identityNumber: string, dateBirthday: string) => {
    const body = {
        'firstName': firstName, // First name of the admin
        'lastName': lastName,   // Last name of the admin
        'identityNumber': identityNumber, // Identity number of the admin
        'dateBirthday': dateBirthday // Birthday of the admin
    };

    return api
        .post('/register_admin', body) // Make POST request to '/register_admin' with admin details
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

// Function to update an existing admin's details
export const updateAdmin = (id: number, firstName: string, lastName: string, identityNumber: string, dateBirthday: string) => {
    const body = {
        'adminId': id, // Admin ID to be updated
        'firstName': firstName, // Updated first name
        'lastName': lastName,   // Updated last name
        'identityNumber': identityNumber, // Updated identity number
        'dateBirthday': dateBirthday // Updated birthday
    };

    return api
        .put('/register_admin', body) // Make PUT request to update admin details
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
            console.error("Error en la solicitud:", error.message || error); // Log the error message
            throw error; // Rethrow the error to propagate it
        });
};

// Function to delete an admin by their ID
export const deleteAdmin = (id: number) => {
    return api
        .delete(`/register_admin/${id}`) // Make DELETE request to '/register_admin/{id}' to delete an admin
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
            console.error("Error en la solicitud:", error.message || error); // Log the error message
            throw error; // Rethrow the error to propagate it
        });
};
