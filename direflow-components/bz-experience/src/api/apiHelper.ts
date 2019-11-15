/**
 * Makes a request to the Open Data Hub APIs.
 * @param request
 */
export async function makeODHRequest(request: RequestInfo): Promise<any> {
  return fetch(request).then((response) => {
    const jsonResponse = response.json();

    console.log(`Response gotten from ODH at url ${request} -> ${jsonResponse}`);

    return jsonResponse;
  });
}
