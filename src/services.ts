interface Service {
  [key: string]: {
    domain: string[],
    commonName: any,
    rule: RegExp,
    plus: boolean,
    plusInfinite: boolean,
    minChar: number,
    maxChar: number,
    ignoredCharacter?: any
  }
}

const services:Service= {
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

export default services;