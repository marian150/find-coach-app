export default {
  async contactCoach(context, payload) {
    const request = {
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(
      `https://vue-http-demo-2f57c-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          request
        })
      }
    );

    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    request.id = responseData.name;
    request.coachId = payload.coachId;

    context.commit('addRequest', request);
  },

  async fetchRequests(context) {
    const token = context.rootGetters.token;
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-http-demo-2f57c-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token} `
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests'
      );
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].request.userEmail,
        message: responseData[key].request.message
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
