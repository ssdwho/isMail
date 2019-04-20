const universalRule = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const services: { [key: string]: any } = {
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
    domain: ["outlook", "hotmail", "live", "windowslive", "msn"],
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

function whatIsTheService(mail: string): string {
  return mail.match(/(@([a-z0-9]){0,})/g)![0].toString().replace('@', '');
}

function getTheService(mail: string): string {
  const thisMap: any = Object.keys(services).map(v => services[v].domain.indexOf(whatIsTheService(mail)));
  return Object.keys(services)[thisMap.indexOf(parseInt(thisMap.filter((e: any) => e > -1)))]
}

function countPlus(local: string): number {
  if(local.match(RegExp('\\+', 'g')) !== null) {
    return local.match(RegExp('\\+', 'g'))!.length;
  } else {
    return 0;
  }
}

function simplifyLocalName(local: string, service: string): string {
  local = local.split('+')[0];
  if(services[service].ignoredCharacter) {
    local = local.replace(services[service].ignoredCharacter, '');
  }
  return local;
}

export default function (mail: any) {
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
