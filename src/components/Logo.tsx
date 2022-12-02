import {useContext, FC} from 'react';
import darkLogo from '../assets/svg/logo-dark.svg';
import lightLogo from '../assets/svg/logo.svg';
import { SettingsContext } from '../hoc/SettingsProvider';
import smallLogo from '../assets/svg/small-logo.svg';

interface LogoProps {
    isSmall?: boolean
    [x: string]: any
}

const Logo: FC<LogoProps> = ({isSmall, ...props}) => {
    let {darkTheme} = useContext(SettingsContext)
    
    if(isSmall) return <img style={{width: '40px'}} src={smallLogo} alt="Logo"/>
    return ( <img {...props} style={{width: '150px'}} src={darkTheme ? darkLogo : lightLogo} alt="Logo"/> );
}
 
export default Logo;