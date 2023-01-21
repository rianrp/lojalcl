import api from "../Api"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJpYW5qcyIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjczNjMwNDMwLCJleHAiOjE2NzQyMzUyMzAsImlhdCI6MTY3MzYzMDQzMH0.rsnxJ7R3r76zUR4yC2pC3fNpo8DV-x9LQYlZHRbORWA"

export const SellingRepository = {
    getAll: async () => {
        let response = await api.get('/Vendas/get-all', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        
        return response;
    }, 
    post: async (selling) => {
        let response = await api.post('/Vendas/create', selling, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response;
    }
}