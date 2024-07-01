import React, { ReactNode, useEffect, useState } from "react";
import { Form, Image, Modal, Upload, UploadFile, UploadProps } from "antd";

interface MUploadImageMultipleProps extends UploadProps {
    children?: ReactNode;
    initFileList?: string[];
    formName?: (string | number)[];
}

const MUploadImageMultiple: React.FC<MUploadImageMultipleProps> = (props) => {
    const { initFileList, formName, ...rest } = props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const getFile = (e: UploadProps) => {
        if (Array.isArray(e)) {
            return e;
        }
        const result = e?.fileList?.map((img) => ({
            url: img.response?.data[0].url,
        }));
        return result;
    };

    useEffect(() => {
        if (initFileList) {
            const newFileList: UploadFile[] = initFileList.map((item, i) => ({
                thumbUrl: item,
                uid: i + "",
                name: item,
            }));
            setFileList(newFileList);
        }
    }, [initFileList]);

    return (
        <>
            <Form.Item
                label="Images"
                name={formName || "images"}
                getValueFromEvent={getFile}
                rules={[
                    {
                        required: true,
                        message: "Image is required",
                    },
                    {
                        validator(_, fileList) {
                            return new Promise((resolve, reject) => {
                                if (fileList && fileList.length > 5) {
                                    reject("Images is limit 5");
                                } else {
                                    resolve("Success");
                                }
                            });
                        },
                    },
                ]}
            >
                <Upload
                    name="file"
                    action={`${process.env.API_URL}UploadPhoto/upload`}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    multiple
                    accept="image/*"
                    {...rest}
                >
                    {fileList.length < 5 && "Upload"}
                </Upload>
            </Form.Item>
        </>
    );
};

export default MUploadImageMultiple;
