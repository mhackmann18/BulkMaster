export function isUserLoggedIn() {
  return true;
}

export async function usernameExists(username) {
  if (!username) {
    return true;
  }
  return false;
}

export async function validateUserCredentials(username, password) {
  if (username && password) {
    return true;
  }

  return false;
}
