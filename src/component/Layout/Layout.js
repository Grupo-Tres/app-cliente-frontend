import Cabecalho from "../Cabecalho/Cabecalho";
import Rodape from "../Rodape/Rodape";
import React from "react";

function Layout({children}){
    return (
        <div>
            <Cabecalho />
            {children}
            <Rodape />
        </div>
    )
}

export default Layout;