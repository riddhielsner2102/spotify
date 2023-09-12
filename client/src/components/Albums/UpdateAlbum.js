import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  createAlbum,
  readAlbum,
  readAlbums,
  updateAlbum,
} from "../../redux/action/album";

const UpdateAlbum = ({ onCreate }) => {
  const [initalData, setInitialData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const album = useSelector((state) => state.album.album);
  const error = useSelector((state) => state.album.error);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("artist", values.artist);
    formData.append("releaseDate", values.releaseDate);

    if (values.coverImage && values.coverImage.length > 0) {
      formData.append("coverImage", values.coverImage[0].originFileObj);
    }

    if (values.audioFile && values.audioFile.length > 0) {
      formData.append("audioFile", values.audioFile[0].originFileObj);
    }

    dispatch(updateAlbum(params.id, formData));
    navigate("/albumListing");
  };

  useEffect(() => {
    dispatch(readAlbum(params.id));
    if (album) {
      setInitialData(album);
    }
  }, []);

  useEffect(() => {
    if (album) {
      setInitialData(album);
      form.setFieldsValue({
        title: album.title,
        artist: album.artist,
        releaseDate: moment(album.releaseDate),
      });
    }
  }, [album, form]);
  const fileList = [
    {
      uid: '-1',
      name: album?.audioFile,
      status: 'done',
      url: `http://localhost:5000/${album?.audioFile}`,
    },
  ];
  const fileList1 = [
    {
      uid: '-1',
      name: album?.coverImage,
      status: 'done',
      url: `http://localhost:5000/${album?.coverImage}`,
    },
  ];
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Update Album</h2>
      <Form form={form} onFinish={onFinish} className="form" layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          initialValue={initalData?.title ? initalData?.title : null}
          rules={[
            {
              required: true,
              message: "Please enter the title of the album",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Artist"
          name="artist"
          initialValue={initalData?.artist ? initalData?.artist : null}
          rules={[
            {
              required: true,
              message: "Please enter the artist of the album",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Release Date"
          name="releaseDate"
          initialValue={
            initalData?.releaseDate ? moment(initalData?.releaseDate) : null
          }
          rules={[
            {
              required: true,
              message: "Please select the release date of the album",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Cover Image"
          name="coverImage"
          valuePropName="fileList"
          accept="image/*"
          getValueFromEvent={(e) => e.fileList}
          rules={[
            {
              required: true,
              message: "Please upload a cover image for the album",
            },
          ]}
          initialValue={fileList1}
        >
          <Upload
            listType="picture"
            accept="image/*"
            maxCount={1}
            customRequest={() => {}}
            beforeUpload={() => false}
            className="cover-image-upload"
          >
            <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Audio File"
          name="audioFile"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          className="audio-file-upload"
          rules={[
            {
              required: true,
              message: "Please upload an MP3 audio file for the album",
            },
          ]}
          initialValue={fileList}
        >
          <Upload
            listType="text"
            accept=".mp3"
            customRequest={() => {}}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload MP3 Audio File</Button>
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

export default UpdateAlbum;
