import React from 'react';
import { Login } from '../../component/Login';

interface IProps {

}


const LoginContainer: React.FC<IProps> = ({}) => {

    return (
        <div>
            <Login />
        </div>
    );
};

export default React.memo(LoginContainer);
