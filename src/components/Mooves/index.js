import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Icon, Item, Segment, Header as Text, Container } from 'semantic-ui-react';
import { axiosConfigured } from 'src/store';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import './sass/Mooves.scss';
import MooveModalEdit from 'src/containers/Mooves/MooveModalEdit';
import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import PageBreadcrumb from 'src/containers/Parts/PageBreadcrumb';
import { ucfirst } from 'src/utility/PolyfillPhp';
import { traduceTo } from 'src/i18n/Internationalization';

const Mooves = (props) => {

    const {
        getAccountsWithTypes,
        accountsWithTypes,
        currentAccount,
        setCurrentMoove,
        currentMoove,
        toggleVisibility,
        controlFormInput,
        toggleLoading,
        loading,
        lang
    } = props;

    const history = useHistory();
    const { type } = useParams();
    

    try {
        const mooves = accountsWithTypes[currentAccount][type];

        const setModalData = e => {
            setCurrentMoove(parseInt(e.target.id));
            const moove = accountsWithTypes[currentAccount][type][parseInt(e.target.id)];
            controlFormInput("name", moove.name);
            controlFormInput("amount", moove.amount);
            controlFormInput("comment", moove.comment);
            toggleVisibility();
        }

        const handleDelete = (e) => {

            toggleLoading();
            axiosConfigured.delete('/api/bank/account/operation/' + e.target.value, {
                data: { type }
            })
            .then (response => {
                toast.success('Mouvement supprimé')
                getAccountsWithTypes();
                toggleLoading();
            })
            .catch(error => {
                console.log(error.data);
            })
        }

        return (
            <>                
                <Header />
                    <main>
                        <Container>
                            <PageBreadcrumb />
                            <Text as="h1">
                                {ucfirst(traduceTo(lang, type))}
                            </Text>
                            <Segment.Group>
                                <Grid columns={4} centered stackable>
                                    {mooves.length > 0 ? (
                                        mooves.map((element, index) => (
                                            <Grid.Column key={element.name + "-" + index}>
                                                <Segment padded textAlign="center">
                                                    <Item>
                                                        <Item.Header>
                                                            <Text as="h3">{element.name.toUpperCase()}</Text>
                                                        </Item.Header>
                                                        <Item.Content>
                                                            <Segment circular inverted color="blue">{element.amount} €</Segment>
                                                        </Item.Content>
                                                        <Item.Extra>
                                                            <Segment>{element.comment}</Segment>
                                                        </Item.Extra>
                                                    </Item>
                        
                                                    <Button.Group>
                                                        <Button
                                                            onClick={setModalData}
                                                            color="orange"
                                                            id={index}
                                                            loading={loading}
                                                            disabled={loading}
                                                            basic
                                                            icon
                                                        >
                                                            <Icon name="edit" />
                                                            {ucfirst(traduceTo(lang, "update"))}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            color="red"
                                                            onClick={handleDelete}
                                                            value={element.id}
                                                            loading={loading}
                                                            disabled={loading}
                                                            basic
                                                            icon
                                                        >
                                                            <Icon name="delete" />
                                                            {ucfirst(traduceTo(lang, "delete"))}
                                                        </Button>
                                                    </Button.Group>
                                                </Segment>
                                            </Grid.Column>
                                        ))
                                    ) : (
                                        <Segment placeholder>
                                            <Text as="h1" icon>
                                                <Icon name="delete" />
                                                Aucun mouvement enregistré
                                            </Text>
                                            <p>
                                                    Vous pouvez en enregistrer sur&nbsp;
                                                    <Link to="/account">
                                                        la page de compte
                                                    </Link>
                                                </p>
                                        </Segment>
                                    )}
                                </Grid>
                            </Segment.Group>
                    <MooveModalEdit type={type} id={currentMoove} />
                </Container>
            </main>
            <Footer />
        </>
        )
    } catch(e) {
        return (
            <>
                {history.push('/')}
            </>
        )
    }
}

Mooves.defaultProps = {
    accountsWithTypes: null,
    currentAccount: null,
    loading: null
}

Mooves.propTypes = {
    getAccountsWithTypes: PropTypes.func.isRequired,
    accountsWithTypes: PropTypes.array.isRequired,
    currentAccount: PropTypes.number.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
    controlFormInput: PropTypes.func.isRequired,
    toggleLoading: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default Mooves;