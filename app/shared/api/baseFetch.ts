export const baseFetch = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) => {
  return fetch(input, {
    ...init,
    headers: init?.headers
      ? {
          ...init.headers,
          Authorization: `Bearer ${getCookie("jwt")}`,
        }
      : { Authorization: `Bearer ${getCookie("jwt")}` },
  }).then((res) => res.json());
};

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
