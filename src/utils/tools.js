
export function goToNavigation(type) {
  let navType = '';
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  params.delete('category');
  switch (type) {
    case "/":
      navType = `/?${params}`
      break;
    case "category":
      navType = `/category?${params}`
      break;
    case "cart":
      navType = `/cart?${params}`
      break;
    case "other":
      navType = `/other?${params}`
      break;
    case "dy":
      navType = `/dy?${params}`
      break;
    default:
      navType = '';
      break;
  }
  return navType;
}

export function getQueryStringValue(key) {
  // First try to get it from URL querystring
  console.log(`🔍 Trying to get: ${key} from queryString`);
  const urlParams = new URLSearchParams(window.location.search);
  let value = urlParams.get(key);
  if (value) {
    console.log(`✅ Got: ${key} from queryString, value: ${value}`);
    return value;
  } 
  return ''
}

export function changeQueryStringValue(param, value, reload = false) {
  if (value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    // eslint-disable-next-line
    reload && history.pushState({}, "", decodeURIComponent(url));
    // Reload the page
    reload && window.location.reload();
    return true;
  } else {
    return false;
  }
}