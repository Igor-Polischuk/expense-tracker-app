import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import styles from './Layaut.module.scss'
import { Container } from "../../components/Container";
import useWindowSize from "../../hooks/useWindowSize";
// import { HaveAccaunt } from "../../hoc/HaveAccaunt";

const PageLoyaut = () => {
    // const size = useWindowSize();
    
    return (
        <main className={styles.main}>
            <Container><Header /></Container>
            <Sidebar />
            <section className={styles.content}>
                <Container>
                    <Outlet />
                </Container>
            </section>
        </main>
    );
}

export default PageLoyaut;