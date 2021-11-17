import React from 'react'
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

import { ucfirst } from 'src/utility/PolyfillPhp';

const PageBreadcrumb = (props) => {
    
    const { accountsWithTypes, currentAccount } = props;
    const account = accountsWithTypes[currentAccount];
    const match = useRouteMatch();

    const constructBreadcrumb = () => {
        // Récupération de l'url en cours (Il y a toujours un slash devant)
        const urlInArray = match.url.split("/");

        // On supprime la première entrée qui correspond toujours à
        // une chaîne de caractère vide
        urlInArray.shift();
        
        // On map le resutat pour construire notre fil d'Ariane
        return urlInArray.map((element, index, baseArray) => {
            if(element !== "") {
                return (
                    <>
                        {/* Toujours inclure le divider AVANT */}
                        <Breadcrumb.Divider icon="arrow right" key={element + "-divider"} />
                        <Breadcrumb.Section key={element}>
                            {baseArray[index + 1] !== undefined ? (
                                <Link to={"/" + element} key={element + "-link"}>
                                    {ucfirst(element)}
                                </Link>
                            ) :  (
                                <span key={element + "-span"}>
                                    {ucfirst(element)}
                                </span>
                            )}
                        </Breadcrumb.Section>
                    </>
                )
            }
        });
    }
    const home = (
        <Breadcrumb key="breadmybabe">
            <Breadcrumb.Section key="home">
                <Link to="/" key="home-link">
                    Accueil
                </Link>
            </Breadcrumb.Section>
            {constructBreadcrumb()}
        </Breadcrumb>
    );
    return (
        <>
            {home}
        </>
    )
}

export default PageBreadcrumb
