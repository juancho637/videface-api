export const paeseBaseAuthHelper = (
  authHeader: string,
): {
  username: string;
  password: string;
} => {
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii',
  );
  const [username, password] = credentials.split(':');
  return { username, password };
};
