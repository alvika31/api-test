// @ts-check
const { test, expect } = require("@playwright/test");

test("should be able to get wishlist by customer", async ({ page }) => {
  const customer_id = "cus_01HDVRJGHMVDAMWT73KKHSR9T2"; // change this
  const response = await page.goto(
    `http://localhost:9000/store/wishlist/customer/${customer_id}`
  );
  expect(response).toBeTruthy();
});

test("should be able to create a wishlist", async ({ request }) => {
  const response = await request.post("http://localhost:9000/store/wishlist/", {
    data: {
      title: "Swimming Pool",
      customer_id: "cus_01HDVRJGHMVDAMWT73KKHSR9T2",
      region_id: "reg_01HDVQ9V8R4FZ0Q2SBF6VN909E",
    },
  });
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("message", "Success Insert Wishlist");
});

test("should be able to delete a wishlist Name", async ({ request }) => {
  const wishlistNameId = "wishlistName_01HF4PBK4PAKABAPG2NVDVA5FN"; // change this
  const deleteRequest = await request.delete(
    `http://localhost:9000/store/wishlist/${wishlistNameId}`
  );
  const responseBody = await deleteRequest.json();
  expect(deleteRequest).toBeTruthy();
  expect(responseBody).toHaveProperty("message", "Wishlist Deleted");
  expect(deleteRequest.status()).toEqual(200);
  expect(deleteRequest.statusText()).toBe("OK");
});

test("should be able to update a wishlist", async ({ request }) => {
  const wishlistNameId = "wishlistName_01HF6H6KJPVH69XBAZ2BA0VG1C"; // change this
  const data = {
    title: "Update By Playwright",
  };
  const updateRequest = await request.put(
    `http://localhost:9000/store/wishlist/${wishlistNameId}`,
    { data }
  );
  console.log(await updateRequest.json());
  expect(updateRequest.ok()).toBeTruthy();
  expect(updateRequest.status()).toBe(200);
  const responseBody = await updateRequest.json();
  expect(responseBody).toHaveProperty("message", "Wishlist Updated");
});

test("should be able to get wishlist item by variant", async ({ page }) => {
  const variant_id = "variant_01HECKFHG7HS0CSZY5824JSTSM"; // change this
  const response = await page.goto(
    `http://localhost:9000/store/wishlist-item/variant/${variant_id}`
  );
  expect(response).toBeTruthy();
  expect(response?.status()).toBe(200);
  console.log(await response?.json());
});

test("should be able to update quantity wishlist item", async ({ request }) => {
  const wishlistItemId = "wishlist_01HF6H8C3M9PH2QK2SRWYN45R9"; // change this
  const data = {
    quantity: 3,
  };
  const updateRequest = await request.put(
    `http://localhost:9000/store/wishlist-item/${wishlistItemId}`,
    { data }
  );

  console.log(await updateRequest.json());
  expect(updateRequest.ok()).toBeTruthy();
  expect(updateRequest.status()).toBe(200);
  const responseBody = await updateRequest.json();
  expect(responseBody).toHaveProperty("message", "Wishlist Item Updated");
});

test("should be able to delete a wishlist item", async ({ request }) => {
  const wishlistItemId = "wishlist_01HF753JJA17KHKMHRG9CV8XDX"; // change this
  const deleteRequest = await request.delete(
    `http://localhost:9000/store/wishlist-item/${wishlistItemId}`
  );
  const responseBody = await deleteRequest.json();
  expect(deleteRequest).toBeTruthy();
  expect(responseBody).toHaveProperty("message", "Wishlist Item Deleted");
  expect(deleteRequest.status()).toEqual(200);
  expect(deleteRequest.statusText()).toBe("OK");
});

test("should be able to create a wishlist item", async ({ request }) => {
  const wishlistNameId = "wishlistName_01HF6H6HVW346QXJCZFKB0NKSS"; //change this
  const response = await request.post(
    `http://localhost:9000/store/wishlist/${wishlistNameId}/wishlist-item`,
    {
      data: {
        product_id: "prod_01HECK50SAA8349E6FXE6YV825",
        title:
          "UNKL347 Kaos T-shirt Katun Lengan Pendek Motif Army Purple SIIN - Purple",
        description: "Purple / S",
        quantity: 1,
        thumbnail:
          "http://localhost:9000/uploads/1699082306282-065d6df6-38b6-4d04-b7ba-5ebc1a5b3bf4.jpg",
        original_total: 3000,
        sub_total: 3000,
        total: 3000,
        unit_price: 3000,
        variant_id: "variant_01HECK50VXCPG79PSENT4TJV93",
        wishlist_name_id: wishlistNameId,
      },
    }
  );
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty(
    "message",
    "Success Insert Wishlist Item"
  );
});

test("should be able to get all wishlist and wishlist item by admin", async ({
  page,
  request,
}) => {
  const response = await request.post(
    "http://localhost:9000/admin/auth/token",
    {
      data: {
        // change this
        email: "admin@medusa-test.com",
        password: "alvika123",
      },
    }
  );
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  const token = responseBody.access_token;
  console.log("New Token is: " + token);

  const customer_id = "cus_01HDVRJGHMVDAMWT73KKHSR9T2"; // change this

  await page.setExtraHTTPHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const responseWishlist = await page.goto(
    `http://localhost:9000/admin/${customer_id}/wishlist`
  );

  expect(responseWishlist).toBeTruthy();
});
