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

    const buttons = [
        '1', '2', '3', '4',
    ];

    return (
        <div
            style={{
                position: 'relative',
                height: '100%',
                background: 'blue',
            }}
        >
            <Clicker
            />

            {buttons.map(button => {
                return (
                    <button
                        key={button}
                        style={{
                            position: 'absolute',
                            top: Math.random() * window.innerHeight/2 + 40,
                            left: Math.random() * window.innerWidth/2 + 40,
                        }}
                        onClick={() => {
                            console.log(`button ${button} clicked`);
                        }}
                    >
                        button {button}
                    </button>
                );
            })}
        </div>
    );
});
// #endregion module
