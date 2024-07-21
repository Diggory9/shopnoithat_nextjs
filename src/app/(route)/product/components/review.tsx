import ApiReview from "@/api/review/review-api";
import { formatDateToRender } from "@/utils/config";
import { Rate } from "antd";
import { useEffect, useState } from "react";
interface Review {
    id: string;
    rating: number;
    content: string;
    userName: string;
    createAt: string;
    reviewImages?: { url: string }[];
}

interface ReviewsResponse {
    totalCount: number;
    averageRating: number;
    data: Review[];
}
export default function Review({ params }: { params: { id: string } }) {
    const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
    useEffect(() => {
        const fetDataReviews = async () => {
            try {
                ApiReview.getReviews(params.id, 1, 10)
                    .then((res) => {
                        setReviews(res);
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.error("Error fetching reviews :", error);
            }
        };
        fetDataReviews();
    }, [params.id]);
    console.log("tb", reviews?.averageRating);

    return (
        <div className="h-max container w-full">
            <div className="max-w-md mx-auto p-4 pt-6 bg-white rounded shadow-md">
                {!reviews ? (
                    <div>Chua co rev</div>
                ) : (
                    <>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">
                                Tổng số đánh giá: {reviews?.totalCount}
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={reviews.averageRating}
                                ></Rate>
                            </span>
                            <span className="text-gray-600">
                                Đánh giá trung bình: {reviews?.averageRating}
                            </span>
                        </div>
                        {reviews?.data.map((item) => (
                            <ul className="list-none mb-0">
                                {/* {{# reviews.data }} */}
                                <li className="py-4 border-b border-gray-200">
                                    <div className="text-gray-600">
                                        <span className="text-sm text-red-500">
                                            Đánh giá bởi {item.userName} vào{" "}
                                            {formatDateToRender(item.createAt)}
                                        </span>
                                        <div>
                                            {" "}
                                            <Rate
                                                allowHalf
                                                disabled
                                                defaultValue={item.rating}
                                            ></Rate>
                                        </div>

                                        <p>{item.content}</p>
                                        <div className="flex">
                                            {item?.reviewImages?.map(
                                                (image) => (
                                                    <img
                                                        src={image.url}
                                                        alt="Image"
                                                        className="w-20 h-20 rounded-full mr-2"
                                                    ></img>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
