// == Import : npm
import { connect } from 'react-redux';


// == Import : local
import PageBreadcrumb from 'src/components/Parts/PageBreadcrumb';


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
});


// Container
const PageBreadcrumbContainer = connect(
mapStateToProps,
mapDispatchToProps,
)(PageBreadcrumb);


// == Export
export default PageBreadcrumbContainer;


/* = export à la volée
export default connect(
mapStateToProps,
mapDispatchToProps,
)(PageBreadcrumb);
*/