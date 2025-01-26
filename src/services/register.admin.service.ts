import api from "../utils/config/axios.config";

export const getAdmin = (adminId?: number) => {
    const params = adminId !== undefined ? { adminId } : {};

    return api
        .get('/register_admin', { params }) 
        .then(response => {

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message || error);
            throw error;
        });
};


export const insertAdmin = (firstName:string, lastName:string, identityNumber:string, dateBirthday:string) => {
    const body = {
        'firstName': firstName, 
        'lastName': lastName, 
        'identityNumber': identityNumber, 
        'dateBirthday': dateBirthday
    };

    return api
        .post('/register_admin', body) 
        .then(response => {
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            throw error;
        });
};


export const updateAdmin = (id:number, firstName:string, lastName:string, identityNumber:string, dateBirthday:string) => {
    const body = {
        'adminId': id,
        'firstName': firstName, 
        'lastName': lastName, 
        'identityNumber': identityNumber, 
        'dateBirthday': dateBirthday
    };

    return api
        .put('/register_admin', body) 
        .then(response => {

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message || error);
            throw error;
        });
};


export const deleteAdmin = (id:number) => {
    return api
        .delete(`/register_admin/${id}`) 
        .then(response => {

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error.message || error);
            throw error;
        });
};