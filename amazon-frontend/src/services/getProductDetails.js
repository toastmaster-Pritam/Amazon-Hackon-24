import axios from 'axios';

export const getProductDetails = async (_uniqueHash) => {

    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/getProductDetails/${_uniqueHash}`)

        const parsedData = parseData(response.data);

        return parsedData;

    } catch (error) {

        console.error("Error fetching product details:", error);
        return null;

    }

}

const parseData = (data) => {
    if (!data || !data.product || !Array.isArray(data.product)) {
        return null;
    }

    const [
        id,
        name,
        brandId,
        manufacturer,
        currentOwner,
        details,
        uniqueHash,
        delisted,
        productImage
    ] = data.product;

    return {
        id,
        name,
        brandId,
        manufacturer,
        currentOwner,
        details,
        uniqueHash,
        delisted,
        productImage
    };
}
