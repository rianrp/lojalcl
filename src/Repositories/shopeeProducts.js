import api from "../Api"

export const shopeeProducts = {
    getAll: async () => {
        let response = await api.get('https://partner.shopeemobile.com/api/v2/product/get_category', {
        });
        
        return response;
    }, 
}
