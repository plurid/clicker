import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import ButtonInline from '../ButtonInline';

import {
    StyledItemLoggedInAs,
} from './styled';



export interface ItemLoggedInAsProperties {
    theme: Theme;
    active: boolean;
    type: string;
}

const ItemLoggedInAs: React.FC<ItemLoggedInAsProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        active,
        type,
    } = properties;


    /** state */
    const [
        mouseOver,
        setMouseOver,
    ] = useState(false);


    /** render */
    return (
        <StyledItemLoggedInAs
            theme={theme}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onMouseMove={() => {!mouseOver ? setMouseOver(true) : null}}
        >
            <div>
                {type}
            </div>
        </StyledItemLoggedInAs>
    );
}


export default ItemLoggedInAs;
