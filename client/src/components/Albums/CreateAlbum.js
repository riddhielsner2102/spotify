import React from 'react';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../redux/action/album'; // Import the createAlbum action


const CreateAlbumForm = ({ onCreate }) => {
  const navigate = useNavigate()
    const dispatch = useDispatch();
    const album = useSelector((state) => state.album.album);
    console.log("🚀 ~ file: CreateAlbum.js:13 ~ CreateAlbumForm ~ album:", album)
    const error = useSelector((state) => state.album.error);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('artist', values.artist);
    formData.append('releaseDate', values.releaseDate);

    // Append coverImage as a binary file
    if (values.coverImage && values.coverImage.length > 0) {
      formData.append('coverImage', values.coverImage[0].originFileObj);
    }

    // Append audioFile as a binary file
    if (values.audioFile && values.audioFile.length > 0) {
      formData.append('audioFile', values.audioFile[0].originFileObj);
    }

    // Dispatch the createAlbum action with formData
    dispatch(createAlbum(formData));
    form.resetFields();
    if(album)
    {
      navigate('/albumListing')
    }

  };

  // Custom function to handle file upload errors
  const handleUploadError = (info) => {
    if (info.file.error) {
      message.error('File upload failed.');
    }
  };

  return (
    <>
        <h2 style={{textAlign:"center"}}>Create Album</h2>
    <Form form={form} onFinish={onFinish} className='form' layout="vertical">
      {/* ... Other form fields ... */}
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please enter the title of the album',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Artist"
        name="artist"
        rules={[
          {
            required: true,
            message: 'Please enter the artist of the album',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Release Date"
        name="releaseDate"
        rules={[
          {
            required: true,
            message: 'Please select the release date of the album',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      
      <Form.Item
        label="Cover Image"
        name="coverImage"
        accept="image/*"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        rules={[
          {
            required: true,
            message: 'Please upload a cover image for the album',
          },
        ]}
      >
        <Upload
          listType="picture"
          accept="image/*"
          customRequest={() => {}}
          beforeUpload={() => false}
          className="cover-image-upload" // Custom CSS class for styling

        >
          <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Audio File"
        name="audioFile"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        className="audio-file-upload" // Custom CSS class for styling

        rules={[
          {
            required: true,
            message: 'Please upload an audio file for the album',
          },
        ]}
      >
        <Upload
          listType="text"
          accept=".mp3" // Restrict to MP3 files
          customRequest={() => {}}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Upload Audio File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Album
        </Button>
      </Form.Item>
    </Form>
    </>

  );
};

export default CreateAlbumForm;
