import React from 'react';
import ShowDescription from './ShowDescription';
import TicketInfo from '../../components/TicketInfo';

const ShowPage = () => {
  const show = {
    name: 'LIVESHOW MƯA THÁNG SÁU - DÀNH CHO EM | VĂN MAI HƯƠNG - HOÀNG TÔN',
    date: 'Thứ sáu - Ngày 31/05/2024',
    location: 'Harmony Hill - khu đồi thông tại đảo Tuần Châu, Hạ Long'
  };

  return (
    <div>
        <ShowDescription show={show} />
        <TicketInfo />
    </div>
  );
};

export default ShowPage;