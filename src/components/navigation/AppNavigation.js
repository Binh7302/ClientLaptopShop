import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UserNavigation from '../users/UserNavigation';
import ProductNavigation from '../products/ProductNavigation';
import { UserContext } from '../users/UserContext';

const AppNavigation = (props) => {
    const { isLoggedIn } = useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLoggedIn ? <ProductNavigation /> : <UserNavigation />
            }
        </NavigationContainer>
    )
}

export default AppNavigation