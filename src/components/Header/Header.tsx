import logo from '../../assets/logo.png';
import style from './style.module.scss';

export const Header = () => {
    return(
        <header className={style.container}>
            <img src={logo} alt='Kooiz' className={style.container__image} />
        </header>
    );
};