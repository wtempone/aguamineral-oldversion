import { GoogleApis } from './../../services/consulta-google-apis';
import { MaskShared } from './../../shared/masks';
import { TranslateService } from '@ngx-translate/core';
import { EnderecoPesquisa } from './../../models/endereco-pesquisa.model';
import { EstadoBr } from './../../models/estado-br.model';
import { ConsultaCepService } from './../../services/consulta-cep.service';
import { DropdownService } from './../../services/dropdown.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html'
})

export class EnderecoPage {
  @Output() selectEndereco = new EventEmitter();

  formulario: FormGroup;
  estados: EstadoBr[];
  buscaPorEndereco: boolean;
  cadastro: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private masks: MaskShared,
    private platform: Platform,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private googleApis: GoogleApis
  ) {
    console.log('masks');
    console.log(masks);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnderecoPage');
  }

  ngOnInit() {

    this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados;
      console.log(dados);
    });


    this.formulario = this.formBuilder.group({

      cep: [null, Validators.compose([Validators.required, Validators.pattern(this.masks.teleforneFormat)])],
      numero: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]

    });

  }

  setAddress() {
    if (this.formulario.valid) {
      this.googleApis.geocodeingEndereco(this.formulario.value).subscribe(dadosGoogle => {
        console.log(dadosGoogle);
        if (dadosGoogle.status == "OK") {
          let dados =  {
            cep: this.formulario.get('cep').value,
            numero: this.formulario.get('numero').value,
            complemento: this.formulario.get('complemento').value,
            rua: this.formulario.get('rua').value,
            bairro: this.formulario.get('bairro').value,
            cidade: this.formulario.get('cidade').value,
            estado: this.formulario.get('estado').value,
            latitude: dadosGoogle.results[0].geometry.location.lat,
            longitude: dadosGoogle.results[0].geometry.location.lng
          }
          this.selectEndereco.emit(dados);
        } else {
          this.translate.get("ADDRESS_VALIDATION_ERROR").subscribe(
            (value) => {
              let toast = this.toastCtrl.create({
                message: value,
                duration: 3000,
                position: 'top'
              }); 
              toast.present();
            });          
          
        }

      })
    } else { 
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  togleTipoPesquisa() {
    this.resetar();
    this.cadastro = false;
    this.buscaPorEndereco = !this.buscaPorEndereco;
  }

  togleCadastro() {
    this.cadastro = !this.cadastro;
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  consultaCEP() {
    if (this.cadastro) {
      this.resetar();
      this.cadastro = false;
      return;
    }
    if (this.buscaPorEndereco) {
      if (this.formulario.get('rua').valid && this.formulario.get('cidade').valid && this.formulario.get('estado').valid) {
        let endereco = new EnderecoPesquisa();
        endereco.Logradouro = this.formulario.get('rua').value;
        endereco.Cidade = this.formulario.get('cidade').value;
        endereco.UF = this.formulario.get('estado').value;

        this.cepService.consultaEndereco(endereco, this.resetaDadosForm, this.formulario)
          .subscribe(dados => {
            if (dados.length == 0) {
              return this.populaDadosForm(null);
            }
            if (dados.length == 1) {
              return this.populaDadosForm(dados[0]);
            } else {
              var options = new Array<any>();
              for (let end of dados) {
                options.push({
                  checked: end === dados[0],
                  classCss: '',
                  type: 'radio',
                  label: `${end.cep}, ${end.complemento}, ${end.logradouro}, ${end.bairro}, ${end.localidade}, ${end.uf}`,
                  value: end
                })
              }

              this.translate.get(["ADDRESS_SELECTION", "OK_BUTTON_TEXT", "CANCEL_BUTTON"]).subscribe(
                (values) => {

                  let alert = this.alertCtrl.create({
                    title: values.ADDRESS_SELECTION,
                    inputs: options,

                    buttons: [
                      {
                        text: values.CANCEL_BUTTON,
                      },
                      {
                        text: values.OK_BUTTON_TEXT,
                        handler: (data: any) => {
                          return this.populaDadosForm(data);
                        }
                      }
                    ]
                  });

                  alert.present();
                });
            }
          }
          );
      } else {
        this.verificaValidacoesForm(this.formulario);
      }
    } else {
      if (this.formulario.get('cep').valid) {

        let cep = this.formulario.get('cep').value;
        this.cepService.consultaCEP(cep, this.resetaDadosForm, this.formulario)
          .subscribe(dados => this.populaDadosForm(dados));
      } else {
        this.verificaValidacoesForm(this.formulario);
      }
    }
  }

  populaDadosForm(dados) {
    if (!dados || dados.erro) {
      this.translate.get(["ADDRESS_NOT_FOUND", "CEP_NOT_FOUND"]).subscribe(
        (values) => {
          let toast = this.toastCtrl.create({
            message: (this.buscaPorEndereco ? values.ADDRESS_NOT_FOUND : values.CEP_NOT_FOUND),
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      return;
    }
    this.resetar()
    console.log(dados);
    this.formulario.patchValue({
      rua: dados.logradouro,
      // cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
      cep: dados.cep ? dados.cep.replace('-', '').replace(/^(\d{2})(\d{3})(\d{3})$/g, '$1.$2-$3') : null
    });
    this.togleCadastro();

  }

  resetaDadosForm(formulario) {
    formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  geolocate() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.getGeoAddress(resp.coords.latitude, resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getGeoAddress(latitude, longitude) { 
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
    .then((result: NativeGeocoderReverseResult) => {
      let dados = {
        logradouro: result.thoroughfare,
        bairro: result.subLocality,
        localidade: result.locality,
        uf: this.getSiglaEstado(result.administrativeArea),
        cep: result.postalCode 
      }
      console.log(JSON.stringify(result))
      return this.populaDadosForm(dados)            
    })
    .catch((error: any) => console.log(error));    
  }
  getSiglaEstado(nome:string):string {
    return this.estados.find( x => x.nome == nome).sigla;
  }
  
}
