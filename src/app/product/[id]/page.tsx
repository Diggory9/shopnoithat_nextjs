import ApiProduct from "@/api/product/product-api"
import { DetailProduct } from "@/app/product/components/product-detail"

const getData = async (id: string) => {
    const data = await ApiProduct.getDetailProducts(id);
    return data
}
export default async function ProductDetail({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    return <DetailProduct data={data?.data} />
}
