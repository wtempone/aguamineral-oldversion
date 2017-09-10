import { EnderecoPesquisa } from './../models/endereco-pesquisa.model';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsultaCepService {
  constructor(private http: Http) {}

  consultaCEP(cep, resetaFormCallback, formulario) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != '') {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        resetaFormCallback(formulario);

        return this.http
          .get(`https://viacep.com.br/ws/${cep}/json`)
          .map(dados => dados.json());
      }
    }
  }
  
  consultaEndereco(endereco: EnderecoPesquisa, resetaFormCallback, formulario) {
    //Verifica se todos os campos possuem, valor informado.
    if (endereco.Logradouro != '' && endereco.Cidade != '' && endereco.UF != '') {
        resetaFormCallback(formulario);
        return this.http
          .get(`https://viacep.com.br/ws/${endereco.UF}/${endereco.Cidade}/${endereco.Logradouro}/json`)
          .map(dados => dados.json());
    }
  }
}
