class ApiError extends Error {
  data: any;

  constructor(response: Response, data: any) {
    super(`Error when requesting ${response.url}`);
    this.data = data;
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}

export function logApiError(error: ApiError) {
  console.error(error.message);
  console.log('Response json:', error.data);
}

export async function getRequest<T = any>(path: string, query: Record<string, any> = {}): Promise<T> {
  const url = new URL(`${import.meta.env.VITE_API_URL}${path}`);
  for (const queryParam of Object.getOwnPropertyNames(query)) {
    url.searchParams.set(queryParam, query[queryParam]);
  }

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    const error = new ApiError(response, json);

    if (isApiError(error)) {
      logApiError(error);
    } else {
      console.error(error);
    }

    throw error;
  }

  return json as T;
}