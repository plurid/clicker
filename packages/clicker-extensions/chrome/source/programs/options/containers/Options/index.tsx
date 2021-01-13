// #region imports
    // #region libraries
    import React, {
        useState,
        useContext,
        useEffect,
    } from 'react';

    import themes from '@plurid/plurid-themes';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries


    // #region external
    import Context from '../../context';

    import Dropdown from '../../../../components/Dropdown';
    import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';
    import ButtonCheckmark from '../../../../components/ButtonCheckmark';

    import {
        chromeStorage,
    } from '../../../../services/utilities';
    // #endregion external


    // #region internal
    import {
        StyledOptions,
        StyledOptionsContainer,
        StyledOptionsWrapper,
        StyledOptionsItemLeftRight,
        StyledStateContainer,
        StyledUIContainer,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
const {
    form: {
        FormLeftRight: PluridFormLeftRight,
        Formline: PluridFormline,
        Formitem: PluridFormitem,
    },
    typography: {
        Heading: PluridHeading,
    },
    inputs: {
        Textline: PluridTextline,
    },
} = universal;


export interface OptionsProperties {
}

const Options: React.FC<OptionsProperties> = () => {
    // #region properties
    const context: any = useContext(Context);
    const {
        theme,
        setTheme,
        options,
    } = context;
    // #endregion properties


    // #region state
    const [
        extensionOnOff,
        setExtensionOnOff,
    ] = useState(true);

    const [
        color,
        setColor,
    ] = useState(options.color);

    const [
        border,
        setBorder,
    ] = useState(options.border);

    const [
        size,
        setSize,
    ] = useState(options.size);

    const [
        round,
        setRound,
    ] = useState(options.round as boolean);

    const [
        opacity,
        setOpacity,
    ] = useState(options.opacity);

    const [
        hideCursor,
        setHideCursor,
    ] = useState(options.hideCursor as boolean);

    const [
        followCursor,
        setFollowCursor,
    ] = useState(options.followCursor as boolean);

    const [
        bindActivation,
        setBindActivation,
    ] = useState(options.bindActivation);
    const [
        bindUp,
        setBindUp,
    ] = useState(options.bindUp);
    const [
        bindDown,
        setBindDown,
    ] = useState(options.bindDown);
    const [
        bindLeft,
        setBindLeft,
    ] = useState(options.bindLeft);
    const [
        bindRight,
        setBindRight,
    ] = useState(options.bindRight);
    const [
        bindClick,
        setBindClick,
    ] = useState(options.bindClick);
    const [
        bindReset,
        setBindReset,
    ] = useState(options.bindReset);
    // #endregion state


    // #region effects
    useEffect(() => {
        const getExtensionState = async () => {
            const { extensionOn } = await chromeStorage.get('extensionOn');
            setExtensionOnOff(!!extensionOn);
        }

        getExtensionState();
    }, []);

    useEffect(() => {
        const setExtensionState = async () => {
            await chromeStorage.set({extensionOn: extensionOnOff});
        }
        setExtensionState();
    }, [extensionOnOff]);

    useEffect(() => {
        const setOptions = async () => {
            const { options } = await chromeStorage.get('options');
            const {
                color,
                border,
                size,
                round,
                opacity,
                hideCursor,
                followCursor,
                bindActivation,
                bindUp,
                bindDown,
                bindLeft,
                bindRight,
                bindClick,
                bindReset,
            } = options;

            setColor(color);
            setBorder(border);
            setSize(size);
            setRound(round);
            setOpacity(opacity);
            setHideCursor(hideCursor);
            setFollowCursor(followCursor);
            setBindActivation(bindActivation);
            setBindUp(bindUp);
            setBindDown(bindDown);
            setBindLeft(bindLeft);
            setBindRight(bindRight);
            setBindClick(bindClick);
            setBindReset(bindReset);
        }

        setOptions();
    }, []);

    useEffect(() => {
        const saveOptions = async () => {
            const options = {
                color,
                border,
                size,
                round,
                opacity,
                hideCursor,
                followCursor,
                bindActivation,
                bindUp,
                bindDown,
                bindLeft,
                bindRight,
                bindClick,
                bindReset,
            };

            await chromeStorage.set({options});
        }

        saveOptions();
    }, [
        color,
        border,
        size,
        round,
        opacity,
        hideCursor,
        followCursor,
        bindActivation,
        bindUp,
        bindDown,
        bindLeft,
        bindRight,
        bindClick,
        bindReset,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledOptions
            theme={theme}
        >
            <StyledOptionsContainer>
                <StyledOptionsWrapper>
                    <StyledStateContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            state
                        </PluridHeading>

                        <ItemExtensionOnOff
                            theme={theme}
                            extensionOnOff={extensionOnOff}
                            setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                        />
                    </StyledStateContainer>


                    <StyledUIContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            interface
                        </PluridHeading>

                        <PluridFormLeftRight
                            style={{
                                padding: '0.3rem 0.7rem',
                            }}
                        >
                            <div>
                                theme
                            </div>

                            <Dropdown
                                theme={theme}
                                selected={theme.name}
                                items={Object.keys(themes)}
                                onSelect={setTheme}
                            />
                        </PluridFormLeftRight>

                        <PluridFormline
                            text="color"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={color}
                                atChange={(event) => setColor(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="border"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={border}
                                atChange={(event) => setBorder(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="size"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={size}
                                atChange={(event) => setSize(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormitem
                            theme={theme}
                        >
                            <ButtonCheckmark
                                checked={round}
                                text="round"
                                theme={theme}
                                toggle={() => setRound(round => !round)}
                            />
                        </PluridFormitem>

                        <PluridFormline
                            text="opacity"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={opacity}
                                atChange={(event) => setOpacity(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormitem
                            theme={theme}
                        >
                            <ButtonCheckmark
                                checked={hideCursor}
                                text="hide cursor"
                                theme={theme}
                                toggle={() => setHideCursor(show => !show)}
                            />
                        </PluridFormitem>

                        <PluridFormitem
                            theme={theme}
                        >
                            <ButtonCheckmark
                                checked={followCursor}
                                text="follow cursor"
                                theme={theme}
                                toggle={() => setFollowCursor(show => !show)}
                            />
                        </PluridFormitem>
                    </StyledUIContainer>


                    <StyledUIContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            bindings
                        </PluridHeading>

                        <PluridFormline
                            text="activation"
                            theme={theme}
                        >
                            <StyledOptionsItemLeftRight>
                                <div>
                                    ALT +
                                </div>

                                <PluridTextline
                                    theme={theme}
                                    text={bindActivation}
                                    atChange={(event) => setBindActivation(event.target.value)}
                                    level={2}
                                />
                            </StyledOptionsItemLeftRight>
                        </PluridFormline>

                        <PluridFormline
                            text="up"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={bindUp}
                                atChange={(event) => setBindUp(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="down"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={bindDown}
                                atChange={(event) => setBindDown(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="left"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={bindLeft}
                                atChange={(event) => setBindLeft(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="right"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={bindRight}
                                atChange={(event) => setBindRight(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="click"
                            theme={theme}
                        >
                            <PluridTextline
                                theme={theme}
                                text={bindClick}
                                atChange={(event) => setBindClick(event.target.value)}
                                level={2}
                            />
                        </PluridFormline>

                        <PluridFormline
                            text="reset"
                            theme={theme}
                        >
                            <StyledOptionsItemLeftRight>
                                <div>
                                    ALT +
                                </div>

                                <PluridTextline
                                    theme={theme}
                                    text={bindReset}
                                    atChange={(event) => setBindReset(event.target.value)}
                                    level={2}
                                />
                            </StyledOptionsItemLeftRight>
                        </PluridFormline>
                    </StyledUIContainer>
                </StyledOptionsWrapper>
            </StyledOptionsContainer>
        </StyledOptions>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Options;
// #endregion exports
