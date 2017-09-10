import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MaskShared {
  /*
    [brmasker]="{mask:'000.000.000-00', len:14}"
    [brmasker] = component receive array (mask, len)
    mask --> required / default = '' / custom mask  
    len --> required / default = 0 / number of length
  */
  data = { mask:'00/00/0000', len:10 };
  cep = { mask:'00.000-000', len:10 };
  cpf = { mask:'000.000.000-00', len:14 };
  cnpj = { mask:'00.000.000/0000-00', len:18 };
  telefone = { mask:'(00) 0000-0000', len:14 };
  whatsapp = { mask:'(00) 00000-0000', len:15 };

  teleforneFormat=/\d{2}.\d{3}-\d{3}$/;
}
