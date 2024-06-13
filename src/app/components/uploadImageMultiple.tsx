import React, { ReactNode, useEffect, useState } from 'react';
import { Form, Image, Modal, Upload, UploadFile, UploadProps } from 'antd';


interface MUploadImageMultipleProps extends UploadProps {
	children?: ReactNode;
	initFileList?: string[];
}

const MUploadImageMultiple: React.FC<MUploadImageMultipleProps> = (props) => {
	const { children, initFileList, ...rest } = props;
	const [previewOpen, setPreviewOpen] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		setPreviewImage(file?.response?.image || file?.thumbUrl || '');
		setPreviewOpen(true);
	};

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const getFile = (e: UploadProps) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e?.fileList;
	};

	useEffect(() => {
		if (initFileList) {
			const newFileList: UploadFile[] = initFileList.map((item, i) => ({
				thumbUrl: item,
				uid: i + '',
				name: item,
			}));
			setFileList(newFileList);
		}
	}, [initFileList]);

	return (
		<>
			<Form.Item
				label='Images'
				name='imageUploads'
				getValueFromEvent={getFile}
				rules={[
					{
						required: true,
						message: 'Image is required',
					},
					{
						validator(_, fileList) {
							return new Promise((resolve, reject) => {
								if (fileList && fileList.length > 5) {
									reject('Images is limit 5');
								} else {
									resolve('Success');
								}
							});
						},
					},
				]}
			>
				<Upload
					name='image'
					action={`${process.env.API_UPLOAD_URL}cloudinary-upload`}
					listType='picture-card'
					fileList={fileList}
					onChange={onChange}
					onPreview={handlePreview}
					multiple
					accept='image/*'
					{...rest}
				>
					{!props.disabled && fileList.length < 5 && children}
				</Upload>
			</Form.Item>
			<Modal
				open={previewOpen}
				// title={previewTitle}
				footer={null}
				onCancel={handleCancel}
				className='flex justify-center'
			>
				<Image
					alt='example'
					style={{ width: '100%' }}
					src={previewImage}
					preview={false}
				/>
			</Modal>
		</>
	);
};

export default MUploadImageMultiple;
