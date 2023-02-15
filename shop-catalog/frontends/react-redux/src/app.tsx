import ZenRedux from "@zenflux/redux";

import Navbar from "./layout/navbar/navbar";
import Sidebar from "./layout/sidebar/sidebar";

import Pages from "./pages/pages";

function App() {
    ZenRedux.managers.routes.to( "Pages/Controller/Catalog" );

    return (
        <>
            <header>
                <Navbar/>
            </header>

            <Sidebar/>

            <section className="main">
                <Pages/>
            </section>
        </>
    );
}

export default App;
