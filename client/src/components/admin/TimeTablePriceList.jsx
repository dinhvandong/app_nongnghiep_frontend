import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL_IMAGE, createRoom, createUser, uploadFile } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';
import { Button, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import noImage from '../../assets/avatar-default-icon.png'
import UserTable from '../table/UserTable';
import { MdAdd } from 'react-icons/md';
import RoomTable from '../table/RoomTable';
import TimePriceTable from '../table/TimePriceTable';
import { createPriceArray } from '../../services/api_price_by_date';

const TimeTablePriceList = () => {
    const navigate = useNavigate();
    // const [items, setItems] = useState([]);

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
        roomType: '',
        priceBase: '',
        description: '',
        thumb: '',
        roomItemList: []

    });



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };




    // function handleInputChangeItem(e, itemId) {
    //     const updatedItems = items.map((item) => {
    //         if (item.id === itemId) {
    //             return { ...item, item: e.target.value };
    //         }
    //         return item;
    //     });
    //     setItems(updatedItems);
    //     console.log("Items-List:", items);
    // }

    // const handleSearch = () => {

    // }

    const [searchTerm, setSearchTerm] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [priceDay, setPriceDay] = useState(0);
    const [priceDinner, setPriceDinner] = useState(0);

    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    // };

    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    // };


    const handleStartDateChange = (date, dateString) => {
        const formattedDate = dateString.replace(/-/g, '/');
        console.log(formattedDate);
        setStartDate(formattedDate);
    };


    const handleEndDateChange = (date, dateString) => {
        const formattedDate = dateString.replace(/-/g, '/');
        console.log(formattedDate);
        setEndDate(formattedDate);
    };

    const handlePriceDayChange = (e) => {
        setPriceDay(e.target.value);

    }

    const handlePriceDinnerChange = (e) => {
        setPriceDinner(e.target.value);
    }
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createPriceArray(startDate, endDate, priceDay, priceDinner);
        console.log("Data_Response:", result.data);

        handleRefresh();
        //createPriceArray = async (dateFrom, dateTo, priceDay, priceDinner)

        // console.log("items::", items);
        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     thumb: file
        // }));
        // console.log("roomItemList::", formData);
        // const result = await createRoom(formData);
        // if (result.success === 200) {
        //     navigate('/admin/room');
        // }
        // // Reset form data
        // setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className='flex flex-col w-full h-auto'>

            <div className="w-full h-[50px] bg-base_color">

            </div>

            {/* <div className='flex w-full bg-base_color'>

                <div className='w-1/2'></div>

                <div className='w-1/2'>

                    <div className='flex flex-row m-5'>
                        <div className='flex items-center gap-3'>
                            <input type="radio"
                                className='w-4 h-4 p-3 text-green-500 focus:bg-green-500'
                                checked />
                            <label className='flex items-center'> Tất cả </label>
                        </div>
                        <div className='flex ml-5'>
                            <form onSubmit={handleSearch}>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-1 outline-none rounded-tl-md rounded-bl-md"
                                        placeholder="Tìm kiếm"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        className="p-2 text-gray-500 scale-105 bg-white border shadow-sm hover:bg-gray-100 rounded-tr-md rounded-br-md"
                                    >
                                        <IoMdSearch />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div> */}


            {/* <p className='ml-10 text-sm'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Tạo mới bảng giá</p>
            </div>
            <div className='h-[1px] bg-base_color w-full'></div>
            <div className="flex w-full h-auto m-5 mx-auto">

                <div className='flex flex-col w-[49%] h-auto m-2'>
                    <form onSubmit={handleSubmit} className="w-full mx-auto mt-2 ml-5 mr-5">

                        <div className="mb-2">
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Select start date"
                                dateFormat='YYYY-MM-DD'
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="mb-2">
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Select end date"
                                dateFormat='YYYY-MM-DD'
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                        </div>


                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Giá ban ngày (Flexible): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="priceBase"
                                name="priceBase"
                                value={priceDay}
                                onChange={handlePriceDayChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-2 font-medium">
                                Giá ban ngày (Non-refund): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="priceBase"
                                name="priceBase"
                                value={priceDay}
                                onChange={handlePriceDayChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Giá ban đêm (Flexible): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="description"
                                name="description"
                                value={priceDinner}
                                onChange={handlePriceDinnerChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="description" className="block mb-2 font-medium">
                                Giá ban đêm (Non-refund): <span className="text-lg text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="description"
                                name="description"
                                value={priceDinner}
                                onChange={handlePriceDinnerChange}
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-5 text-white rounded bg-base_color hover:bg-orange-600"
                        >
                            Tạo bảng giá
                        </button>
                    </form>
                </div>

                <div className="flex ml-5 w-[2px] h-full bg-base_color">

                </div>
                <div className='flex flex-col w-[49%] h-auto ml-5'>
                    <div className="flex w-[100%] ml-5 mr-2 flex-row justify-center">
                        <TimePriceTable />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TimeTablePriceList