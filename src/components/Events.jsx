// LiveNow.js (inside your React component)

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SelectedEventsContext } from './SelectedEventsContext';

function Events() {
  const { selectedEvents, setSelectedEvents } = useContext(SelectedEventsContext);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/api/events');
        const events = response.data;
        setAllEvents(events);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {allEvents.map(event => (
          <li key={event.id}>
            {event.name} - {event.liveTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
