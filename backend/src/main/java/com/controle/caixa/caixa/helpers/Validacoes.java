package com.controle.caixa.caixa.helpers;

import com.controle.caixa.caixa.exceptions.UnprocessableEntityException;
import com.controle.caixa.caixa.models.Produto;

public class Validacoes {
    public static boolean validarProduto(Produto produto)
    {
        // verificar se o campo de unidade é UN, KG ou LT
        if ( !produto.getUnidade().equals("UN") && !produto.getUnidade().equals("KG") && !produto.getUnidade().equals("LT") ) {
            return false;
        }
        // verificar se o campo de preço é maior que zero
        if ( produto.getValor() <= 0 ) {
            return false;
        }

        return true;
    }

}
