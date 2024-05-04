import React, { useState } from "react";
import tasks from "../../assets/tasks.png";
import tickets from "../../assets/tickets.png";
import comments from "../../assets/comments.png";
import visitors from "../../assets/visitors.png";
import bieudo from "../../assets/bieudo.png";
import bieudo2 from "../../assets/bieudo2.png";
import arrow3 from "../../assets/arrow3.png";
import UserTable from './../table/UserTable';
import { Button } from "antd";
import { GotoCreateNew } from "../../utils/navigationPage";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from 'react-icons/io';
import { archiveGold } from './../../services/api_gold';

const UserInterfaceAdmin = () => {
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [gold, setGold] = useState(0);

  const handleUsernameChange = (event) => {
    console.log("AAAA:", event.target.value);
    setUsername(event.target.value);
  };

  const handleGoldChange = (event) => {
    console.log("BBB:", event.target.value);

    setGold(event.target.value);
  };
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  const handleInsert = () => {
    navigate("/admin/users/create-new");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username:", username);
    console.log("gold:", gold);
    const response = await archiveGold(username, gold);
    console.log("response:", response);
    window.location.reload();

  }
  
  return (
    <div className='flex flex-col w-full h-auto '>
      <div className="w-full h-[50px] bg-base_color">

      </div>
      <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
        <p className="font-bold">Danh sách tài khoản đăng ký</p>
      </div>

      <div className='h-[1px] bg-base_color w-full'></div>

      {/* <Button className="w-[120px] text-center font-bold ml-5 mb-5 bg-blue-500" type="primary" onClick={handleInsert}>
      NEW USER
    </Button> */}
      <div className='flex flex-row m-5'>
        <div className='flex items-center gap-3'>
          <input type="radio"
            className='w-4 h-4 p-3 text-green-500 focus:bg-green-500'
            checked />
          <label className='flex items-center'> Tất cả </label>
        </div>
        <div className='flex ml-5'>
          <form>
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type="text"
                className="w-full px-3 py-1 outline-none rounded-tl-md rounded-bl-md"
                placeholder="Tên tài khoản"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="text"
                className="w-full px-3 py-1 ml-5 outline-none rounded-tl-md rounded-bl-md"
                placeholder="Số điểm nạp"
                value={gold}
                onChange={handleGoldChange}
              />
              <button onClick={handleSubmit}
                className="p-2 text-gray-500 scale-105 bg-green-500 border shadow-sm hover:bg-gray-100 rounded-tr-md rounded-br-md"
              >
                Nạp
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-[100%] ml-5 flex-row justify-center">
        <UserTable />


      </div>

    </div>
  );
};

export default UserInterfaceAdmin;
