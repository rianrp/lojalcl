import React from 'react';

export const Notification = {
  putNotification: async (values) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic Y2Y2YzE0NjgtYWY1OC00NGM0LWE1ZjUtMThlZjAwNzZhNDM0',
      },
      body: JSON.stringify({
        app_id: '7514fe32-57c6-4d2d-a6ac-d6a2b8255559',
        included_segments: ['Subscribed Users'],
        contents: { pt: 'Mensagem em Português' },
        headings: { pt: 'Título em Português' },
        data: { myKey: 'myValue' },
      }),
    };

    fetch('https://onesignal.com/api/v1/notifications', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
};
