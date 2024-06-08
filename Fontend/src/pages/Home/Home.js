import React from 'react';
import Introduction from '~/components/Introduction';
import News from '~/components/News/News';
import Rules from '~/components/Rules/Rules';
import EventSchedule from '~/components/EventSchedule/EventSchedule';
import RegistrationPage from '~/components/RegistrationPage/RegistrationPage';
import HomeFooter from '~/components/HomeFooter';
import Header from '~/layouts/Header';

function Home() {
  return (
    <div>
      <Header />
      <Introduction />
      <News />
      <Rules />
      <EventSchedule />
      <RegistrationPage />
      <HomeFooter />
    </div>
  );
}

export default Home;
