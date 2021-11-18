import React from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Card,
    Container,
    Header as Text,
    Icon,
} from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import { Link } from 'react-router-dom';
import ItemForm from 'src/containers/Account/ItemForm';
import PageBreadcrumb from 'src/containers/Parts/PageBreadcrumb';
import { ucfirst } from 'src/utility/PolyfillPhp';
import { traduceTo } from 'src/i18n/Internationalization';

const Account = (props) => {

    const history = useHistory();

    try {

        /** Component props */
        const {
            accountsWithTypes,
            currentAccount,
            lang,
            controlFormInput
        } = props;

        /** Get the current account */
        const account = accountsWithTypes[currentAccount];
        
        /**
         * Returns mooves's sum
         * (incomings, expenses ou regular fees)
         * @param {object} elements 
         * @returns {number} Mooves's sum
         */
        const calcTotal = (elements) => {
            let sum = 0;
            elements.map((element) => {
                sum += element.amount;
                return null;
            })

            return sum.toFixed(2);
        }

        /**
         * Sendind Settings components props
         * before calling it (Populate form)
         * 
         * @returns {void}
         */
        const setSettingsData = () => {
            controlFormInput("name", account.name);
        }

        /** Account total sums */
        const total = calcTotal(account.incomings) - calcTotal(account.expenses) - calcTotal(account.regular_fees);

        return (
            <>
                <Header />
                    <main>
                    <Container>
                        <PageBreadcrumb />
                        <Button
                            as={Link}
                            to="/account/settings"
                            color="blue"
                            onClick={setSettingsData}
                        >
                            <Icon name="setting" />
                            {ucfirst(traduceTo(lang, "account_settings_title"))}
                        </Button>
                        <Text as="h1" textAlign="center">
                            {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
                        </Text>
                        <Card.Group centered>
                            {Object.keys(account).map(key => {
                                if(typeof account[key] === "object" && key !== "type") {
                                    return (
                                        <Card key={key} as={Link} to={"/account/" + key}>
                                            <Card.Header as={Text} icon>
                                                {
                                                (key === "regular_fees") ? (<><Icon name="sync" /> {ucfirst(traduceTo(lang, key))}</>)
                                                : (key === "expenses") ? (<><Icon name="arrow down" />{ucfirst(traduceTo(lang, key))}</>)
                                                : (key === "incomings") ? (<><Icon name="arrow up" />{ucfirst(traduceTo(lang, key))}</> )
                                                : null
                                                }
                                            </Card.Header>
                                            <Card.Content>
                                                <Text as="p" size="huge" textAlign="center">
                                                    {account[key].length}
                                                </Text>
                                            </Card.Content>
                                            <Card.Content>
                                                <Text as="p" size="huge" textAlign="center">
                                                    {calcTotal(account[key])} €
                                                </Text>
                                            </Card.Content>
                                        </Card>
                                    )
                                }
                                return null;
                            })}
                        </Card.Group>
                        <Card centered>
                            <Card.Header as={Text} icon>
                                <Icon name="euro sign"/>
                                Total
                            </Card.Header>
                            <Card.Content>
                                <Text as="h1" textAlign="center">
                                    {
                                        total < 0 
                                        ? <Text color="red" as="span" size="tiny">{total.toFixed(2)}</Text>
                                        : <Text color="green" as="span" size="tiny">{total.toFixed(2)}</Text>
                                    } €
                                </Text>
                            </Card.Content>
                        </Card>
                        <ItemForm accountId={account.id} />
                    </Container>
                </main>
            <Footer />
        </>
        )
    } catch(e) {
        return (
            <>
                { history.push('/') }
            </>
        )
    }
}

Account.defaultProps = {
    accountsWithTypes: null,
    currentAccount: null,
}

Account.propTypes = {
    accountsWithTypes: PropTypes.array,
    currentAccount: PropTypes.number,
}

export default Account;

