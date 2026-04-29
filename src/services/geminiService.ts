/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const API_URL = import.meta.env.VITE_API_URL || '';

export const chatWithVelgorex = async (message: string, history: { role: string; parts: string }[] = []) => {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to communicate with V-AI Systems.");
  }

  const data = await response.json();
  return data.response;
};
