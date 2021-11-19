import React from 'react';
import {
    Card,
    Header as Text,
    Icon,
    Label,
    Form,
    Container,
    Segment,
} from 'semantic-ui-react';

import './sass/Home.scss';
import AccountCard from 'src/containers/Home/AccountCard';
import { Link } from 'react-router-dom';
import Header from '../Parts/Header';
import Footer from '../Parts/Footer';
import { ucfirst } from 'src/utility/PolyfillPhp';
import { traduceTo } from 'src/i18n/Internationalization';
import PageBreadcrumb from 'src/components/Parts/PageBreadcrumb';


/**
 * @component Home
 * @param {object} props 
 * @returns {JSX.Element} JSX Element
 */

const Home = (props) => {

    const {
        lang,
        select_month,
        controlFormInput
    } = props;

    /**
     * List of month's names in an array
     */
    const monthNames = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
    ];

    /**
     * Handle Dropdown's changes and send it to state by dispatch
     * 
     * @param {object} e Dropdown event object
     * @param {object} return A dropdown's returned object 
     */
    const handleChange = (e, {name, value}) => {
        controlFormInput(name, value);
    }

    /**
     * Maps all entries of month's array and format it for dropdown element
     */
    const months = monthNames.map((element, index, baseArray) => {
            return { "key": element, "value": (index + 1), "text": ucfirst(traduceTo(lang, element)) };
        });

    return (
        <>
            <Header />
                <main>
                    <Container>
                        <PageBreadcrumb />
                        <Form>
                            <Form.Dropdown
                                inline
                                label={ucfirst(traduceTo(lang, "sort_by_month"))}
                                name="select_month"
                                placeholder={ucfirst(traduceTo(lang, "select_month"))}
                                value={select_month}
                                options={months}
                                onChange={handleChange}
                            />
                        </Form>
                        <Text as={Segment}>
                            <p>{ucfirst(traduceTo(lang, "account_type_legend"))}</p>
                            <Label color="green" as={Link} to="t/est"><Icon name="font" /> {ucfirst(traduceTo(lang, "savings_books"))}</Label>
                            <Label color="green"><Icon name="credit card outline"/> {ucfirst(traduceTo(lang, "current_account"))}</Label>
                            <Label color="green"><Icon name="life ring"/> {ucfirst(traduceTo(lang, "life_insurance"))}</Label>
                        </Text>

                        <h2>{ucfirst(traduceTo(lang, "account_list"))}</h2>
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
