import React from 'react';
import userIcon from '../../../assets/images/userIcon.png';
import UserQrCode from '../../Universal Files/UserQrCode';

const StudentCard = () => {
  return (
    <>  {/** The Card */}
        <div className="max-w-md justify-start pt-0 bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4 transition hover:scale-[1.01] duration-300">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
            <img src={userIcon} alt="User Icon" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Emri Mbiemri</h2>

        <div className='flex flex-row justify-center '>
            <div className="w-full text-start content-center align-text-bottom text-sm text-gray-600 space-y-1">
                <p><span className="font-bold text-gray-800">Birth Date:</span> 01 Jan 2000</p>
                <p><span className="font-bold text-gray-800">Email:</span> example@student.com</p>
                <p><span className="font-bold text-gray-800">Phone:</span> +383 44 123 456</p>
                <p><span className="font-bold text-gray-800">Address:</span> Rr. e Dëshmorëve, Prishtinë</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg shadow-inner mt-4">
                <UserQrCode userId="12345ABC" />
            </div>
        </div>
        
        </div>
    </>
  );
};

export default StudentCard;
