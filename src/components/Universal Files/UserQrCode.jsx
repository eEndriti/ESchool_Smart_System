import React from 'react';
import QRCode from 'react-qr-code';

const UserQrCode = ({ userId }) => {
  const qrValue = `${userId}`; 

  return (
    <div className="p-4 w-fit">
      <QRCode value={qrValue} size={128} />
    </div>
  );
};

export default UserQrCode;
