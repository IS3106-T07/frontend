const handleActivateResponse = response => {
  return response.text().then(text => {
    if (!response.ok) {
      console.log("OK OK");
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  });
};

const handleUpdateResponse = response => {
  return response.text().then(text => {
    if (!response.ok) {
      console.log("OK OK");
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  });
};

const handleCreateResponse = response => {
  return response.text().then(text => {
    if (!response.ok) {
      console.log("OK OK");
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    const data = JSON.parse(text);
    return data;
  });
};

const handleCreateItemResponse = response => {
  return response.text().then(text => {
    if (!response.ok) {
      console.log("OK OK");
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
  });
};

module.exports = {
  handleActivateResponse,
  handleUpdateResponse,
  handleCreateResponse,
  handleCreateItemResponse
}
