import api from "../Api"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJpYW5qcyIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjc0OTY4NTk0LCJleHAiOjE2NzU1NzMzOTQsImlhdCI6MTY3NDk2ODU5NH0.K9J-fZ_APMwEyjs_rbD5hKF6YVCFBxNiUJWRgKnkShw"

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