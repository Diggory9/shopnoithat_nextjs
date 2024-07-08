import ApiProduct from "@/api/product/product-api";
import { DetailProduct } from "../components/product-detail";

const getData = async (id: string) => {
    const data = await ApiProduct.getDetailProduct(id);
    return data;
};
export default async function ProductDetail({
    params,
}: {
    params: { id: string };
}) {
    const data = await getData(params.id);
    return <DetailProduct data={data?.data} />;
}
