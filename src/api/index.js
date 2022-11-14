const BASE = 'http://http://localhost:5005';

function queryString(query) {
  if (!query) return '';

  return Object.entries(query).reduce((acc, [key, value], index) => {
    if (index === 0) return `?${key}=${value}`;

    return acc + `&${key}=${value}`;
  }, '');
}

function constructPath(url, queries) {
  if (!queries) return url;
  return `${url}/${queries}`;
}

export function request(url, params, query) {
  const queries = queryString(query);
  const path = constructPath(url, queries);

  return fetch(BASE + path, params).then((res) => res.json());
}
