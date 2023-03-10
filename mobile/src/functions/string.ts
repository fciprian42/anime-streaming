export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeWhiteSpaceAndHtmlTags(str: string) {
  return str.replace(/<[^>]*>/g, '').replace(/\(Source: .*\)/, '');
}
