/**
 * Makes a request to a specified endpoint.
 */
export async function makeRequest(request: RequestInfo, init?: RequestInit): Promise<any> {
  return fetch(request, init)
    .then((response) => {
      console.log(`Response succesful from request at url ${request}`);

      return response.json();
    })
    .then((jsonResponse) => {
      console.log(`Response content: ${jsonResponse}`);

      return jsonResponse;
    });
}
