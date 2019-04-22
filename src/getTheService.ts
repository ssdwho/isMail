const whatIsTheService = require("./whatTheService");
import services from "./services";

export = function getTheService(mail: string): string {
  const thisMap: any = Object.keys(services).map(v => services[v].domain.indexOf(whatIsTheService(mail)));
  return Object.keys(services)[thisMap.indexOf(parseInt(thisMap.filter((e: any) => e > -1)))]
}