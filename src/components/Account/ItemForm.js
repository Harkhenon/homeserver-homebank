import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  Form,
  Header as Text,
  Message
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
  } = props;

  toast.configure();

  /**
   * Handle form changes and send it to state
   * @param {object} e Semantic event object
   * @param {string} name Name of the state variable
   * @param {string} value Its value
   */
  const handleChange = (e , { name, value }) => {
      controlFormInput(name, value);
  }

  /**
   * Handle form submit and send Axios request
   * to create the moove
   * @param {object} e 
   */
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
        controlFormInput("moove_type", undefined);
        controlFormInput("moove_name", undefined);
        controlFormInput("moove_amount", undefined);
        controlFormInput("moove_description", undefined);
        controlFormErrors(null);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  /**
   * Get errors from state and build micro component
   * 
   * @returns A react element who lists errors
   */
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
                    { key: "expenses", value: "expenses", text: "Dépense" },
                    { key: "regular_fees", value: "regular_fees", text: "Dépense régulière" },
                    { key: "incomings", value: "incomings", text: "Recette" },
                ]}
                value={moove_type ?? ""}
                />
              <Form.Input
                type="number"
                name="moove_amount"
                value={moove_amount ?? ""}
                label="Montant de l'opération"
                onChange={handleChange}
              />
              <Form.Input 
                type="text"
                name="moove_name"
                value={moove_name ?? ""}
                label="Libellé de l'opération"
                onChange={handleChange}
              />
              <Form.TextArea
                name="moove_description"
                value={moove_description ?? ""}
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

ItemForm.defaultProps = {
  controlFormInput: null,
  controlFormErrors: null,
  moove_type: "",
  moove_name: "",
  moove_amount: 0,
  moove_description: "",
  form_errors: null,
  accountId: null,
  getAccountsWithTypes: null,
}

ItemForm.propTypes = {
  controlFormInput: PropTypes.func,
  controlFormErrors: PropTypes.func,
  moove_type: PropTypes.string,
  moove_name: PropTypes.string,
  moove_amount: PropTypes.number,
  moove_description: PropTypes.string,
  form_errors: PropTypes.array,
  accountId: PropTypes.number,
  getAccountsWithTypes: PropTypes.func,
}

export default ItemForm;
