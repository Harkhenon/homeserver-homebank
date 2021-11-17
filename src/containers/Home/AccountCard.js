// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import AccountCard from 'src/components/Home/AccountCard';
import { setCurrentAccount, getAccountsWithTypes } from 'src/store/reducer';


/* === State (données) ===
* - mapStateToProps retroune un objet de props pour le composant de présentation
* - mapStateToProps met à dispo 2 params
*  - state : le state du store (getState)
*  - ownProps : les props passées au container
* Pas de data à transmettre ? const mapStateToProps = null;
*/
const mapStateToProps = (state, ownProps) => ({
    accountsWithTypes: state.accountsWithTypes ?? null,
    currentAccount: state.currentAccount ?? null,
});


/* === Actions ===
* - mapDispatchToProps retroune un objet de props pour le composant de présentation
* - mapDispatchToProps met à dispo 2 params
*  - dispatch : la fonction du store pour dispatcher une actio
*  - ownProps : les props passées au container
* Pas de disptach à transmettre ? const mapDispatchToProps = {};
*/
const mapDispatchToProps = (dispatch, ownProps) => ({
    setCurrentAccount: (id) => dispatch(setCurrentAccount(id)),
    getAccountsWithTypes: () => dispatch(getAccountsWithTypes()),
});


// Container
const AccountCardContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(AccountCard);


// == Export
export default AccountCardContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(AccountCard);
*/