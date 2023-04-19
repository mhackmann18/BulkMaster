export function isUserLoggedIn() {
  return true;
}

export async function usernameExists(username) {
  if (!username) {
    return true;
  }
  return false;
}
