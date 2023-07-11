import api from "../Api"

const user = JSON.parse(localStorage.getItem("usuario"));

export const SellingRepository = {
    getAll: async () => {
        let response = await api.get('/Vendas/get-all', {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        
        return response;
    }, 
    post: async (dto) => {
        let response = await api.post('/Vendas/create', dto, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        })

        return response;
    },
    getDados: async () => {
        let response = await api.get('/Vendas/dados', {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        
        return response;
    },
    getDetails: async (dto) => {
        let response = await api.post('/Vendas/detalhes',dto, {
            headers: {
                Authorization: "Bearer " + user.token
            }
        });
        
        return response;
    }

}