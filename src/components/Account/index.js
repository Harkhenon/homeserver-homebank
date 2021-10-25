import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
    Breadcrumb,
    Button,
    Card,
    Header as Text,
    Icon
} from 'semantic-ui-react';

import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import { Link } from 'react-router-dom';

const Account = (props) => {

    const {
        currentAccount,
        accountsWithTypes,
    } = props;

    const history = useHistory();

    accountsWithTypes ?? history.push('/');
    currentAccount ?? history.push('/');

    const account = accountsWithTypes[currentAccount - 1];

    const calcTotal = (elements) => {
        let sum = 0;
        elements.map(function (element) {
            sum += element.amount;
        })

        return sum;
    }

    const total = calcTotal(account.incomings) - calcTotal(account.expenses) - calcTotal(account.regular_fees);

    return (
        <>
            <Header />
                <main>
                <Breadcrumb>
                    <Breadcrumb.Section>
                        <Link to="/" >
                            Accueil
                        </Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="arrow right"/>
                    <Breadcrumb.Section>
                        Compte {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
                    </Breadcrumb.Section>
                </Breadcrumb>
                    <Text as="h1" textAlign="center">{account.name.charAt(0).toUpperCase() + account.name.slice(1)}</Text>
                    <Card.Group centered>
                    <Card>
                            <Card.Header as={Text} icon>
                                <Icon name="arrow up" />
                                Dépenses
                            </Card.Header>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {account.expenses.length}
                                </Text>
                            </Card.Content>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {calcTotal(account.expenses)} €
                                </Text>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header as={Text} icon>
                                <Icon name="arrow down" />
                                Recettes
                            </Card.Header>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {account.incomings.length}
                                </Text>
                            </Card.Content>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {calcTotal(account.incomings)} €
                                </Text>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Header as={Text} icon>
                                <Icon name="sync" />
                                Dépenses régulières
                            </Card.Header>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {account.regular_fees.length}
                                </Text>
                            </Card.Content>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {calcTotal(account.regular_fees)} €
                                </Text>
                            </Card.Content>
                        </Card>
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
                                    && <Text color="red" as="span" size="tiny">{total}</Text>
                                    || <Text color="green" as="span" size="tiny">{total}</Text>
                                } €
                            </Text>
                        </Card.Content>
                    </Card>
                </main>
            <Footer />
        </>
    )
}

export default Account;

