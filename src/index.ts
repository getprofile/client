import fetch from "node-fetch";

/**
 * Configuration for the GetProfileClient.
 */
interface ClientConfig {
  /** App API key */
  apiKey: string;
  /** Optional base API URL (e.g., https://getprofile.selfhosted.com) */
  apiUrl?: string;
}

/**
 * Request body for profile updates.
 */
interface ProfileUpdateRequest {
  /** Data to process (text or structured JSON) */
  data: any;
  /** Optional input type (e.g., "bio", "conversation") */
  input_type?: string;
}

/**
 * A lightweight TypeScript client for the GetProfile API.
 *
 * 📚 API Reference: https://getprofile-docs.miliukov.dev/api-reference
 * 📚 Submit Data Guide: https://getprofile-docs.miliukov.dev/submit-data
 * 📚 Get Profile Guide: https://getprofile-docs.miliukov.dev/get-profile
 */
export class GetProfileClient {
  private apiUrl?: string;
  private apiKey: string;

  /**
   * Create a new GetProfile API client.
   * @param config Configuration options.
   */
  constructor({ apiUrl, apiKey }: ClientConfig) {
    this.apiUrl =
      apiUrl?.replace(/\/$/, "") || "https://getprofile.miliukov.dev"; // Remove trailing slash if present
    this.apiKey = apiKey;
  }

  /**
   * Internal method to send HTTP requests to the API.
   * @param method HTTP method (GET, POST, DELETE)
   * @param path API endpoint path
   * @param body Optional request body
   * @returns Parsed JSON response
   */
  private async _request<T>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {
    const res = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      const errorMessage =
        error && typeof error === "object" && "error" in error
          ? (error as { error?: string }).error
          : undefined;
      throw new Error(errorMessage || res.statusText);
    }

    return res.json() as Promise<T>;
  }

  /**
   * Submit data to update a profile.
   *
   * @param profileId The unique profile ID.
   * @param data The data to process (string or structured JSON).
   * @param inputType Optional input type (e.g., "bio", "conversation").
   * @returns Server response confirming profile update was accepted.
   * @see https://getprofile-docs.miliukov.dev/submit-data
   */
  async submitProfileUpdate(
    profileId: string,
    data: any,
    inputType?: string
  ): Promise<any> {
    const body: ProfileUpdateRequest = { data, input_type: inputType };
    return this._request("POST", `/api/v1/profile/${profileId}`, body);
  }

  /**
   * Retrieve a structured profile by profile ID.
   *
   * @param profileId The unique profile ID.
   * @returns The profile object with extracted data.
   * @see https://getprofile-docs.miliukov.dev/get-profile
   */
  async getProfile(profileId: string): Promise<any> {
    return this._request("GET", `/api/v1/profile/${profileId}`);
  }

  /**
   * Delete a profile by profile ID.
   *
   * @param profileId The unique profile ID.
   * @returns Server response confirming deletion.
   * @see https://getprofile-docs.miliukov.dev/api-reference
   */
  async deleteProfile(profileId: string): Promise<any> {
    return this._request("DELETE", `/api/v1/profile/${profileId}`);
  }
}
