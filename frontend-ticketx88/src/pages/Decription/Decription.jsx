import React from 'react';
import ShowDescription from './ShowDescription';

const ShowPage = () => {
  const show = {
    name: 'LIVESHOW MƯA THÁNG SÁU - DÀNH CHO EM | VĂN MAI HƯƠNG - HOÀNG TÔN',
    date: 'Thứ sáu - Ngày 31/05/2024',
    location: 'Harmony Hill - khu đồi thông tại đảo Tuần Châu, Hạ Long'
  };

  return (
    <div>
      <ShowDescription show={show} />
    </div>
  );
};

export default ShowPage;