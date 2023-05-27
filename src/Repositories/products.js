import api from "../Api"

const user = JSON.parse(localStorage.getItem("usuario"));

export const ProductRepository = {
    getAll: async () => {
        let loginUserAdmin = await api.get('/Product/get-all', {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        
        return loginUserAdmin;
    },
    post: async (product) => {
        let response = await api.post('/Product/create', product, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })

        return response;
    },
    delete: async (id) => {
        let response = await api.delete('/Product/remove/' + id, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })

        return response;
    },
    put: async (product) => {
        let response = await api.put('/Product/update', product, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })

        return response;
    },
    getByName: async (productName) => {
        let loginUserAdmin = await api.get('/Product/get-by-name?name=' + productName, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        
        return loginUserAdmin;
    }
    
}