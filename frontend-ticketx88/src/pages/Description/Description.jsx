import React from 'react';
import ShowDescription from './ShowDescription';
import TicketInfo from '../../components/TicketInfo';
import ShowBanner from '../../components/Banner/ShowBanner';
import "../../styles/Description.css";
const ShowPage = () => {
  const event = {
    name: 'LIVESHOW MƯA THÁNG SÁU - DÀNH CHO EM | VĂN MAI HƯƠNG - HOÀNG TÔN',
    date: 'Thứ sáu - Ngày 31/05/2024',
    location: 'Harmony Hill - khu đồi thông tại đảo Tuần Châu, Hạ Long'
  };

  return (
    <div className='layout'>
      <ShowBanner event={event} />
      <div className='contents'>
        <ShowDescription event={event} />
        <TicketInfo />
      </div>
    </div>
  );
};

export default ShowPage;