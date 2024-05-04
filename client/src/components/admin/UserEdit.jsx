import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../../services/api';
import { IoMdSearch } from 'react-icons/io';

const UserEdit = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = props;
    const [searchTerm, setSearchTerm] = useState('');

    const gotoCreateNew =()=>{
        navigate('/admin/users/create-new');

    }
    const gotoUserList = ()=>{
        navigate('/admin/users');

    }
    

    const [formData, setFormData] = useState({
        id:'',
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({id:id});
        const result = await updateUser(formData);
        console.log("formData",result);

        if (result.success === 200) {
            navigate('/admin/users');
        }

        // Reset form data
        setFormData({ name: '', email: '', password: '' });
    };


    useEffect(() => {
        const fetchUserById = async () => {
          try {
            console.log("userInfoID", id);

            const user = await getUserById(id);
            console.log("userInfo", user);
            setFormData(user);
            setUser(user);
          } catch (error) {
            // Handle error
            console.error('Error:', error);
          }
        };
        fetchUserById();
      }, []);
    return (
        <div className='w-full h-auto flex flex-col p-3'>
            {/* <p className='text-sm ml-10'> <span className='text-gray-500'>Trang chủ /</span>&nbsp;Quản trị viên</p> */}
            <div className='flex items-center gap-3 my-5'>
                <button onClick={gotoUserList} className='text-lg font-semibold'>Danh sách</button>
                <button onClick={gotoCreateNew} className='w-24 h-9 p-4 bg-insert text-white rounded flex justify-center items-center hover:shadow-lg'>Tạo mới</button>
            </div>
            {/* <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                    <input type="radio"
                        className='h-4 w-4 text-green-500 focus:bg-green-500 p-3'
                        checked />
                    <label className='flex items-center'> Tất cả </label>
                </div>
                <div className='flex'>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <input
                                type="text"
                                className="w-full py-1 px-3 outline-none rounded-tl-md rounded-bl-md"
                                placeholder="Tìm kiếm"
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            <button
                                className="p-2 border scale-105 shadow-sm text-gray-500 bg-white hover:bg-gray-100 rounded-tr-md rounded-br-md"
                            >
                                <IoMdSearch />
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto overflow-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-medium">
                        Username: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-medium">
                        Email: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium">
                        Password <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
               
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2 font-medium">
                        Phone Number: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block mb-2 font-medium">
                        Date of Birth: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="gender" className="block mb-2 font-medium">
                        Gender <span className="text-lg text-red-500">*</span>
                    </label>
                    <div>
                        <label htmlFor="male" className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                className="form-radio text-blue-500"
                                required
                            />
                            <span className="ml-2">Male</span>
                        </label>
                        <label htmlFor="female" className="inline-flex items-center">
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                className="form-radio text-blue-500"
                                required
                            />
                            <span className="ml-2">Female</span>
                        </label>
                    </div>
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="address" className="block mb-2 font-medium">
                        Address: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="avatar" className="block mb-2 font-medium">
                        Avatar: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type=""
                        id="avatar"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="workAddress" className="block mb-2 font-medium">
                        Work Address: <span className="text-lg text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="workAddress"
                        name="workAddress"
                        value={formData.workAddress}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                        required
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="referCode" className="block mb-2 font-medium">
                        Reference Code:
                    </label>
                    <input
                        type="text"
                        id="referCode"
                        name="referCode"
                        value={formData.referCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                    />
                </div> */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>

    );
}

export default UserEdit