import { EnderecoModel } from './../models/endereco.model';
import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleApis {
  constructor(private http: Http) {}
  body: any = { accuracy : 100};

  geolocation() {
    return this.http
      .post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAlS93N7e4bdm0dhNrjqcmHL55gBRAjae0', this.body, new RequestOptions())
      .map(dados => dados.json());
  }
  
  geocodeingLatLng(lat,lng) {
    return this.http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=pt-BR&key=AIzaSyAlS93N7e4bdm0dhNrjqcmHL55gBRAjae0`)
      .map(dados => dados.json());
  }

  geocodeingEndereco(endereco: EnderecoModel) {
    return this.http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco.cep}+
      ${endereco.rua}+${endereco.numero},+
      ${endereco.bairro}+
      ${endereco.cidade}+
      ${endereco.estado}&language=pt-BR&key=AIzaSyDvkH1UJdEJIqwuk_oORlsdaJHBuHRn9lE`)
      .map(dados => dados.json());
  }

}
