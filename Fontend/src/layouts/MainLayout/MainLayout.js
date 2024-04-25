// import Header from '~/layouts/components/Header';

function MainLayout({ children }) {
    return (
        <div>
            {/* <Header /> */}
            <div>{children}</div>
        </div>
    );
}

export default MainLayout;
