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