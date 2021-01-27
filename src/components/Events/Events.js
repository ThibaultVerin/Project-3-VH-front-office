/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import { GoLocation, GoPerson } from 'react-icons/go';
import { GiWineGlass } from 'react-icons/gi';
import { BsPerson } from 'react-icons/bs';
import './Events.scss';
import { useTranslation } from 'react-i18next';
import API from '../../services/API';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: '30px',
    width: '50%',
    margin: 'auto',
    color: 'white',
    backgroundColor: '#8C0226',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
}));

const Events = () => {
  const [events, setEvents] = useState();
  const [value, onChange] = useState(new Date());
  const { t } = useTranslation();

  let mark = [];

  useEffect(() => {
    mark = events
      ? events.map((event) => moment(event.date).format('DD-MM-YYYY'))
      : [];
  }, [events]);

  const getAllEvents = () => {
    return API.get('/events').then((res) => {
      setEvents(res.data);
      onChange(new Date(res.data[0].date));
    });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    return events && events.length
      ? onChange(new Date(events[0].date))
      : new Date();
  }, []);

  useEffect(() => {
    if (value.length === 2) {
      return API.get(
        `/events?after=${moment(value[0]).format('YYYY-MM-DD')}&before=${moment(
          value[1]
        ).format('YYYY-MM-DD')}`
      ).then((res) => setEvents(res.data));
    }
    return API.get('/events').then((res) => {
      setEvents(res.data);
    });
  }, [value]);

  return (
    <div className="eventBody">
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={value}
          selectRange
          tileClassName={({ date }) => {
            if (mark.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
              return 'highlight';
            }
            return null;
          }}
        />
        <Button
          type="button"
          onClick={() => getAllEvents()}
          className={useStyles().btn}
        >
          {t('Events.bouton2')}
        </Button>
      </div>
      <div className="cardOfEvents">
        <Helmet>
          <title>Événements</title>
        </Helmet>
        {events &&
          events.map((event) => {
            return (
              <div className="eventCard" key={event.id}>
                <div className="eventDetail">
                  <img src={event.main_picture_url} alt={event.title} />
                  <div className="eventDescription">
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <div className="underCard">
                      <p>
                        <GoLocation size={25} color="#8c0226" />
                        {event.city}
                      </p>

                      <p>
                        <BsPerson size={25} color="#8c0226" /> {event.firstname}
                        {event.lastname}
                      </p>
                      <p>
                        <GiWineGlass size={25} color="#8c0226" />
                        {event.name}
                      </p>
                    </div>
                    <div className="button">
                      <div className="share">
                        <FacebookShareButton
                          className="facebook"
                          url="https://www.youtube.com/"
                        >
                          <FacebookIcon size={35} borderRadius={50}>
                            Facebook
                          </FacebookIcon>
                        </FacebookShareButton>

                        <TwitterShareButton
                          className="twitter"
                          url="https://twitter.com/"
                        >
                          <TwitterIcon size={35} borderRadius={50}>
                            Twitter
                          </TwitterIcon>
                        </TwitterShareButton>
                      </div>
                      <Link to={`/events/${event.id}`}>
                        <button className="reserver" type="button">
                          {t('Events.bouton1')}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Events;
