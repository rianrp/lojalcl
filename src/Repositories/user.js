import api from "../Api"

const user = JSON.parse(localStorage.getItem("usuario"));

export const repositoryUser = {
    post: async (response) => {
        let loginUserAdmin = await api.post('/Auth/login', response)
        return loginUserAdmin;
    }, 
    isAuthenticated: async () => { 
        let response = await api.get('/Token/authenticated', {
            headers: {
                Authorization: "Bearer " + user.token
            }
        }); 
        return response; 
    },
}