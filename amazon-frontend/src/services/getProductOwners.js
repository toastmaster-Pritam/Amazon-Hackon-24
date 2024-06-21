import axios from 'axios';

export const getProductOwners = async (_uniqueHash) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/getOwnerHistory/${_uniqueHash}`);
        const parsedData = parseProductOwners(response.data);
        return parsedData;
    } catch (error) {
        console.error("Error fetching product owners:", error);
        return null;
    }
}

const parseProductOwners = (data) => {
    if (!data || !data.history || !Array.isArray(data.history)) {
        return null;
    }

    return data.history.map(item => {
        const parts = item.split(',');
        if (parts.length !== 2) {
            return null; // Invalid format
        }

        let role = '';
        const roleCode = parts[0].trim();

        switch (roleCode) {
            case '1':
                role = 'Manufacturer';
                break;
            case '2':
                role = 'Seller';
                break;
            case '3':
                role = 'Consumer';
                break;
            default:
                role = 'Unknown';
                break;
        }

        const address = parts[1].trim();

        return { role, address };
    }).filter(owner => owner !== null); // Remove any invalid entries
}
