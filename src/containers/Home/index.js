// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import Home from 'src/components/Home';
import {
    getAccountsWithTypes,
    setCurrentAccount,
} from 'src/store/reducer';

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
    getAccountsWithTypes: (accountsWithTypes) => (dispatch(getAccountsWithTypes(accountsWithTypes))),
    setCurrentAccount: (currentAccount) => (dispatch(setCurrentAccount(currentAccount))),
});


// Container
const HomeContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(Home);


// == Export
export default HomeContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(Home);
*/