import axios from 'axios';

export const getUserDetails = async (_address) => {
    
        try {
    
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/details/${_address}`)
    
            const parsedData = parseData(response.data);
    
            return parsedData;
    
        } catch (error) {
    
            console.error("Error fetching user details:", error);
            return null;
    
        }
}

const parseData = (data) => {
    if (!data || !data.user || !Array.isArray(data.user)) {
        return null;
    }

    const [
        role,
        name,
        email,
        phone
    ] = data.user;

    return {
        role,
        name,
        email,
        phone
    };
}