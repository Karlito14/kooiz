import { Header } from './components/Header/Header.tsx';
import '../global.scss';
import { ScreenStep } from './components/ScreenStep/ScreenStep.tsx';

export const App = () => {
    return (
        <>
            <Header></Header>
            <main>
                <ScreenStep />
            </main>
        </>
    );
};
