import React, { useEffect } from 'react';
import { Card, Dimmer, Header as Text, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { axiosConfigured } from 'src/store';

const AccountCard = (props) => {

    const {
        getAccountsWithTypes,
        setCurrentAccount,
        currentAccount,
        accountsWithTypes
    } = props;

    useEffect(() => {
        if(accountsWithTypes === null) {
            axiosConfigured.get('/api/bank/accounts')
            .then((result) => {
                getAccountsWithTypes(result.data);
            })
            .catch((error) => {
                getAccountsWithTypes(error.data);
            });
        }
    });

    const handleClick = e => {
        setCurrentAccount(e.currentTarget.id);
    }

    const calcAmount = (amounts) => {
        let total = 0;
        amounts.map(element => {
            total += element.amount;
            return null;
        });

        return total;
    }

    const page = () => {
        const { accountsWithTypes } = props;

        if (accountsWithTypes !== null) {
            let cards = accountsWithTypes.map(element => {

                // Calcul du total sur le compte
                const total = (calcAmount(element.incomings) - calcAmount(element.expenses)) - calcAmount(element.regular_fees);

                return (
                    <Card as={Link} to="/account" key={element.id} id={element.id} onClick={handleClick}>
                        <Card.Header>
                            <Text as="h1" icon>
                                {element.type.name === "ad" && <Icon name="font" />}
                                {element.type.name === "esse" && <Icon name="credit card outline" />}
                                {element.type.name === "velit" && <Icon name="money bill alternate outline" />}
                                {element.name}
                            </Text>
                        </Card.Header>
                        <Card.Content>
                            <Text as="p" className="amount">
                                {total} €
                            </Text>
                        </Card.Content>
                    </Card>
                )
            }
            )
            return cards;
        }

        return (
            <Dimmer active>
                <Loader size="huge" />
            </Dimmer>
        );   
    }

    return (
        <>
            {page()}
        </>
    );
}

export default AccountCard;