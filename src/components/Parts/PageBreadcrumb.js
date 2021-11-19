import React from 'react'
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

import { ucfirst } from 'src/utility/PolyfillPhp';
import { traduceTo } from 'src/i18n/Internationalization';

const PageBreadcrumb = (props) => {
    
    const { lang } = props;

    const match = useRouteMatch();

    // Récupération de l'url en cours (Il y a toujours un slash devant)
    const urlInArray = match.url.split("/");

    // On supprime la première entrée qui correspond toujours à
    // une chaîne de caractère vide
    urlInArray.shift();
    


    // On map le resutat pour construire notre fil d'Ariane
    return (
        <>
            {urlInArray[0] !== "" && (
                <Breadcrumb key="breadcrumb">
                    <Breadcrumb.Section key="section-home">
                        <Link to="/">
                            Accueil
                        </Link>
                    </Breadcrumb.Section>
                            {urlInArray.map((element, index, baseArray) => {
                                return (
                                    <>
                                        {baseArray[index + 1] !== undefined && (
                                            <>
                                                <Breadcrumb.Divider icon="arrow right" key={`divider-${index}`} />
                                                <Breadcrumb.Section key={`section-${index}`}>
                                                    
                                                        <Link to={"/" + element}>
                                                            {ucfirst(traduceTo(lang, element))}
                                                        </Link>
                                                </Breadcrumb.Section>
                                            </>
                                        )}
                                        {baseArray[index + 1] === undefined && (                                    <>
                                                <Breadcrumb.Divider icon="arrow right" key={`divider-${index}`} />
                                                <Breadcrumb.Section key={`section-${index}`}>
                                                        <span>
                                                            {ucfirst(traduceTo(lang, element))}
                                                        </span>
                                                </Breadcrumb.Section>
                                            </>
                                        )}
                                    </>
                                )
                            })
                        }
                </Breadcrumb>
            )}
        </>
    )
}

export default PageBreadcrumb
