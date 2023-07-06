export const modifyVehicleState = async (plate, newState, type) => {
  if (type != 'plate') {

  }
  fetch(`http://minikit.pythonanywhere.com/vehicles/${plate}/state`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state: newState }),
  });
};

export const getVehicleByLicensePlate = async (plate) => {
  return fetch(`http://minikit.pythonanywhere.com/vehicles/${plate}`);
}

export const getVehicleById = async (id) => {
  return fetch(`http://minikit.pythonanywhere.com/vehicles/${id}`).then(res => res.json());
}