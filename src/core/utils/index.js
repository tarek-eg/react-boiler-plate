export const nameLetters = (name) => {
  return name && name.split(' ')
    .map(item => (item.charAt(0)
      .toUpperCase()))
    .slice(0, 2)
    .join('.');
};

export const getCookieValue = (name) => {
  const value = `;  ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 && parts.pop()
    .split(';')
    .shift();
};
