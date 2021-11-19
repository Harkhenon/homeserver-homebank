import React from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    Loader,
    TextArea
} from 'semantic-ui-react';
import {toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import { axiosConfigured } from 'src/store';
import { ucfirst } from 'src/utility/PolyfillPhp';
import { traduceTo } from 'src/i18n/Internationalization';
import './sass/Mooves.scss';

const MooveModalEdit = (props) => {
    toast.configure()

    const {
        visibility,
        accountsWithTypes,
        currentAccount,
        toggleVisibility,
        type,
        currentMoove,
        controlFormInput,
        name,
        amount,
        comment,
        getAccountsWithTypes,
        setCurrentMoove,
        toggleLoading,
        loading,
        lang
    } = props;
    
    const moove = accountsWithTypes[currentAccount][type][currentMoove];

    if(moove === undefined || moove === null) {
        return null;
    }

    const handleChange = e => {
        controlFormInput(e.target.name, e.target.value);
    }

    const flushStateVariables = () => {
        controlFormInput("name", undefined);
        controlFormInput("amount", undefined);
        controlFormInput("comment", undefined);
        setCurrentMoove(undefined);
        toggleVisibility();
    }

    const handleSubmit = (e) => {
        toggleLoading();
        axiosConfigured.patch("/api/bank/account/operation/" + moove.id, {
            type,
            name,
            amount,
            comment
        })
        .then(response => {
            toast.success('Le mouvement à été mis à jour');
            flushStateVariables();
            getAccountsWithTypes();
            toggleLoading();
        })
        .catch(error => {
            console.log(error);
        })
    }

    try {
        return (
            <>
            <ToastContainer />
                <Modal
                    open={visibility}
                    onClose={flushStateVariables}
                    dimmer="blurring"
                    closeIcon
                >
                    <Modal.Header>
                        {ucfirst(traduceTo(lang, "update_moove"))}
                    </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={handleSubmit} id="edit-moove-form">
                            <Form.Field required>
                                <label>{ucfirst(traduceTo(lang, "moove_name"))}</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name ?? ""}
                                    placeholder={ucfirst(traduceTo(lang, "moove_name"))}
                                    onChange={handleChange}
                                    fluid
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>{ucfirst(traduceTo(lang, "moove_amount"))}</label>
                                <Input
                                    type="number"
                                    step="any"
                                    name="amount"
                                    value={amount ?? ""}
                                    placeholder={ucfirst(traduceTo(lang, "moove_amount"))}
                                    onChange={handleChange}
                                    fluid
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label>{ucfirst(traduceTo(lang, "moove_comment"))}</label>
                                <TextArea
                                    name="comment"
                                    value={comment ?? ""}
                                    placeholder={ucfirst(traduceTo(lang, "moove_comment"))}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color="orange"
                            basic
                            form="edit-moove-form"
                            loading={loading}
                            disabled={loading}
                        >
                            {ucfirst(traduceTo(lang, "update"))}
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    } catch(e) {
        <Modal>
            <Loader size="huge" />
        </Modal>
    }
}

MooveModalEdit.defaultProps = {
    visibility: false,
    accountsWithTypes: null,
    currentAccount: null,
    type: "",
    currentMoove: null,
    name: "",
    amount: 0,
    comment: "",
    loading: false,
}

MooveModalEdit.propTypes = {
    visibility: PropTypes.bool,
    accountsWithTypes: PropTypes.array,
    currentAccount: PropTypes.number,
    toggleVisibility: PropTypes.func,
    type: PropTypes.string,
    currentMoove: PropTypes.number,
    controlFormInput: PropTypes.func,
    name: PropTypes.string,
    amount: PropTypes.number,
    comment: PropTypes.string,
    getAccountsWithTypes: PropTypes.func,
    setCurrentMoove: PropTypes.func,
    toggleLoading: PropTypes.func,
    loading: PropTypes.bool,
}

export default MooveModalEdit;
