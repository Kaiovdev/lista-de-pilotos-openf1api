import logoHeader from '../../assets/Logo.png'
import styles from './header.module.css'

export function Header(){
    return(
        <div className={styles.header}>
        <header>
            <img className={styles.logo_header} src={logoHeader} alt="Logotipo" />
        </header>
        </div>
    )
}