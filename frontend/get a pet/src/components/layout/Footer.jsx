import styles from './Footer.module.css';

export function Footer(){
    return(
        <footer className={styles.footer}>
            <p><span className="bold">Get a Pet</span> &copy;2022</p>
        </footer>
    )
}