import { describe, it, expect } from "vitest";
import { GetProfileClient } from "../src/index";

const apiUrl = process.env.TEST_API_URL || "https://yourapp.com";
const apiKey = "test_api_key";
const testProfileId = "test_profile_id";

const client = new GetProfileClient({ apiUrl, apiKey });

describe("GetProfileClient (with mocks)", () => {
  it("should retrieve a profile with core info", async () => {
    const profile = await client.getProfile(testProfileId);
    expect(profile).toHaveProperty("profile_id", testProfileId);
    expect(profile.core_info?.name?.value).toBe("Alex");
  });

  it("should submit a profile update and receive accepted response", async () => {
    const response = await client.submitProfileUpdate(
      testProfileId,
      "Test data",
      "bio"
    );
    expect(response.message).toBe("accepted");
    expect(response.profile_id).toBe(testProfileId);
  });

  it("should delete a profile and confirm deletion", async () => {
    const response = await client.deleteProfile(testProfileId);
    expect(response.message).toBe("Profile deleted successfully");
    expect(response.profile_id).toBe(testProfileId);
  });

  it("should throw an error if API key is invalid", async () => {
    const invalidClient = new GetProfileClient({
      apiUrl,
      apiKey: "invalid_key",
    });
    await expect(invalidClient.getProfile(testProfileId)).rejects.toThrow(
      /Unauthorized/
    );
  });
});
