import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = () => {
    return (
        <Appbar.Header style={{marginTop:8, backgroundColor:'#9ED2BE'}}>
            <Appbar.Content title= "NEWS"/>

        </Appbar.Header>

    );
};
export default Header;