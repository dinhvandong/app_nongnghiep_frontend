import React, { useEffect, useState } from 'react';
import { convertDateFormat, createGallery, deleteUser, getGalleries, getRooms, getUsers } from '../../services/api'
import { Button, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/avata.png'
import './UserTable.css'; // Import your custom CSS file
//import './tableStyle.css';
const GalleryFolderTable = (props) => {
  const [galleries, setGalleries] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log('Edit clicked for ID:', id);
    //navigate(`/admin/room/update/${id}`)

    props.onChildCallback(id);

  };

  const handleDelete = async (id) => {
    console.log('Delete clicked for ID:', id);
    const response = await deleteUser(id);
    refreshData();
    console.log("delete:", response);
  };

  const refreshData = async () => {
    try {
      const galleryList = await createGallery();
      console.log("galleryList", galleryList);
      setGalleries(galleryList);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  }

  const getRowClassName = (record, index) => {
    return index %2===1 ? 'row-even' : 'row-odd';
  };

  useEffect(() => {
    const fetGallery = async () => {
      try {
        const galleryList = await getGalleries();
        console.log("galleryList", galleryList);
        setGalleries(galleryList);
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    };
    fetGallery();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // width: '10%'
    },
    {
      title: 'Chủ đề',
      dataIndex: 'topic',
      key: 'topic',
      // width: '20%'

    },

    {
        title: 'Mô tả',
        dataIndex: 'shortDesc',
        key: 'shortDesc',
        // width: '20%'
  
      },
//shortDesc
    // {
    //   title: 'Ngày tạo',
    //   dataIndex: 'createdDate',
    //   key: 'createdDate',
    //   render: (text) => convertDateFormat(text),
    //  // width: '20%'

    // },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button className="text-white bg-edit" type="primary" onClick={() => handleEdit(record.id)}>Chỉnh sửa</Button>
          <Button className="mr-5 text-white bg-delete" type="danger" onClick={() => handleDelete(record.id)}>Xóa</Button>
          {/* <Button className="mr-5 text-white bg-emerald-500" type="danger" onClick={() => handleDelete(record.id)}>Kích hoạt</Button> */}
          {/* <Button className="mr-5 text-white bg-history" type="danger" onClick={() => handleDelete(record.id)}>Xem lịch sử</Button> */}

        </Space>
      ),
    },
    // Add more columns as needed
  ];
  return (
    <div className="w-[100%]  flex justify-center items-center">
      <Table style={{ width: '100%', fontFamily: 'Courier New ' }} rowClassName={getRowClassName} dataSource={galleries} columns={columns} />
    </div>
  );
};

export default GalleryFolderTable