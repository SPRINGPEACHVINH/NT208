import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShowDescription from "./ShowDescription";
import TicketInfo from "../../components/TicketInfo";
import ShowBanner from "../../components/Banner/ShowBanner";
import "../../styles/Description.css";

const ShowPage = () => {
  const location = useLocation();
  const EventId = location.pathname.split("/").pop();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

const username = localStorage.getItem("username");

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
      if (!username) {
        setUser(null);
        return;
      }

      const response = await fetch(
        `http://localhost:8881/api/user/get-details/${username}`
      );
      if (!response.ok) {
        console.error(`Failed to fetch user: ${response.statusText}`);
        return;
      }
      console.log(response);
      const data = await response.json();
      setUser(data);
    };

    fetchEvent();
    fetchUser();
  }, [EventId, username]);

  return (
    <div className="layout">
      {event && (
        <>
          <ShowBanner event={event} />
          <div className="contents">
            <ShowDescription event={event} />
            <TicketInfo event={event} user={user} />
          </div>
        </>
      )}
    </div>
  );
};

export default ShowPage;