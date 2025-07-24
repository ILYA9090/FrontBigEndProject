export function getQueryParams(params: OptionalRecord<string, string>) {
  const searchParms = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParms.set(name, value);
    }
  });
  return `?${searchParms.toString()}`;
}

export function addQueryParams(params: OptionalRecord<string, string>) {
  window.history.pushState(null, '', getQueryParams(params));
}
