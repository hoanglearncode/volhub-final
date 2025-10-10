import { History, Unplug } from "lucide-react";

const NotFoundPage = ({message = "Trang bạn truy cập không tồn tại"}) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center gap-5 bg-gray-100 w-10/12 py-15 rounded-xl">
        <div className="p-9 bg-gray-200 rounded-full border border-gray-300">
          <Unplug size={60} />
        </div>
        <div className="flex flex-col items-center gap-4 mb-5">
          <h1 className="text-5xl text-gray-700 font-bold">404 - Oops</h1>
          <p className="font-semibold mt-2">{message}</p>
        </div>
        <button onClick={()=> window.history.back()} className="flex bg-blue-500 text-white px-5 py-2 items-center font-semibold hover:scale-105 rounded-lg transition-transform"><History size={20} className="mr-2"/> Quay lại</button>
      </div>
    </div>
  )
};

export default NotFoundPage;
