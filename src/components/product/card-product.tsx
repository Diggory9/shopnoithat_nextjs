
import { MProduct } from "@/models/productmodel";
import { numberFormatLocationVietNam } from "@/helper/helper";
import { redirect } from "next/navigation";
interface CardProductProps {
    product: MProduct
}

const hanleRedirectButton = (id?: string) => {
    redirect(`/product/${id}`)
}

const CardProduct = ({ product }: CardProductProps) => {
    console.log(product);
    const price = !product.productDiscount?.type ? product.price : product.price! - (product.price! * (product.productDiscount.value! / 100))
    return (<a
        key={product.id}
        href={`/product/${product.id}`}
        className="group border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg"
    >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            )}
        </div>
        <p className="mt-4 text-black text-lg font-semibold border-t-2 border-gray-300">
            {product.name}
        </p>

        <div className="mt-2">
            {
                product.productDiscount?.type ? (
                    <>
                        <span className="ml-2 text-lg text-red-600 font-extralight">
                            {numberFormatLocationVietNam(price || 0)}
                        </span>
                        <span className="text-base line-through text-gray-500">
                            {numberFormatLocationVietNam(product.price || 0)}
                        </span>

                    </>

                ) :
                    <span className="text-lg  font-extralight">
                        {numberFormatLocationVietNam(price || 0)}
                    </span>
            }

        </div>
        <div >
            <button onClick={() => {
                hanleRedirectButton(product.id)
            }}
                className="bg-transparent hover:bg-green-900 text-black-700 font-semibold hover:text-white py-2 px-4  mt-2 border border-green-900 hover:border-transparent rounded">
                Xem Thêm
            </button>
        </div>

    </a>)
}
export default CardProduct