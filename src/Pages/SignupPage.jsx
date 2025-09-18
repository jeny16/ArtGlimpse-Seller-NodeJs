import React, { memo } from 'react';
import Signup  from '../components/Signup';

const SignupPage = () => {
    return (
        <div>
            <Signup />
        </div>
    );
}

export default memo(SignupPage);
