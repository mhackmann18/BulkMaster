export function isUserLoggedIn() {
  return true;
}

export async function updateRecipeById(data, id) {
  return { success: true, message: `Updated recipe with id ${id}` };
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
