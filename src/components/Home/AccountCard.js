import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Dimmer, Header as Text, Icon, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AccountCard = (props) => {

    const {
        setCurrentAccount,
        accountsWithTypes,
    } = props;

    const handleClick = e => {
        setCurrentAccount(e.currentTarget.id - 1);
    }

    const calcAmount = (amounts) => {
        let total = 0;
        amounts.map(element => {
            total += element.amount;
            return null;
        });

        return total;
    }

    try {
        return accountsWithTypes.map(element => {

            // Calcul du total sur le compte
            const total = (calcAmount(element.incomings) - calcAmount(element.expenses)) - calcAmount(element.regular_fees);
                return (
                    <Card as={Link} to="/account" key={element.id} id={element.id} onClick={handleClick}>
                        <Card.Header>
                            <Text as="h1" icon>
                                {element.type.name === "livreta" && <Icon name="font" />}
                                {element.type.name === "ccp" && <Icon name="credit card outline" />}
                                {element.type.name === "assurancevie" && <Icon name="life ring" />}
                                {element.name}
                            </Text>
                        </Card.Header>
                        <Card.Content>
                            <Text as="p" className="amount">
                                {total.toFixed(2)} €
                            </Text>
                        </Card.Content>
                    </Card>
                )
        })
    } catch(e) {
        return (
            <Dimmer active>
                <Loader size="huge" />
            </Dimmer>
        );   
    }
}

AccountCard.defaultProps = {
    accountsWithTypes: null,
}

AccountCard.propTypes = {
    setCurrentAccount: PropTypes.func,
    accountsWithTypes: PropTypes.array,
}

export default AccountCard;