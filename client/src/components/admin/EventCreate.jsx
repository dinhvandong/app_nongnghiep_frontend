import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createEvent, createRoom, createUser, uploadFile } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'
import UserTable from '../table/UserTable';
import { MdAdd } from 'react-icons/md';
import RoomTable from '../table/RoomTable';
import EventTable from '../table/EventTable';

const EventCreate = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');
    // const [selectedType, setSelectedType] = useState('');

    const eventTypes = ['Flexible Rate', 'Non-Refundable Rate'];
    // const handleInputChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    // const handleTypeSelection = (type) => {
    //     setSelectedType(type);
    // };
    // const gotoCreateNew = () => {
    //     navigate('/admin/users/room-new');

    // }
    // const gotoUserList = () => {
    //     navigate('/admin/room');

    // }
    const [formData, setFormData] = useState({
        name: '',
        subName: '',
        type: '',
        icon:''
    });

    // const handleInsert = () => {
    //     console.log("Item_SIZE:", items);

    //     const newItem = {
    //         id: (items.length +1), // Generate a unique ID for the new item
    //         item: 'Dịch vụ ' + items.length ,
    //         active: true // Initialize the value as an empty string
    //     };


    //     setFormData((prevData) => ({
    //         ...prevData,
    //         roomItemList: [...prevData.roomItemList, newItem]
    //       }));

    //    setItems((prevItems) => [...prevItems, newItem]);

    //     //console.log("Item_SIZE:", items);
    // }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [file, setFile] = useState(noImage);

    const handleFileUpload = async (file) => {
        // Handle the file upload logic here
        console.log(file);

        const response = await uploadFile(file);
        const fileResponse = API_URL_IMAGE + response.data;
        setFile(fileResponse);
        console.log("upload-file", fileResponse);

        setFormData(prevFormData => ({
            ...prevFormData,
            icon: response.data
        }));


    };

    // function handleInputChangeItem(e, itemId) {
    //     const updatedItems = items.map((item) => {
    //       if (item.id === itemId) {
    //         return { ...item, item: e.target.value };
    //       }
    //       return item;
    //     });
      
    //     setItems(updatedItems);
    //     console.log("Items-List:", items);
    //   }
    const handleSubmit = async (e) => {
        e.preventDefault();
      //  console.log("items::", items);
        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     icon: file
        // }));

        console.log("formDataEvent::", formData);
        const result = await createEvent(formData);
        if (result.success === 200) {
            navigate('/admin/event');
        }
        // Reset form data
    };

    return (
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>
            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Tạo mới sự kiện</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className="flex w-full h-auto m-5 mx-auto">

                <div className='flex flex-col w-1/3 h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-2 font-medium">
                                Event type: <span className="text-lg text-red-500">*</span>
                            </label>
                           

                            <select
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Type of Event</option>
                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Event Name: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="subName" className="block mb-2 font-medium">
                                Event Desc: <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="subName"
                                name="subName"
                                value={formData.subName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Icon: <span className="text-lg text-red-500">*</span>
                            </label>
                            <Upload
                                id='icon' name='icon'
                                beforeUpload={() => false} // Prevent automatic file upload
                                onChange={(info) => handleFileUpload(info.file)}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                        </div>
                        <div className="mb-2">
                            <img src={file} className='w-[100px] h-[100px]' />

                        </div>                     

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-5 text-white rounded bg-base_color hover:bg-orange-600"
                        >
                            Tạo mới sự kiện
                        </button>
                    </form>
                </div>
                <div className='flex flex-col w-2/3 h-auto'>

                    <div className="flex w-[100%] ml-5 mr-2 flex-row justify-center">
                        <EventTable />
                    </div>

                </div>

            </div>


        </div>

    );
}

export default EventCreate