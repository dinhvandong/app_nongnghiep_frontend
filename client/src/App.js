import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import UserInterface from './pages/UserInterface';
import UserCreatePage from './pages/UserCreatePage';
import UserEditPage from './pages/UserEditPage';
import CategoriesListPage from './pages/CategoriesListPage';
import CategoryGroupPage from './pages/CategoryGroupPage';
import CategoryGroupCreatePage from './pages/CategoryGroupCreatePage';
import CategoryGroupEditPage from './pages/CategoryGroupEditPage';
import CategoryCreatePage from './pages/CategoryCreatePage';
import CategoryEditPage from './pages/CategoryEditPage';
import TransactionPage from './pages/TransactionPage';
import TransactionCreatePage from './pages/TransactionCreatePage';
import TransactionEditPage from './pages/TransactionEditPage';
import NotificationListPage from './pages/NotificationListPage';
import NotificationCreatePage from './pages/NotificationCreatePage';
import NotificationEditPage from './pages/NotificationEditPage';
import CruisePage from './pages/CruisePage';
import CruiseCreatePage from './pages/CruiseCreatePage';
import CabinPage from './pages/CabinPage';
import CabinCreatePage from './pages/CabinCreatePage';
import RoomPage from './pages/RoomPage';
import RoomEditPage from './pages/RoomEditPage';
import RoomCreatePage from './pages/RoomCreatePage';
import EventPage from './pages/EventPage';
import EventCreatePage from './pages/EventCreatePage';
import EventEditPage from './pages/EventEditPage';
import PricePage from './pages/PricePage';
import PriceCreatePage from './pages/PriceCreatePage';
import PriceEditPage from './pages/PriceEditPage';
import GalleryPage from './pages/GalleryPage';
import GalleryCreatePage from './pages/GalleryCreatePage';
import GalleryEditPage from './pages/GalleryEditPage';
import TimeTablePricePage from './pages/TimeTablePricePage';
import ChatBoxCoffeeVn from './components/admin/ChatBoxCoffeeVn';
import ChatBoxCoffeeVnPage from './pages/ChatBoxCoffeeVnPage';
import ChatBoxCoffeeArabicaPage from './pages/ChatBoxCoffeeArabicaPage';
import ChatBoxCoffeeRobusta from './components/admin/ChatBoxCoffeeArabica';
import ChatBoxCoffeeRobustaPage from './pages/ChatBoxCoffeeRobustaPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<UserInterface />} />
        <Route path="/admin/users" element={<UserInterface />} />
        <Route path="/admin/chatbox_coffeevn" element={<ChatBoxCoffeeVnPage />} />
        <Route path="/admin/chatbox_coffee_robusta" element={<ChatBoxCoffeeRobustaPage />} />
        <Route path="/admin/chatbox_coffee_arabica" element={<ChatBoxCoffeeArabicaPage />} />

        <Route path="/admin/cruise" element={<CruisePage />} />
        <Route path="/admin/cruise/create-new" element={<CruiseCreatePage />} />

        <Route path="/admin/cabin" element={<CabinPage />} />
        <Route path="/admin/cabin/create-new" element={<CabinCreatePage />} />

        <Route path="/admin/room" element={<RoomPage />} />
        <Route path="/admin/room/create-new" element={<RoomCreatePage />} />
        <Route path="/admin/room/update/:id" element={<RoomEditPage />} />

        <Route path="/admin/price" element={<PricePage />} />
        <Route path="/admin/price/create-new" element={<PriceCreatePage />} />
        <Route path="/admin/price/update/:id" element={<PriceEditPage />} />

        <Route path="/admin/event" element={<EventPage />} />
        <Route path="/admin/event/create-new" element={<EventCreatePage />} />
        <Route path="/admin/event/update/:id" element={<EventEditPage />} />

        <Route path="/admin/categories" element={<CategoriesListPage />} />
        <Route path="/admin/categories/create-new" element={<CategoryCreatePage />} />
        <Route path="/admin/categories/update/:id" element={<CategoryEditPage />} />

        <Route path="/admin/categoryGroup" element={<CategoryGroupPage />} />
        <Route path="/admin/categoryGroup/create-new" element={<CategoryGroupCreatePage />} />
        <Route path="/admin/categoryGroup/update/:id" element={<CategoryGroupEditPage />} />

        <Route path="/admin/users/create-new" element={<UserCreatePage />} />
        <Route path="/admin/users/update/:id" element={<UserEditPage />} />

        <Route path="/admin/transaction" element={<TransactionPage />} />
        <Route path="/admin/transaction/create-new" element={<TransactionCreatePage />} />
        <Route path="/admin/transaction/update/:id" element={<TransactionEditPage />} />

        <Route path="/admin/notifications" element={<NotificationListPage />} />
        <Route path="/admin/notifications/create-new" element={<NotificationCreatePage />} />
        <Route path="/admin/notifications/update/:id" element={<NotificationEditPage />} />
      
        <Route path="/admin/gallery" element={<GalleryPage />} />
        <Route path="/admin/gallery/create-new" element={<GalleryCreatePage />} />
        <Route path="/admin/gallery/update/:id" element={<GalleryEditPage />} />
        <Route path="/admin/time-price" element={<TimeTablePricePage />} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
