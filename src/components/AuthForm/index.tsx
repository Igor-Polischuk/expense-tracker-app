
import styles from './AuthForm.module.scss'
import { GoogleBtn } from './GoogleBtn'

interface AuthFormProps {
    title: string
    children: JSX.Element
    onSubmit?: () => void
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children }) => {
    return (
        <div className={styles.form}>
            <div className={styles.wrapper}>
                <h1>{title}</h1>
                <p>Welcome to the EXPENSIO. {title} to start control your finances</p>
                <GoogleBtn title={title}/>
                <p className={styles.or}>Or <span style={{ textTransform: 'lowercase' }}>{title}</span> with Email</p>
                {children}
            </div>
        </div>
    );
}

export default AuthForm;