import React from 'react';
import {
    Button,
    Container,
    Form,
    Input,
    TextArea,
    Header as Text,
    Breadcrumb
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { ucfirst } from 'src/utility/PolyfillPhp';
import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import { Link, useParams, useHistory } from 'react-router-dom';
import { axiosConfigured } from 'src/store';

const MooveForm = (props) => {
    const {
        currentAccount,
        name,
        amount,
        comment,
        controlFormInput,
        accountsWithTypes
    } = props;

    const history = useHistory();

    accountsWithTypes ?? history.push('/');

    const { id, type } = useParams();

    const moove = accountsWithTypes[currentAccount][type][id];

    if (name, amount, comment === null) {
        controlFormInput("name", moove.name);
        controlFormInput("amount", moove.amount);
        controlFormInput("comment", moove.comment);
    }

    const handleChange = e => {
        controlFormInput(e.target.name, e.target.value);
    }

    const handleSubmit = (e) => {
        axiosConfigured.patch("/api/bank/account/operation/" + moove.id, {
            type,
            name,
            amount,
            comment
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <Header />
                <main>
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Section>
                                <Link to="/" >
                                    Accueil
                                </Link>
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="arrow right"/>
                            <Breadcrumb.Section>
                                <Link to="/account" >
                                    Compte {ucfirst(moove.name)}
                                </Link>
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="arrow right"/>
                            <Breadcrumb.Section>
                                <Link to={"/account/" + type}>
                                    Mouvements ({type}) du compte {moove.name}
                                </Link>
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="arrow right"/>
                            <Breadcrumb.Section>
                                Éditer un mouvement
                            </Breadcrumb.Section>
                        </Breadcrumb>
                        <Text as="h1">
                            Modifier un mouvement
                        </Text>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>Nom du mouvement</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name ?? ""}
                                    placeholder="Nom du mouvement"
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Montant</label>
                                <Input
                                    type="number"
                                    step="any"
                                    name="amount"
                                    value={amount ?? ""}
                                    placeholder="Montant du mouvement"
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Commentaire</label>
                                <TextArea
                                    name="comment"
                                    value={comment ?? ""}
                                    placeholder="Commentaire"
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Button
                                color="orange"
                                basic
                                floated="right"
                            >
                                Mettre à jour
                            </Button>
                        </Form>
                    </Container>
                </main>
            <Footer />
        </>
    )
}

MooveForm.defaultProps = {
    currentAccount: null,
    name: "",
    amount: 0,
    comment: "",
    accountsWithTypes: null
}

MooveForm.propTypes = {
    currentAccount: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    comment: PropTypes.string,
    controlFormInput: PropTypes.func,
    accountsWithTypes: PropTypes.array,
}

export default MooveForm;
