import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Container, Form, Header as Text, Icon, Segment } from 'semantic-ui-react';

import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import PageBreadcrumb from 'src/containers/Parts/PageBreadcrumb'
import { traduceTo } from 'src/i18n/Internationalization';
import { ucfirst } from 'src/utility/PolyfillPhp';

const Settings = (props) => {

  const {
    currentAccount,
    accountsWithTypes,
    lang,
    controlFormInput,
    name,
  } = props;

  const history = useHistory();
  
  try {
    
    const account = accountsWithTypes[currentAccount];
    
    const handleSubmit = () => {
      console.log(name);
    }

    const handleChange = (e) => {
      controlFormInput(e.target.name, e.target.value);
    }


    return (
      <>
        <Header />
          <main>
            <Container>
              <PageBreadcrumb />
              <Text as="h1">
                {ucfirst(traduceTo(lang, 'account_settings_title'))} {account.name}
              </Text>
              <Button
                form="settings_form"
                basic
                color="orange"
              >
                {ucfirst(traduceTo(lang, "save_modifications"))}
              </Button>
              <Form onSubmit={handleSubmit} id="settings_form">
                <Form.Group>
                  <Form.Field>
                    <label>{ucfirst(traduceTo(lang, "settings_name_label"))}</label>
                    <Form.Input type="text" name="name" value={name ?? ""} />
                  </Form.Field>
                </Form.Group>
              </Form>
              <Segment placeholder textAlign="center">
                <Text as="h2" color="red" icon>
                  <Icon name="warning sign" />
                  {ucfirst(traduceTo(lang, "danger_zone"))}
                </Text>
                <Button
                  color="red"
                >
                  Supprimer le compte
                </Button>
              </Segment>
            </Container>
          </main>
        <Footer />  
      </>
    )
  } catch(e) {
    return (
      <>
        {console.log(e)}
        {history.push('/')}
      </>
    )
  }
}

export default Settings;
