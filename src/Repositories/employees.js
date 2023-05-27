import api from "../Api"

const user = JSON.parse(localStorage.getItem("usuario"));


export const EmployeesRepository = {
    getAll: async () => {
        let users = await api.get('/User/get-all', {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        return users;
    },
    post: async (employees) => {
        let response = await api.post('/User/create', employees, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })

        return response;
    }
}