import { MReview } from "@/models/review"
import { toast } from "sonner";

const ApiReview = {
    async createReview(values: MReview) {
        try {
            const response = await fetch(`${process.env.API_URL}Review/create-review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            if (response.ok) {

                toast.success("Đánh giá sản phẩm thành công");
            } else {
                toast.error("Thông tin không hợp lệ ");

            }
        } catch (error) {
            console.error("Error create review:", error);
        }
    },
    async getReviews(id: string, pageNumber: 1, pageSize: 10) {
        try {
            const response = await fetch(`${process.env.API_URL}Review/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error create review:", error);
        }

    }
}
export default ApiReview;