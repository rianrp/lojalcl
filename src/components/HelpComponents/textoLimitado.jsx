import React, { useState } from 'react';

const TextoLimitado = ({ texto, limite }) => {
    const [exibirCompleto, setExibirCompleto] = useState(false);

    const textoAbreviado = texto.slice(0, limite);
    const textoRestante = texto.slice(limite);

    const handleExibirCompleto = () => {
        setExibirCompleto(true);
    };

    return (
        <div>
            <h1 onClick={handleExibirCompleto} style={{ color: "#818181", fontSize: "12px" }}>
                {exibirCompleto ? texto : textoAbreviado}
                {!exibirCompleto && texto.length > limite && (
                    <>
                        {"..."}
                    </>
                )}
            </h1>
        </div>
    );
};

export default TextoLimitado;