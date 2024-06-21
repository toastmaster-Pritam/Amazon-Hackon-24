import axios from 'axios';
export const verifyProduct = async (_uniqueHash) => {

    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/verifyProduct/${_uniqueHash}`)

        return response.data;

    } catch (error) {
        
        console.error("Error verifying product:", error);
        return null;

    }


}