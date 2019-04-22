import services from "./services";

export = function simplifyLocalName(local: string, service: string): string {
  local = local.split('+')[0];
  if(services[service].ignoredCharacter) {
    local = local.replace(services[service].ignoredCharacter, '');
  }
  return local;
}