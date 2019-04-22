export = function countPlus(local: string): number {
  if(local.match(RegExp('\\+', 'g')) !== null) {
    return local.match(RegExp('\\+', 'g'))!.length;
  } else {
    return 0;
  }
}