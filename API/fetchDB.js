export async function getDB() {
  const response = await fetch('https://local-farmers-api.herokuapp.com/API/farmers/getFarmers');
  const farmers = await response.json();
  return farmers;
}
