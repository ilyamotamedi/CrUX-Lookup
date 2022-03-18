import fetch from 'node-fetch';

const validateUrl = (url: string) => {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlRegex.test(url);
};

const validateWebsite = async (url: string) => {
  const response = await fetch(url);
  return response.status === 200;
};

export { validateUrl, validateWebsite };
