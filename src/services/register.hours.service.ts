import api from "../utils/config/axios.config";

export const insertHours = (adminId:number, date:string, entryTime:string, exitTime:string) => {
    const body = {
        'adminId': adminId, 
        'date': date, 
        'entryTime': entryTime, 
        'exitTime': exitTime
    };

    return api
            .post('/register_hours', body) 
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
}