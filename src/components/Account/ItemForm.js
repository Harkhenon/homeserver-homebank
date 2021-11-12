import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  Form,
  Header as Text,
  Message
} from 'semantic-ui-react';

import { axiosConfigured } from 'src/store';

const ItemForm = (props) => {

  const {
    controlFormInput,
    controlFormErrors,
    moove_type,
    moove_name,
    moove_amount,
    moove_description,
    form_errors,
    accountId,
    getAccountsWithTypes,
    setCurrentAccount,
    accountsWithTypes,
  } = props;

  toast.configure();

  const handleChange = (e , { name, value }) => {
      controlFormInput(name, value);
  }

  const handleSubmit = e => {

    axiosConfigured.post('/api/bank/account/operation', {
        moove_type,
        moove_name,
        moove_amount,
        moove_description,
        "moove_account_id": accountId,
    })
    .then(response => {
      toast.success('Mouvement créé');
      getAccountsWithTypes();
      setCurrentAccount(accountsWithTypes[accountId - 1]);
      controlFormErrors(null);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  const errors = () => {
    form_errors ? (
      <>
        {Object.entries(form_errors.errors).map(element => {
          return (
            <p key={element[0]}>
              <code>{element[1]}</code>
            </p>
          )
        })}
      </>
    ) : (<p></p>)
  }

  return (
      <>
        <ToastContainer />
        <Card centered fluid>
          <Card.Content>
            <Card.Header>
              <Text as="h1">
                Ajouter une opération
              </Text>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            { form_errors && (
              <Message negative>
                <Message.Header>
                  Erreur:
                </Message.Header>
                  {errors()}
              </Message>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Dropdown
                onChange={handleChange}
                label="Mouvements"
                placeholder="Selectionnez un mouvement"
                name="moove_type"
                options={[
                    { key: "expense", value: "expense", text: "Dépense" },
                    { key: "regular_fee", value: "regular_fee", text: "Dépense régulière" },
                    { key: "incoming", value: "incoming", text: "Recette" },
                ]}
                value={moove_type}
                />
              <Form.Input
                type="number"
                name="moove_amount"
                value={moove_amount}
                label="Montant de l'opération"
                onChange={handleChange}
              />
              <Form.Input 
                type="text"
                name="moove_name"
                value={moove_name}
                label="Libellé de l'opération"
                onChange={handleChange}
              />
              <Form.TextArea
                name="moove_description"
                value={moove_description}
                label="Commentaire"
                onChange={handleChange}
              />
              <Card.Content extra>
                <Form.Button
                  type="submit"
                  content="Ajouter"
                  icon="plus"
                />
              </Card.Content>
              
              </Form>
            </Card.Content>
        </Card>
      </>
  )
}

export default ItemForm;
