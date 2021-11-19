// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import MooveModalEdit from 'src/components/Mooves/MooveModalEdit';
import {
    toggleVisibility,
    setCurrentMoove,
    controlFormInput,
    getAccountsWithTypes,
    toggleLoading,
} from 'src/store/reducer';


/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
const mapStateToProps = (state, ownProps) => ({
    visibility: state.visibility ?? null,
    accountsWithTypes: state.accountsWithTypes ?? null,
    currentAccount: state.currentAccount ?? null,
    currentMoove: state.currentMoove ?? null,
    name: state.name ?? null,
    amount: state.amount ?? null,
    comment: state.comment ?? null,
    loading: state.loading ?? null,
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
    toggleVisibility: () => (dispatch(toggleVisibility())),
    setCurrentMoove: (currentMoove) => (dispatch(setCurrentMoove(currentMoove))),
    controlFormInput: (name, value) => (dispatch(controlFormInput(name, value))),
    getAccountsWithTypes: () => (dispatch(getAccountsWithTypes())),
    toggleLoading: () => (dispatch(toggleLoading())),
});


// Container
const MooveModalEditContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(MooveModalEdit);


// == Export
export default MooveModalEditContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(MooveModalEdit);
*/