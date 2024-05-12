import React from 'react';
import Introduction from '~/components/Introduction';
import News from '~/components/News/News';
import Register from '~/components/Popup/Register';
import Rules from '~/components/Rules/Rules';

function Home() {
    return (
        <div>
            <Register />
            <Introduction />
            <News />
            <Rules />
        </div>
    );
}

export default Home;
