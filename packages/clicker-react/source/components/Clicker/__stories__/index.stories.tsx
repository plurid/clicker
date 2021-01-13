// #region imports
    // #region libraries
    import React from 'react';

    import { storiesOf } from '@storybook/react';
    import {
        withKnobs,
        boolean,
        number,
        text,
    } from '@storybook/addon-knobs';
    // #endregion libraries


    // #region external
    import Clicker from '../';
    // #endregion external
// #endregion imports



// #region module
storiesOf(
    'buttons',
    module,
)
.addDecorator(withKnobs)
.add('Clicker', () => {
    const buttons = [
        '1', '2', '3', '4',
    ];

    const color = text('Color', '');
    const size = number('Size', 15);
    const round = boolean('Round', true);
    const opacity = number('Opacity', 0.4);
    const hideCursor = boolean('Hide Cursor', false);
    const followCursor = boolean('Follow Cursor', false);

    const bindActivation = text('Bind Activation', 'KeyC');
    const bindUp = text('Bind Up', 'ArrowUp');
    const bindDown = text('Bind Down', 'ArrowDown');
    const bindLeft = text('Bind Left', 'ArrowLeft');
    const bindRight = text('Bind Right', 'ArrowRight');
    const bindClick = text('Bind Click', 'Enter');


    return (
        <div
            style={{
                position: 'relative',
                // height: '100%',
                height: '4500px',
                background: '#708090',
            }}
        >
            <Clicker
                color={color}
                size={size}
                round={round}
                opacity={opacity}

                bindActivation={bindActivation}
                bindUp={bindUp}
                bindDown={bindDown}
                bindLeft={bindLeft}
                bindRight={bindRight}
                bindClick={bindClick}

                hideCursor={hideCursor}
                followCursor={followCursor}
            />

            {buttons.map(button => {
                return (
                    <button
                        key={button}
                        style={{
                            position: 'absolute',
                            // top: Math.random() * window.innerHeight / 2 + 40,
                            top: Math.random() * 4400,
                            left: Math.random() * window.innerWidth / 2 + 40,
                        }}
                        onClick={(event) => {
                            console.log(event);
                            console.log(`button ${button} clicked`);
                        }}
                        onContextMenu={() => {
                            console.log(`button ${button} right clicked`);
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
