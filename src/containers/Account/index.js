// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import Account from 'src/components/Account';
import { setCurrentAccount, controlFormInput } from '../../store/reducer';


/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
const mapStateToProps = (state, ownProps) => ({
    currentAccount: state.currentAccount ?? null,
    accountsWithTypes: state.accountsWithTypes ?? null,
    hash: state.hash ?? null,
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
    setCurrentAccount: (account) => (dispatch(setCurrentAccount(account))),
    controlFormInput: (name, value) => (dispatch(controlFormInput(name, value))),
});


// Container
const AccountContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(Account);


// == Export
export default AccountContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(Account);
*/