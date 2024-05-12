import React from 'react';
import Introduction from '~/components/Introduction';
import News from '~/components/News/News';
import Rules from '~/components/Rules/Rules';

function Home() {
    return (
        <div>
            <Introduction />
            <News />
            <Rules />
        </div>
    );
}

export default Home;
