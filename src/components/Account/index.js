import React from 'react';
import { useHistory } from 'react-router';
import {
    Breadcrumb,
    Button,
    Card,
    Container,
    Header as Text,
    Icon
} from 'semantic-ui-react';

import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import { Link } from 'react-router-dom';
import ItemForm from 'src/containers/Account/ItemForm';

const Account = (props) => {

    const {
        currentAccount,
        accountsWithTypes,
        setCurrentAccount
    } = props;

    const history = useHistory();

    if(currentAccount === null) {
        history.push('/');
        return null;
    }

    const calcTotal = (elements) => {
        let sum = 0;
        elements.map((element) => {
            sum += element.amount;
            return null;
        })

        return sum.toFixed(2);
    }

    if(accountsWithTypes !== null) {
        if(currentAccount !== accountsWithTypes[currentAccount.id - 1]) {
            setCurrentAccount(accountsWithTypes[currentAccount.id - 1]);
        }
    }

    const total = calcTotal(currentAccount.incomings) - calcTotal(currentAccount.expenses) - calcTotal(currentAccount.regular_fees);

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
                        Compte {currentAccount.name.charAt(0).toUpperCase() + currentAccount.name.slice(1)}
                    </Breadcrumb.Section>
                </Breadcrumb>
                    <Text as="h1" textAlign="center">
                        {currentAccount.name.charAt(0).toUpperCase() + currentAccount.name.slice(1)}
                    </Text>
                    <Container centered={true} textAlign="center" className="contains">
                        <Button as={Link} to="/account/incomings" labelPosition="left" icon color="green">
                            <Icon name="money"/>
                            Voir les recettes
                        </Button>
                        <Button as={Link} to="/account/regularfees" labelPosition="left" icon color="orange">
                            <Icon name="money"/>
                            Voir les dépenses régulières
                        </Button>
                        <Button as={Link} to="/account/expenses" labelPosition="left" icon color="red">
                        <Icon name="money"/>
                            Voir les dépenses
                        </Button>
                    </Container>
                    <Card.Group centered>
                    <Card>
                            <Card.Header as={Text} icon>
                                <Icon name="arrow up" />
                                Dépenses
                            </Card.Header>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {currentAccount.expenses.length}
                                </Text>
                            </Card.Content>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {calcTotal(currentAccount.expenses)} €
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
                                    {currentAccount.incomings.length}
                                </Text>
                            </Card.Content>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {calcTotal(currentAccount.incomings)} €
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
                                    {currentAccount.regular_fees.length}
                                </Text>
                            </Card.Content>
                            <Card.Content>
                                <Text as="p" size="huge" textAlign="center">
                                    {calcTotal(currentAccount.regular_fees)} €
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
                                    && <Text color="red" as="span" size="tiny">{total.toFixed(2)}</Text>
                                    || <Text color="green" as="span" size="tiny">{total.toFixed(2)}</Text>
                                } €
                            </Text>
                        </Card.Content>
                    </Card>
                    <ItemForm accountId={currentAccount.id} />
                </main>
            <Footer />
        </>
    )
}

export default Account;

