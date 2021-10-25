import React from 'react';

import {
    Header as Text
} from 'semantic-ui-react';

import Header from 'src/components/Parts/Header';
import Footer from 'src/components/Parts/Footer';
import { Link } from 'react-router-dom';

const NotFoundFallback = () => {
    return (
        <>
            <Header />
                <main>
                    <Text as="h1" color="red" textAlign="center">
                        Erreur 404 - Page non trouvée
                    </Text>
                    <Text as="p" textAlign="center" size="tiny">
                        <Link to="/">Revenir à l'accueil</Link>
                    </Text>
                </main>
            <Footer />
        </>
    )
}

export default NotFoundFallback;

