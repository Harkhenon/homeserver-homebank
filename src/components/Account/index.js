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

const Account = (props) => {

    const history = useHistory();

    try {
        const {
            accountsWithTypes,
            currentAccount
        } = props;

        const calcTotal = (elements) => {
            let sum = 0;
            elements.map((element) => {
                sum += element.amount;
                return null;
            })

            return sum.toFixed(2);
        }

        const account = accountsWithTypes[currentAccount];

        const total = calcTotal(account.incomings) - calcTotal(account.expenses) - calcTotal(account.regular_fees);

        return (
            <>
                <Header />
                    <main>
                    <PageBreadcrumb />
                        <Text as="h1" textAlign="center">
                            {account.name.charAt(0).toUpperCase() + account.name.slice(1)}
                        </Text>
                        <Container textAlign="center" className="contains">
                            {Object.keys(account).map(key => {
                                if(typeof account[key] === "object" && key !== "type") {
                                    return (
                                        <Button key={key} as={Link} to={"/account/" + key} labelPosition="left" icon>
                                            <Icon name="money"/>
                                            Voir les {key}
                                        </Button>
                                    )
                                }
                            })}
                        </Container>
                        <Card.Group centered>
                            <Card key="expenses">
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
                            <Card key="incomings">
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
                            <Card key="regular_fees">
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
                                        ? <Text color="red" as="span" size="tiny">{total.toFixed(2)}</Text>
                                        : <Text color="green" as="span" size="tiny">{total.toFixed(2)}</Text>
                                    } €
                                </Text>
                            </Card.Content>
                        </Card>
                        <ItemForm accountId={account.id} />
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

