// #region imports
    // #region libraries
    import React from 'react';

    import { storiesOf } from '@storybook/react';
    import { action } from '@storybook/addon-actions';
    import {
        withKnobs,
        boolean,
        number,
    } from '@storybook/addon-knobs';
    // #endregion libraries


    // #region external
    import Clicker from '../';
    // #endregion external
// #endregion imports



// #region module
const actions = {
    atClick: action('atClick'),
};

storiesOf(
    'buttons',
    module,
)
.addDecorator(withKnobs)
.add('Clicker', () => {

    return (
        <Clicker
            // {...actions}

        />
    );
});
// #endregion module
