import api from "../utils/config/axios.config";

export const getHoursReport = (adminId?: number, dateBegin?:string, dateEnd?:string) => {
    const params = { adminId, dateBegin, dateEnd };

    return api
        .get('/reports', { params }) 
        .then(response => {

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message); 
            }
        })
        .catch(error => {
            throw error;
        });
};