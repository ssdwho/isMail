export = function whatIsTheService(mail: string): string {
  return mail.match(/(@([a-z0-9]){0,})/g)![0].toString().replace('@', '');
}