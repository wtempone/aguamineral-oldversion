export class User {
  $key: string;
  usr_fb_id: string; 
  usr_nome: string;
  usr_email: string;
  usr_foto: string;
  usr_senha: string;
  usr_data: Date;
  usr_nivel: number; 
  usr_status: number;
}
/*

CREATE TABLE `usuario` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_fb_id` varchar(255) NOT NULL,
  `usr_nome` varchar(255) NOT NULL,
  `usr_email` varchar(255) NOT NULL,
  `usr_senha` varchar(255) NOT NULL,
  `usr_data` date NOT NULL,
  `usr_hora` time NOT NULL,
  `usr_nivel` int(11) NOT NULL,
  `usr_status` int(11) NOT NULL,
  PRIMARY KEY (`usr_id`)

*/