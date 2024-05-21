import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ShowDescription from './ShowDescription';
import TicketInfo from '../../components/TicketInfo';
import ShowBanner from '../../components/Banner/ShowBanner';
import "../../styles/Description.css";

const ShowPage = () => {
  const location = useLocation();
  const EventId = location.pathname.split('/').pop();
  const [event, setEvent] = useState(null);

useEffect(() => {
  const fetchEvent = async () => {
    const response = await fetch(`http://localhost:8881/api/event/${EventId}`);
    if (!response.ok) {
      console.error(`Failed to fetch event: ${response.statusText}`);
      return;
    }
    const data = await response.json();
    setEvent(data.data);
  };

  fetchEvent();
}, [EventId]);

  return (
    <div className='layout'>
      {event && (
        <>
          <ShowBanner event={event} />
          <div className='contents'>
            <ShowDescription event={event} />
            <TicketInfo />
          </div>
        </>
      )}
    </div>
  );
};

export default ShowPage;