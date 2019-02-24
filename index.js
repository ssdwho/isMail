const _ = require("lodash")
const universalRule = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
const services = {
  gmail: {
    domain: ["gmail", "googlemail"],
    commonName: "gmail.com",
    rule: /^[a-z0-9](\.?[a-z0-9]){5,29}$/,
    plus: true,
    plusInfinite: true,
    minChar: 6,
    maxChar: 30,
    ignoredCharacter: /\./g
  },
  live: {
    domain: ["outlook", "hotmail", "live", "windoslive", "msn"],
    commonName: false,
    rule: /^[a-z](\.?[a-z0-9\-_]){0,}$/,
    plus: true,
    plusInfinite: false,
    minChar: 1,
    maxChar: 64
  },
  yandex: {
    domain: ["yandex"],
    commonName: false,
    rule: /^[a-z]([\.-]?[a-z0-9]){0,}$/,
    plus: true,
    plusInfinite: true,
    minChar: 1,
    maxChar: 30
  }
}

function whatIsTheService(mail) {
  return mail.match(/(@([a-z0-9]){0,})/g)[0].toString().replace('@', '')
}

function getTheService(mail) {
  return _.findKey(services, (d) => { return d.domain.indexOf(whatIsTheService(mail)) !== -1; })
}

function countPlus(local) {
  if(local.match(RegExp('\\+', 'g')) !== null) {
    return local.match(RegExp('\\+', 'g')).length
  } else {
    return 0
  }
}

function simplifyLocalName(local, service) {
  local = local.split('+')[0]
  if(services[service].ignoredCharacter) {
    local = local.replace(services[service].ignoredCharacter, '')
  }
  return local
}

module.exports = (mail) => {

  if(universalRule.test(mail)) {
    const service = getTheService(mail)
     if(service !== undefined) {
       let localName = mail.split('@')[0]
       if(services[service].plus) {
         if(!services[service].plusInfinite && countPlus(localName) > 1) {
           return {valid: false, mail: mail}
         }
       }

       const localNameLength = simplifyLocalName(localName, service).length
       if(localNameLength < services[service].minChar || localNameLength > services[service].maxChar) {
         return {valid: false, mail: mail}
       } else {
         if(services[service].rule.test(localName)) {
           if(services[service].commonName) {
             return {valid: true, mail: mail, simplify: simplifyLocalName(localName, service) + '@' + services[service].commonName }
           } else {
             return {valid: true, mail: mail}
           }
         } else {
           return {valid: false, mail: mail}
         }
       }
       // Bu araya
     } else {
       // Universal rule in but undefined service
       return {valid: true, mail: mail}
     }
  } else {
    // Universal rule out
    return {valid: false, mail: mail}
  }
}
