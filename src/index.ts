import getTheService = require("./getTheService");
import simplifyLocalName = require("./simplifyLocalName");
import countPlus = require("./countPlus");
import services from "./services";

const universalRule:RegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export = function ismail(mail: string) {
  mail = mail.toLowerCase();

  if(universalRule.test(mail)) {
    const service = getTheService(mail)
     if(service !== undefined) {
       let localName = mail.split('@')[0]
       if(services[service].plus) {
         if(!services[service].plusInfinite && countPlus(localName) > 1) {
           return {valid: false, mail: mail}
         }
       }

       localName = simplifyLocalName(localName, service)
       const localNameLength = localName.length

       if(localNameLength < services[service].minChar || localNameLength > services[service].maxChar) {
         return {valid: false, mail: mail}
       } else {
         if(services[service].rule.test(localName)) {
           if(services[service].commonName) {
             return {valid: true, mail: mail, simplify: localName + '@' + services[service].commonName }
           } else {
             return {valid: true, mail: mail, simplify: mail.replace(mail.split('@')[0], localName)}
           }
         } else {
           return {valid: false, mail: mail}
         }
       }

     } else {
       // Universal rule in but undefined service
       return {valid: true, mail: mail}
     }
  } else {
    // Universal rule out
    return {valid: false, mail: mail}
  } 
}
