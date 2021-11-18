import React from 'react';
import {
    Card,
    Header as Text,
    Icon,
    Label,
    Form,
    Container,
} from 'semantic-ui-react';

import './sass/Home.scss';
import AccountCard from 'src/containers/Home/AccountCard';
import { Link } from 'react-router-dom';
import Header from '../Parts/Header';
import Footer from '../Parts/Footer';
import { ucfirst } from 'src/utility/PolyfillPhp';
import { traduceTo } from 'src/i18n/Internationalization';
import PageBreadcrumb from 'src/components/Parts/PageBreadcrumb';

const Home = (props) => {

    const { lang } = props;

    const monthNames = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
    ];

    const months = () => {
        let result = [];
        monthNames.forEach(element=> {
            result.push({ "key": element, "value": element, "text": ucfirst(traduceTo(lang, element)) });
        })

        return result;
    };

    return (
        <>
            <Header />
                <main>
                    <Container>
                        <PageBreadcrumb />
                        <Form>
                            <Form.Dropdown
                                inline
                                label="Sélectionnez le mois"
                                defaultValue={monthNames[new Date().getMonth()]}
                                options={months()}
                            />
                        </Form>
                        <Text as="div">
                            <Label color="green" as={Link} to="t/est"><Icon name="font" /> Livret A</Label>
                            <Label color="green"><Icon name="credit card outline"/> Compte Courant</Label>
                            <Label color="green"><Icon name="money bill alternate outline"/> Assurance-vie</Label>
                        </Text>
                        <Card.Group id="home-resume">
                            <AccountCard />
                        </Card.Group>
                    </Container>
                </main>
            <Footer />
        </>
    )
}

export default Home;
