// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import Mooves from 'src/components/Mooves';
import {
    controlFormInput,
    toggleVisibility,
    getAccountsWithTypes,
    setCurrentMoove,
    setCurrentMooveId,
    toggleLoading
} from 'src/store/reducer';

/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
const mapStateToProps = (state, ownProps) => ({
    name: state.name ?? null,
    amount: state.amount ?? null,
    currentAccount: state.currentAccount ?? null,
    accountsWithTypes: state.accountsWithTypes ?? null,
    visibility: state.visibility ?? null,
    currentMoove: state.currentMoove ?? null,
    currentMooveId: state.currentMooveId ?? null,
    loading: state.loading ?? null,
});


/* === Actions ===
* - mapDispatchToProps retroune un objet de props pour le composant de présentation
* - mapDispatchToProps met à dispo 2 params
*  - dispatch : la fonction du store pour dispatcher une actio
*  - ownProps : les props passées au container
* Pas de disptach à transmettre ? const mapDispatchToProps = {};
*/
const mapDispatchToProps = (dispatch, ownProps) => ({
    controlFormInput: (input, value) => (dispatch(controlFormInput(input, value))),
    toggleVisibility: () => (dispatch(toggleVisibility())),
    getAccountsWithTypes: () => (dispatch(getAccountsWithTypes())),
    setCurrentMoove: (currentMoove) => (dispatch(setCurrentMoove(currentMoove))),
    setCurrentMooveId: (mooveId) => (dispatch(setCurrentMooveId(mooveId))),
    toggleLoading: () => (dispatch(toggleLoading())),  
});


// Container
const MoovesContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(Mooves);


// == Export
export default MoovesContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(Mooves);
*/