import React from 'react';

import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import { useLocation } from 'react-router';
import MooveForm from 'src/components/Mooves/MooveForm';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Mooves = (props) => {

    const { currentAccount } = props;

    const location = useLocation();

    let moovesList = null;

    if(location.pathname === `/account/incomings`) {
        moovesList = currentAccount.incomings;
    }

    if(location.pathname === `/account/expenses`) {
        moovesList = currentAccount.expenses;
    }

    if(location.pathname === `/account/regularfees`) {
        moovesList = currentAccount.regular_fees;
    }

    console.log(moovesList);

    return (
        <>  
            <Header />
                <main>
                    <Breadcrumb>
                        <Breadcrumb.Section>
                            <Link to="/" >
                                Accueil
                            </Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider icon="arrow right"/>
                        <Breadcrumb.Section>
                            <Link to="/account" >
                                Compte {currentAccount.name}
                            </Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider icon="arrow right"/>
                        <Breadcrumb.Section>
                            Mouvements du compte {currentAccount.name}
                        </Breadcrumb.Section>
                    </Breadcrumb>
                    <MooveForm moovesList={moovesList} />
                </main>
            <Footer />
        </>
    )
}

export default Mooves;
