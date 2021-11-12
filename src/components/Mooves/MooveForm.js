import React from 'react';
import { Button, Container, Form, Segment } from 'semantic-ui-react';

const MooveForm = (props) => {

    const {
        moovesList,

    } = props;

    return (
        <Container>
            <Segment.Group>
                {moovesList.map((element) => (
                    <Segment>
                        <Form inline>
                            <Form.Group>
                                <Form.Input type="text" name="name" value={element.name} inline label="Intitulé du mouvement"/>
                                <Form.Input type="number" name="amount" value={element.amount} inline label="Montant" />
                            </Form.Group>
                            <p>{element.comment}</p>
                            <Button basic color="orange">
                                Mettre à jour
                            </Button>
                            <Button basic color="red">
                                Supprimer
                            </Button>
                        </Form>
                    </Segment>
                ))}
            </Segment.Group>
        </Container>
    )
}

export default MooveForm;
