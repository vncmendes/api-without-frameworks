export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithRegex = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)");
  
  const pathRegex = new RegExp(`^${pathWithRegex}(?<query>\\?(.*))?$`);
  return pathRegex;
}