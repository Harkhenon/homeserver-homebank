import React, { useEffect } from 'react';

import Header from '../Parts/Header';
import Footer from '../Parts/Footer';
import './Home.scss';
import {
    Card,
    Header as Text,
    Icon,
    Label,
    Form,
} from 'semantic-ui-react';

import AccountCard from 'src/components/Home/AccountCard';
import { Link } from 'react-router-dom';


const Home = (props) => {

    const {
        getAccountsWithTypes,
        setCurrentAccount,
        currentAccount,
        accountsWithTypes,
        hash
    } = props;

    useEffect(() => {
        if(accountsWithTypes === null || hash === null) {
            getAccountsWithTypes();
        }
    }); 

    const monthNames = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
    ];

    return (
        <>
            <Header />
                <main>
                    <Form>
                        <Form.Dropdown
                            inline
                            label="Sélectionnez le mois"
                            defaultValue={monthNames[new Date().getMonth()]}
                            options={[
                                { key: 'october', value: 'october', text: 'Octobre' },
                                { key: 'november', value: 'november', text: 'Novembre' },
                                { key: 'december', value: 'december', text: 'Décembre' },
                            ]}
                        />
                    </Form>
                    <Text as="div">
                        <Label color="green" as={Link} to="t/est"><Icon name="font" /> Livret A</Label>
                        <Label color="green"><Icon name="credit card outline"/> Compte Courant</Label>
                        <Label color="green"><Icon name="money bill alternate outline"/> Assurance-vie</Label>
                    </Text>
                    <Card.Group id="home-resume">
                        <AccountCard
                            getAccountsWithTypes={getAccountsWithTypes}
                            setCurrentAccount={setCurrentAccount}
                            currentAccount={currentAccount}
                            accountsWithTypes={accountsWithTypes}
                        />
                    </Card.Group>
                </main>
            <Footer />
        </>
    )
}

export default Home;
