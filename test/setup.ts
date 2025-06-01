import { beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const apiUrl = process.env.TEST_API_URL || "https://api.yourapp.com";

// Handlers
const handlers = [
  http.get(`${apiUrl}/v1/profile/:profileId`, ({ params, request }) => {
    const auth = request.headers.get("authorization");
    if (auth !== "Bearer test_api_key") {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json({
      profile_id: params.profileId,
      status: "ready",
      core_info: { name: { value: "Alex", confidence: 0.9 } },
    });
  }),

  http.post(`${apiUrl}/v1/profile/:profileId`, ({ params }) => {
    return HttpResponse.json(
      {
        message: "accepted",
        profile_id: params.profileId,
      },
      { status: 202 }
    );
  }),

  http.delete(`${apiUrl}/v1/profile/:profileId`, ({ params }) => {
    return HttpResponse.json({
      message: "Profile deleted successfully",
      profile_id: params.profileId,
    });
  }),
];

// Setup MSW server
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
