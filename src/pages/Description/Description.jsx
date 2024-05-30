import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowDescription from "./ShowDescription";
import TicketInfo from "../../components/TicketInfo";
import ShowBanner from "../../components/Banner/ShowBanner";
import "../../styles/Description.css";

const ShowPage = () => {
  const location = useLocation();
  const EventId = location.pathname.split("/").pop();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

  // Access the username from the Redux store
  const username = useSelector(state => state.username);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(
        `http://localhost:8881/api/event/${EventId}`
      );
      if (!response.ok) {
        console.error(`Failed to fetch event: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setEvent(data.data);
    };

    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:8881/api/user/get-details/${username}`
      );
      if (!response.ok) {
        console.error(`Failed to fetch user: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setUser(data);
    };

    fetchEvent();
    fetchUser();
  }, [EventId, username]); // Add username to the dependency array

  return (
    <div className="layout">
      {event && (
        <>
          <ShowBanner event={event} />
          <div className="contents">
            <ShowDescription event={event} />
            <TicketInfo event={event} user={user} /> {/* Pass the user to TicketInfo */}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowPage;