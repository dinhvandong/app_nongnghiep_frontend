import React, { useEffect, useState } from "react";
import tasks from "../../assets/tasks.png";
import tickets from "../../assets/tickets.png";
import comments from "../../assets/comments.png";
import visitors from "../../assets/visitors.png";
import bieudo from "../../assets/bieudo.png";
import bieudo2 from "../../assets/bieudo2.png";
import arrow3 from "../../assets/arrow3.png";
import UserTable from '../table/UserTable';
import { Button } from "antd";
import { GotoCreateNew } from "../../utils/navigationPage";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from 'react-icons/io';
import { MdAdd } from "react-icons/md";
import RoomTable from "../table/RoomTable";
import { FaUserCircle } from "react-icons/fa";

import { IoCloseCircle } from "react-icons/io5";

import { createChatCoffeeRobusta, createChatCoffeeVn, getChatCoffeeRobusta, getChatCoffeeVn, getLastMessageChatCoffeeRobusta, getLastMessageChatCoffeeVn, getRooms } from "../../services/api";
import { createCommandCoffeeRobusta, getCommandCoffeeRobusta } from "../../services/api_command_coffeerobusta";
const ChatBoxCoffeeRobusta = () => {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    // const handleInputChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };
    // };
    const toggleSwitch = () => {
        setIsOn(!isOn);
    };
    const createNewRoom = () => {
        navigate("/admin/room/create-new");
    };
    const handleSearch = () => {

    }

    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    const handleUserClick = (sender) => {
        setSelectedUser(sender);
        setShowPopup(true);
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            const newMessage = {
                id: 1,
                senderID: 1,
                content: message,
            };

            const response = await createChatCoffeeRobusta(newMessage);

            fetChatCoffeeVn();
            //  setChatMessages([...chatMessages, newMessage]);
            setMessage('');
        }
    };

    const [message, setMessage] = useState('');
    const [lastMessage, setLastMessage] = useState({
        "id": 0,
        "senderID": 0,
        "sender": "",
        "createdDate": 0,
        "createDateUTCString": "",
        "email": "",
        "content": ""
    });
    const [chatMessages, setChatMessages] = useState([

    ]);

    const [commandCoffeeVnList, setCommandCoffeeVnList] = useState([]);



    const fetChatCoffeeVn = async () => {
        try {
            const chatList = await getChatCoffeeRobusta();
            console.log("chatList0:", chatList[0]);
            if (chatList.length > 0) {
                setLastMessage(chatList[0]);
            }
            console.log("chatList", chatList);
            //setChatMessages(chatList);
            setChatMessages([...chatList].reverse());

        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };


    const fetCommandCoffeeVn = async () => {
        try {
            const commandVn = await getCommandCoffeeRobusta();
            setCommandCoffeeVnList([...commandVn].reverse());
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetChatCoffeeVn();
    }, []);

    useEffect(() => {

        const interval = setInterval(fetCommandCoffeeVn, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLastMessageChatCoffeeRobusta();

                console.log("chatResponse:", response);
                console.log("lastMessage:", lastMessage);

                const timer = response.createdDate;
                const timerLast = lastMessage.createdDate;

                if (timer - timerLast > 0) {
                    fetChatCoffeeVn();

                }
                console.log(response);
                // Process the API response data here
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const interval = setInterval(fetchData, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function convertDate(inputDate) {
        const year = inputDate.toString().substring(0, 4);
        const month = inputDate.toString().substring(4, 6);
        const day = inputDate.toString().substring(6, 8);
        const hours = inputDate.toString().substring(8, 10);
        const minutes = inputDate.toString().substring(10, 12);
        const seconds = inputDate.toString().substring(12, 14);

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    const [value, setValue] = useState(0);

    const handleValueChange = (e) => {
        setValue(e.target.value);
    };

    //   const handleSendMessage = async () => {
    //     if (message.trim() !== '') {
    //         const newMessage = {
    //             id: 1,
    //             senderID: 1,
    //             content: message,
    //         };

    //         const response = await createChatCoffeeVn(newMessage);

    //         fetChatCoffeeVn();
    //         //  setChatMessages([...chatMessages, newMessage]);
    //         setMessage('');
    //     }
    // };

    const handleCreateCommandCoffeeVn = async (value, money, username) => {

        const newCommand = {
            value: value,
            money: money,
            username: username
        };

        const response = await createCommandCoffeeRobusta(newCommand);
        setShowPopup(false);
        //createCommandCoffeeVn


    }

    // const messages = [
    //     { id: 1, sender: 'John', text: 'Hello' },
    //     { id: 2, sender: 'Jane', text: 'Hi, how are you?' },
    //     { id: 3, sender: 'John', text: 'I\'m good, thanks!' },
    //     // Add more messages here
    // ];
    return (
        <div className='flex flex-col w-full h-auto '>
            <div className="w-full h-[50px] bg-base_color">

            </div>
            <div className="flex justify-start mt-5 ml-5 md:justify-center sm:justify-center lg:justify-start">
                <p className="font-bold">Phòng chat Coffee Robusta</p>
            </div>
            <div className="flex">

                <button className="px-5 py-1 ml-5 text-white bg-green-500 rounded">Đặt lệnh xanh</button>
                <button className="px-5 py-1 ml-5 text-white bg-red-500 rounded ">Đặt lênh đỏ</button>


            </div>
            <div className='mt-1 h-[1px] flex bg-base_color w-full'>

            </div>

            <div className="flex w-[100%] ml-5 flex-row justify-center">

                <div className="w-1/2 h-full">
                    <div className="mt-5 font-bold">Cửa sổ tin nhắn</div>
                    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md ">
                        <ul className="space-y-4">
                            {chatMessages.map((message, index) => (
                                <li
                                    key={message.id}
                                    className={`flex items-start ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                                        }`}
                                >
                                    {index % 2 === 0 && (
                                        <div className="mr-2">
                                            <FaUserCircle className="w-5 h-5 text-blue-500" />
                                        </div>
                                    )}
                                    <div
                                        className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-[#79E08F]' : 'bg-blue-500 text-white'
                                            }`}
                                        onClick={() => handleUserClick(message.sender)}
                                    >
                                        <span className="font-bold">{message.sender}: </span>
                                        <span>{message.content}</span>
                                    </div>
                                    {index % 2 !== 0 && (
                                        <div className="ml-2">
                                            <FaUserCircle className="w-5 h-5 text-blue-500" />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="flex mt-4">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your message..."
                                value={message}
                                onChange={handleInputChange}
                            />
                            <button
                                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>

                        {showPopup && (
                            <div className="fixed inset-0 flex items-center justify-center w-full h-full">
                                <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
                                    <p className="font-bold text-center">{selectedUser}</p>


                                    <input onChange={handleValueChange} className="w-full mt-5" placeholder="Số tiền đặt cược:" />
                                    <button
                                        className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded hover:bg-blue-600"
                                        onClick={() => handleCreateCommandCoffeeVn(1, value, selectedUser)}
                                    >
                                        Gửi lệnh xanh
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-blue-600"
                                        onClick={() => handleCreateCommandCoffeeVn(-1, value, selectedUser)}
                                    >
                                        Gửi lệnh đỏ
                                    </button>
                                    <div
                                        className="flex px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:cursor-pointer hover:bg-blue-600"
                                        onClick={() => setShowPopup(false)}
                                    >
                                        <IoCloseCircle className="w-5 h-5 text-white" />
                                        <div>Đóng popup</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>

                <div className="w-1/2 h-full">
                    <div className="mt-5 font-bold">Cửa sổ lệnh đánh</div>
                    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md ">
                        <ul className="space-y-4">
                            {commandCoffeeVnList.map((message, index) => (
                                <li
                                    key={message.id}
                                    className={`flex items-start ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                                        }`}
                                >
                                    {index % 2 === 0 && (
                                        <div className="mr-2">
                                            {convertDate(message.time)}
                                            {/* <FaUserCircle className="w-5 h-5 text-blue-500" /> */}
                                        </div>
                                    )}
                                    <div
                                        className={`p-2 rounded-lg ${message.value === 1 ? 'bg-[#79E08F]' : 'bg-red-500 text-white'
                                            }`}

                                    >
                                        <span className="font-bold">{message.username}: </span>
                                        <span>{message.money}</span>
                                    </div>
                                    {index % 2 !== 0 && (
                                        <div className="ml-2">
                                            {convertDate(message.time)}

                                            {/* <FaUserCircle className="w-5 h-5 text-blue-500" /> */}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* <div className="flex mt-4">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your message..."
                                value={message}
                                onChange={handleInputChange}
                            />
                            <button
                                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div> */}
                    </div>

                </div>


            </div>

        </div>
    );
};


export default ChatBoxCoffeeRobusta