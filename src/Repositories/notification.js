import api from "../Api"

const user = JSON.parse(localStorage.getItem("usuario"));

export const NotifyRepository = {
    getAll: async () => {
        let users = await api.get('/Notification/get-all', {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        return users;
    }
}