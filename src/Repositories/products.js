import api from "../Api"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJpYW5qcyIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjczNjMwNDMwLCJleHAiOjE2NzQyMzUyMzAsImlhdCI6MTY3MzYzMDQzMH0.rsnxJ7R3r76zUR4yC2pC3fNpo8DV-x9LQYlZHRbORWA"
export const ProductRepository = {
    getAll: async () => {
        let loginUserAdmin = await api.get('/Product/get-all', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        
        return loginUserAdmin;
    }, 
    post: async (product) => {
        let response = await api.post('/Product/create', product, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response;
    },
    delete: async (id) => {
        let response = await api.delete('/Product/remove/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response;
    },
    put: async (product) => {
        let response = await api.put('/Product/update', product, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response;
    },
    getByName: async (productName) => {
        let loginUserAdmin = await api.get('/Product/get-by-name?name=' + productName, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        
        return loginUserAdmin;
    }
    
}