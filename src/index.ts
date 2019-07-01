interface ismailOutput {
  valid: boolean
  simplify: string
}

export = function ismail(data: any): ismailOutput {
  if(typeof data !== "string") {
    data = data.toString();
  }
  data = data.toLowerCase();
  let valid:boolean, simplify:string;

  let da = data.substring(0, data.indexOf('@'));
  const ta = data.replace(/.*@/, "");

  if(data.indexOf('+') >= 0) {
    da = da.substring(0, da.indexOf('+'));
    data = `${da}@${ta}`;
  }
  
  const domain = ta.substring(0, ta.indexOf('.'));
  const domains = ["gmail", "googlemail", "live", "hotmail", "outlook", "windowslive", "msn", "yandex"];

  if(!domains.includes(domain)) {
    const universalRule:RegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if(!universalRule.test(data)) {
      valid = false;
    } else {
      valid = true;
    }
  } else {
    const rules = [
      /(^[a-z0-9](\.?[a-z0-9]){5,29})@(gmail|googlemail)\.com$/,
      /^[a-z](\.?[a-z0-9\-_]){0,}@(outlook|live|windowslive|hotmail|msn)((\.(([a-z]{2,3}))){1,2})$/,
      /^[a-z]([\.-]?[a-z0-9]){0,}@yandex((\.(([a-z]{2,3}))){1,2})$/
    ];

    if(domain == "googlemail" || domain == "gmail") {
      da = da.split('.').join("");
      data = `${da}@${ta}`;
      data = data.replace("googlemail", "gmail");
    }
    const control = rules.map((regex) => {
      return regex.test(data);
    });

    if(control.includes(true)) {
      valid = true;
    } else {
      valid = false;
    }
  }
  simplify = data;
  return {"valid": valid, "simplify": simplify}
}