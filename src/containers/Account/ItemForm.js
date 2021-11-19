// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import ItemForm from 'src/components/Account/ItemForm';
import {
    controlFormInput,
    controlFormErrors
} from 'src/store/reducer'
import { getAccountsWithTypes, setCurrentAccount } from '../../store/reducer';


/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
const mapStateToProps = (state, ownProps) => ({
    moove_type: state.moove_type ?? "",
    moove_name: state.moove_name ?? null,
    moove_amount: state.moove_amount ?? 0,
    moove_description: state.moove_description ?? "",
    form_errors: state.form_errors ?? null,
    accountsWithTypes: state.accountsWithTypes ?? null,
    lang: state.lang ?? null,
});


/* === Actions ===
* - mapDispatchToProps retroune un objet de props pour le composant de présentation
* - mapDispatchToProps met à dispo 2 params
*  - dispatch : la fonction du store pour dispatcher une actio
*  - ownProps : les props passées au container
* Pas de disptach à transmettre ? const mapDispatchToProps = {};
*/
const mapDispatchToProps = (dispatch, ownProps) => ({
    controlFormInput: (key, value) => dispatch(controlFormInput(key, value)),
    controlFormErrors: (errors) => dispatch(controlFormErrors(errors)),
    getAccountsWithTypes: () => dispatch(getAccountsWithTypes()),
    setCurrentAccount: (account) => (dispatch(setCurrentAccount(account))),
});


// Container
const ItemFormContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(ItemForm);


// == Export
export default ItemFormContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(ItemForm);
*/