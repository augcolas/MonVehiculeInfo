export const modifyVehicleState = async (plate, newState) => {
  fetch(`http://minikit.pythonanywhere.com/vehicles/${plate}/state`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state: newState }),
  });
};